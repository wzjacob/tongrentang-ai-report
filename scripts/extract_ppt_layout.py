#!/usr/bin/env python3
"""
Extract PPT slide layout (text/picture/shape geometry) into JSON.

Usage:
  python3 scripts/extract_ppt_layout.py \
    --ppt "/abs/path/to/file.pptx" \
    --out "/abs/path/to/layout.json" \
    --media-out-dir "/abs/path/to/media-dir"
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import zipfile
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any
from xml.etree import ElementTree as ET

NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}


def qname(prefix: str, tag: str) -> str:
    return f"{{{NS[prefix]}}}{tag}"


def get_slide_index(path: str) -> int:
    matched = re.search(r"slide(\d+)\.xml$", path)
    if not matched:
        raise ValueError(f"invalid slide path: {path}")
    return int(matched.group(1))


def parse_int(value: str | None, default: int = 0) -> int:
    try:
        return int(value) if value is not None else default
    except ValueError:
        return default


def normalize_path(path: str) -> str:
    return path.replace("\\", "/")


def resolve_target(base_xml_path: str, target: str) -> str:
    base_dir = Path(base_xml_path).parent.as_posix()
    resolved = Path(base_dir, target).as_posix()
    normalized_parts: list[str] = []
    for part in resolved.split("/"):
        if part in ("", "."):
            continue
        if part == "..":
            if normalized_parts:
                normalized_parts.pop()
            continue
        normalized_parts.append(part)
    return "/".join(normalized_parts)


def get_xfrm_geometry(node: ET.Element | None) -> dict[str, int]:
    if node is None:
        return {"x": 0, "y": 0, "w": 0, "h": 0}
    xfrm = node.find("a:xfrm", NS)
    if xfrm is None:
        return {"x": 0, "y": 0, "w": 0, "h": 0}
    off = xfrm.find("a:off", NS)
    ext = xfrm.find("a:ext", NS)
    return {
        "x": parse_int(off.attrib.get("x") if off is not None else None),
        "y": parse_int(off.attrib.get("y") if off is not None else None),
        "w": parse_int(ext.attrib.get("cx") if ext is not None else None),
        "h": parse_int(ext.attrib.get("cy") if ext is not None else None),
    }


def collect_text(shape: ET.Element) -> list[str]:
    text_nodes = shape.findall(".//a:t", NS)
    lines: list[str] = []
    for text in text_nodes:
        value = (text.text or "").strip()
        if value:
            lines.append(value)
    return lines


def read_slide_size(pptx_zip: zipfile.ZipFile) -> dict[str, int]:
    root = ET.fromstring(pptx_zip.read("ppt/presentation.xml"))
    sld_sz = root.find("p:sldSz", NS)
    if sld_sz is None:
        return {"cx": 0, "cy": 0}
    return {
        "cx": parse_int(sld_sz.attrib.get("cx")),
        "cy": parse_int(sld_sz.attrib.get("cy")),
    }


def read_relationships(pptx_zip: zipfile.ZipFile, xml_path: str) -> dict[str, dict[str, str]]:
    xml_file = Path(xml_path).name
    rel_path = f"{Path(xml_path).parent.as_posix()}/_rels/{xml_file}.rels"
    if rel_path not in pptx_zip.namelist():
        return {}
    rel_root = ET.fromstring(pptx_zip.read(rel_path))
    mapping: dict[str, dict[str, str]] = {}
    for rel in rel_root.findall("rel:Relationship", NS):
        rel_id = rel.attrib.get("Id")
        rel_type = rel.attrib.get("Type")
        target = rel.attrib.get("Target")
        if not rel_id or not target or not rel_type:
            continue
        abs_target = resolve_target(xml_path, normalize_path(target))
        mapping[rel_id] = {"type": rel_type, "target": abs_target}
    return mapping


@dataclass
class LayoutElement:
    id: str
    type: str
    x: int
    y: int
    w: int
    h: int
    z: int
    text_lines: list[str] | None = None
    image: str | None = None


def get_placeholder_key(shape: ET.Element) -> str | None:
    ph = shape.find("p:nvSpPr/p:nvPr/p:ph", NS)
    if ph is None:
        return None
    ph_type = ph.attrib.get("type", "obj")
    ph_idx = ph.attrib.get("idx", "0")
    return f"{ph_type}:{ph_idx}"


def build_placeholder_geometry_map(root: ET.Element) -> dict[str, dict[str, int]]:
    mapping: dict[str, dict[str, int]] = {}
    sp_tree = root.find("p:cSld/p:spTree", NS)
    if sp_tree is None:
        return mapping
    for child in list(sp_tree):
        if child.tag != qname("p", "sp"):
            continue
        key = get_placeholder_key(child)
        if not key:
            continue
        geom = get_xfrm_geometry(child.find("p:spPr", NS))
        if geom["w"] > 0 and geom["h"] > 0:
            mapping[key] = geom
    return mapping


def load_xml_root(pptx_zip: zipfile.ZipFile, path: str | None) -> ET.Element | None:
    if not path:
        return None
    normalized = normalize_path(path)
    if normalized not in pptx_zip.namelist():
        return None
    return ET.fromstring(pptx_zip.read(normalized))


def pick_related_target(rel_map: dict[str, dict[str, str]], type_suffix: str) -> str | None:
    for rel in rel_map.values():
        if rel["type"].endswith(type_suffix):
            return rel["target"]
    return None


def extract_layout(pptx_path: Path, media_out_dir: Path) -> dict[str, Any]:
    with zipfile.ZipFile(pptx_path) as pptx_zip:
        media_out_dir.mkdir(parents=True, exist_ok=True)
        for item in pptx_zip.namelist():
            if not item.startswith("ppt/media/") or item.endswith("/"):
                continue
            target_name = os.path.basename(item)
            if not target_name:
                continue
            with pptx_zip.open(item) as src, open(media_out_dir / target_name, "wb") as dst:
                shutil.copyfileobj(src, dst)

        slide_size = read_slide_size(pptx_zip)
        slide_paths = sorted(
            [name for name in pptx_zip.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", name)],
            key=get_slide_index,
        )

        slides: list[dict[str, Any]] = []
        for slide_path in slide_paths:
            slide_index = get_slide_index(slide_path)
            rel_map = read_relationships(pptx_zip, slide_path)
            root = ET.fromstring(pptx_zip.read(slide_path))

            layout_path = pick_related_target(rel_map, "/slideLayout")
            layout_root = load_xml_root(pptx_zip, layout_path)
            layout_placeholder_map = build_placeholder_geometry_map(layout_root) if layout_root is not None else {}

            master_placeholder_map: dict[str, dict[str, int]] = {}
            if layout_path:
                layout_rel_map = read_relationships(pptx_zip, layout_path)
                master_path = pick_related_target(layout_rel_map, "/slideMaster")
                master_root = load_xml_root(pptx_zip, master_path)
                if master_root is not None:
                    master_placeholder_map = build_placeholder_geometry_map(master_root)

            elements: list[LayoutElement] = []
            sp_tree = root.find("p:cSld/p:spTree", NS)
            if sp_tree is None:
                slides.append({"slide_id": slide_index, "elements": []})
                continue

            z = 0
            for child in list(sp_tree):
                z += 1
                if child.tag == qname("p", "sp"):
                    nv = child.find("p:nvSpPr/p:cNvPr", NS)
                    element_id = (nv.attrib.get("id") if nv is not None else None) or f"sp-{z}"
                    name = (nv.attrib.get("name") if nv is not None else "") or "shape"
                    sp_pr = child.find("p:spPr", NS)
                    geom = get_xfrm_geometry(sp_pr)
                    if geom["w"] == 0 and geom["h"] == 0:
                        key = get_placeholder_key(child)
                        if key and key in layout_placeholder_map:
                            geom = layout_placeholder_map[key]
                        elif key and key in master_placeholder_map:
                            geom = master_placeholder_map[key]
                    text_lines = collect_text(child)
                    elements.append(
                        LayoutElement(
                            id=f"{element_id}:{name}",
                            type="shape",
                            x=geom["x"],
                            y=geom["y"],
                            w=geom["w"],
                            h=geom["h"],
                            z=z,
                            text_lines=text_lines or None,
                        )
                    )
                elif child.tag == qname("p", "pic"):
                    nv = child.find("p:nvPicPr/p:cNvPr", NS)
                    element_id = (nv.attrib.get("id") if nv is not None else None) or f"pic-{z}"
                    name = (nv.attrib.get("name") if nv is not None else "") or "picture"
                    blip = child.find("p:blipFill/a:blip", NS)
                    rel_id = blip.attrib.get(qname("r", "embed")) if blip is not None else None
                    media_rel = rel_map.get(rel_id or "")
                    media_path = media_rel["target"] if media_rel and media_rel["type"].endswith("/image") else ""
                    media_name = os.path.basename(media_path) if media_path else None
                    sp_pr = child.find("p:spPr", NS)
                    geom = get_xfrm_geometry(sp_pr)
                    elements.append(
                        LayoutElement(
                            id=f"{element_id}:{name}",
                            type="picture",
                            x=geom["x"],
                            y=geom["y"],
                            w=geom["w"],
                            h=geom["h"],
                            z=z,
                            image=media_name,
                        )
                    )
                elif child.tag == qname("p", "cxnSp"):
                    nv = child.find("p:nvCxnSpPr/p:cNvPr", NS)
                    element_id = (nv.attrib.get("id") if nv is not None else None) or f"cxn-{z}"
                    name = (nv.attrib.get("name") if nv is not None else "") or "connector"
                    sp_pr = child.find("p:spPr", NS)
                    geom = get_xfrm_geometry(sp_pr)
                    elements.append(
                        LayoutElement(
                            id=f"{element_id}:{name}",
                            type="connector",
                            x=geom["x"],
                            y=geom["y"],
                            w=geom["w"],
                            h=geom["h"],
                            z=z,
                        )
                    )

            slides.append(
                {
                    "slide_id": slide_index,
                    "elements": [asdict(item) for item in elements],
                }
            )

        return {
            "meta": {
                "source_pptx": str(pptx_path),
                "slide_size_emu": slide_size,
                "slide_count": len(slides),
            },
            "slides": slides,
        }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ppt", required=True, help="Absolute path to .pptx")
    parser.add_argument("--out", required=True, help="Absolute path to output layout json")
    parser.add_argument("--media-out-dir", required=True, help="Absolute path to extracted media folder")
    args = parser.parse_args()

    pptx_path = Path(args.ppt).expanduser().resolve()
    out_path = Path(args.out).expanduser().resolve()
    media_out_dir = Path(args.media_out_dir).expanduser().resolve()

    if not pptx_path.exists():
        raise FileNotFoundError(f"ppt file not found: {pptx_path}")
    if pptx_path.suffix.lower() != ".pptx":
        raise ValueError(f"unsupported file type: {pptx_path.suffix}")

    payload = extract_layout(pptx_path, media_out_dir)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"layout generated: {out_path}")
    print(f"media generated: {media_out_dir}")
    print(f"slides: {payload['meta']['slide_count']}")


if __name__ == "__main__":
    main()
