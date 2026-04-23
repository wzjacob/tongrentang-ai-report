/**
 * 导出 PPTX
 *
 * 默认：像素级还原 —— 每页 [data-report-slide] 高清 PNG 嵌入 16:9 幻灯片（contain 完整显示，可放大查看细节）。
 * 备选：可编辑文字版 —— 设置 EXPORT_TEXT=1
 *
 * 1. npm run dev（默认 http://127.0.0.1:3333）
 * 2. npm run export:pptx
 *
 * 可选：REPORT_URL、CHROME_PATH、EXPORT_SLIDE_WAIT_MS（默认 6000）、EXPORT_DEVICE_SCALE（默认 2）
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "pptx-export");

const reportUrl = process.env.REPORT_URL || "http://127.0.0.1:3333";
const slideWaitMs = Number(process.env.EXPORT_SLIDE_WAIT_MS || "8000");
const betweenSlidesMs = Number(process.env.EXPORT_BETWEEN_MS || "350");
const scrollSettleMs = Number(process.env.EXPORT_SCROLL_WAIT_MS || "450");
/** 默认高清：2 约等于 2× 像素密度，再大文件会暴涨 */
const deviceScale = Math.min(4, Math.max(1, Number(process.env.EXPORT_DEVICE_SCALE || "3")));
/** 与常见汇报大屏宽度一致，布局更接近你本地预览 */
const viewportW = Number(process.env.EXPORT_VIEWPORT_W || "2560");
const viewportH = Number(process.env.EXPORT_VIEWPORT_H || "1440");

const textMode = process.env.EXPORT_TEXT === "1" || process.env.EXPORT_TEXT === "true";

function findChromeExecutable() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const localApp = process.env.LOCALAPPDATA || "";
  const candidates = [
    path.join(localApp, "Google", "Chrome", "Application", "chrome.exe"),
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of candidates) {
    if (p && fs.existsSync(p)) return p;
  }
  return null;
}

function extractSlidePayload() {
  return (index) => {
    const sections = document.querySelectorAll("[data-report-slide]");
    const section = sections[index];
    if (!section) return { id: null, text: "" };
    const id = section.getAttribute("data-report-slide");
    const kids = section.querySelectorAll(":scope > div");
    const content = kids[1] || section;
    const text = (content.innerText || "")
      .replace(/\u00a0/g, " ")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .trim();
    return { id, text };
  };
}

function splitTitleBody(raw) {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return { title: "（空白页）", body: "" };

  let title = lines[0];
  let start = 1;
  const first = lines[0].trim();
  if (lines.length >= 2 && first.length <= 6 && /^[\d０-９一二三四五六七八九十]+$/.test(first)) {
    title = `${lines[0]} ${lines[1]}`.trim();
    start = 2;
  }

  const bodyLines = lines.slice(start);
  const seen = new Set();
  const deduped = [];
  for (const line of bodyLines) {
    if (seen.has(line)) continue;
    seen.add(line);
    deduped.push(line);
  }
  const body = deduped.join("\n");
  if (title.length > 120) {
    return { title: title.slice(0, 117) + "…", body: title.slice(117) + (body ? `\n${body}` : "") };
  }
  return { title, body };
}

async function main() {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    console.error(
      "未找到 Chrome / Edge。请安装浏览器或设置 CHROME_PATH 为 chrome.exe / msedge.exe 的完整路径。",
    );
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: viewportW,
    height: viewportH,
    deviceScaleFactor: deviceScale,
  });

  console.log("打开页面:", reportUrl);
  await page.goto(reportUrl, { waitUntil: "domcontentloaded", timeout: 120000 });

  await page.evaluate(() => {
    try {
      window.localStorage.setItem("ai-report-show-full-version", "1");
    } catch {
      /* ignore */
    }
  });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 120000 });

  await page.waitForSelector("[data-report-slide]", { timeout: 120000 });
  try {
    await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());
  } catch {
    /* ignore */
  }
  console.log("等待图表与字体…", slideWaitMs, "ms | DPR=", deviceScale, "视口", viewportW, "×", viewportH);
  await new Promise((r) => setTimeout(r, slideWaitMs));

  const slideCount = await page.$$eval("[data-report-slide]", (els) => els.length);
  if (!slideCount) {
    console.error("未找到 [data-report-slide]。");
    await browser.close();
    process.exit(1);
  }

  console.log("共", slideCount, "页，模式：", textMode ? "可编辑文本" : "像素截图（高清 PNG）");

  const PptxCtor = pptxgen.default ?? pptxgen;
  const pptx = new PptxCtor();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "tongrentang-ai-report";
  pptx.title = "同仁堂集团算力摸排与AI前瞻规划汇报";
  pptx.subject = textMode ? "文本导出" : "像素级截图导出";

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outFile = path.join(
    OUT_DIR,
    textMode ? "同仁堂汇报-可编辑版.pptx" : "同仁堂汇报-像素1比1版.pptx",
  );

  const extract = extractSlidePayload();

  for (let i = 0; i < slideCount; i++) {
    const slide = pptx.addSlide();
    let id = null;

    if (textMode) {
      const payload = await page.evaluate(extract, i);
      id = payload.id;
      const { title, body } = splitTitleBody(payload.text);
      slide.addText(`slide_id: ${id ?? "?"}`, {
        x: 0.35,
        y: 0.2,
        w: 2.2,
        h: 0.3,
        fontSize: 8,
        color: "9ca3af",
        fontFace: "Microsoft YaHei",
      });
      slide.addText(title, {
        x: 0.45,
        y: 0.42,
        w: 9.1,
        h: 0.95,
        fontSize: 22,
        bold: true,
        color: "111827",
        fontFace: "Microsoft YaHei",
        wrap: true,
      });
      const bodyFont = body.length > 2800 ? 9 : body.length > 1600 ? 10 : 11;
      slide.addText(body || " ", {
        x: 0.45,
        y: 1.35,
        w: 9.1,
        h: 4.05,
        fontSize: bodyFont,
        color: "374151",
        fontFace: "Microsoft YaHei",
        valign: "top",
        wrap: true,
      });
      try {
        if (typeof slide.addNotes === "function") {
          slide.addNotes(
            `【抽取文本】\n${payload.text.slice(0, 15000)}${payload.text.length > 15000 ? "\n…" : ""}`,
          );
        }
      } catch {
        /* ignore */
      }
    } else {
      await page.evaluate((idx) => {
        const el = document.querySelectorAll("[data-report-slide]")[idx];
        el?.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
      }, i);
      await new Promise((r) => setTimeout(r, scrollSettleMs));

      const handles = await page.$$("[data-report-slide]");
      const h = handles[i];
      if (!h) continue;

      id = await page.evaluate((el) => el.getAttribute("data-report-slide"), h);
      const clip = await page.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const targetAspect = 16 / 9;
        let clipWidth = rect.width;
        let clipHeight = rect.height;
        const currentAspect = rect.width / rect.height;
        if (currentAspect > targetAspect) {
          clipWidth = rect.height * targetAspect;
        } else if (currentAspect < targetAspect) {
          clipHeight = rect.width / targetAspect;
        }
        const x = Math.max(0, rect.left + (rect.width - clipWidth) / 2);
        const y = Math.max(0, rect.top + (rect.height - clipHeight) / 2);
        return {
          x,
          y,
          width: Math.max(1, clipWidth),
          height: Math.max(1, clipHeight),
        };
      }, h);

      const buf = await page.screenshot({
        type: "png",
        clip,
        captureBeyondViewport: false,
      });

      slide.addImage({
        data: `image/png;base64,${buf.toString("base64")}`,
        x: 0,
        y: 0,
        w: 10,
        h: 5.625,
      });
    }

    console.log("  幻灯片", i + 1, "/", slideCount, id != null ? `(slide_id=${id})` : "");
    if (betweenSlidesMs > 0) await new Promise((r) => setTimeout(r, betweenSlidesMs));
  }

  await pptx.writeFile({ fileName: outFile });
  await browser.close();

  console.log("完成:", outFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


