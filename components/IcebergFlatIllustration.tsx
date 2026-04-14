"use client";

import { useCallback, useState } from "react";

type VisibleM = { id: string; title: string; desc: string; x: number; y: number };
type HiddenM = VisibleM & { solution: string };

const VISIBLE: VisibleM[] = [
  { id: "v1", title: "人效遭遇瓶颈", desc: "一线门店药师服务标准不一，人工培训周期长、成本高昂", x: 14, y: 18 },
  { id: "v2", title: "合规与质检盲区", desc: "传统抽检覆盖率低，飞检合规风险难以做到100%实时把控", x: 50, y: 12 },
  { id: "v3", title: "营销同质化严重", desc: "缺乏精准的用户触达手段，营销转化率遭遇天花板", x: 86, y: 22 },
];

const HIDDEN: HiddenM[] = [
  {
    id: "h1",
    title: "核心经验断层 (知识流失)",
    desc: "名老中医的宝贵诊疗经验难以被结构化、数字化传承与复用",
    solution: "需引入 RAG 与大模型进行知识蒸馏",
    x: 18,
    y: 58,
  },
  {
    id: "h2",
    title: "业财数据孤岛 (数据割裂)",
    desc: "各业务线系统独立运作，缺乏统揽全局的大数据分析大脑",
    solution: "需构建统一数据中台与智能分析引擎",
    x: 52,
    y: 72,
  },
  {
    id: "h3",
    title: "底层算力分散 (IT负债)",
    desc: "烟囱式 IT 建设导致异构硬件繁杂，算力资源闲置与复用率极低",
    solution: "需集团统建同构算力底座",
    x: 82,
    y: 62,
  },
];

function MarkerDot({
  active,
  onToggle,
  tier,
}: {
  active: boolean;
  onToggle: () => void;
  tier: "visible" | "hidden";
}) {
  const ring = tier === "visible" ? "ring-slate-300/90" : "ring-indigo-400/80";
  const bg = tier === "visible" ? "bg-white" : "bg-indigo-50";
  const dot = tier === "visible" ? "bg-slate-600" : "bg-indigo-600";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative z-30 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md ring-2 transition-transform duration-200 hover:scale-110 active:scale-95 ${ring} ${bg}`}
      aria-expanded={active}
      aria-label="展开或收起说明"
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dot} ${active ? "scale-125" : ""} transition-transform`} />
    </button>
  );
}

function MarkerPanel({
  item,
  tier,
  active,
  placement,
}: {
  item: VisibleM | HiddenM;
  tier: "visible" | "hidden";
  active: boolean;
  placement: "below" | "above";
}) {
  const isHidden = tier === "hidden";
  const pos =
    placement === "below"
      ? "left-1/2 top-[calc(50%+18px)] -translate-x-1/2"
      : "left-1/2 bottom-[calc(50%+18px)] -translate-x-1/2";

  return (
    <div
      className={`pointer-events-none absolute z-20 w-[min(220px,46vw)] md:w-[238px] ${pos}`}
    >
      <div
        className={`pointer-events-auto rounded-2xl border px-3 py-2.5 shadow-lg transition-all duration-300 md:px-4 md:py-3 ${
          active ? "scale-[1.02] shadow-xl" : "shadow-md"
        } ${
          isHidden
            ? "border-indigo-200/90 bg-indigo-50/98 text-indigo-950"
            : "border-[#e5e7eb] bg-white/98 text-[#111827]"
        }`}
      >
        <p className="text-xs font-semibold leading-snug md:text-sm">{item.title}</p>
        {active ? (
          <>
            <p className={`mt-2 text-[11px] leading-relaxed md:text-xs ${isHidden ? "text-indigo-900/85" : "text-[#64748b]"}`}>{item.desc}</p>
            {isHidden && "solution" in item ? (
              <div className="mt-2 rounded-lg border border-amber-200/85 bg-amber-50 px-2 py-1.5">
                <p className="text-[9px] font-bold uppercase tracking-wide text-amber-900/75">破局方案</p>
                <p className="mt-0.5 text-[10px] font-medium leading-relaxed text-amber-950 md:text-[11px]">{item.solution}</p>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-1 text-[10px] text-[#94a3b8]">点击圆点查看</p>
        )}
      </div>
    </div>
  );
}

export default function IcebergFlatIllustration() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] shadow-[0_10px_40px_-18px_rgba(15,23,42,0.12)]">
      <div className="relative aspect-[1200/680] w-full min-h-[300px] md:min-h-[380px]">
        <svg
          className="iceberg-2d-float absolute inset-0 h-full w-full select-none"
          viewBox="0 0 1200 680"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="iceberg2d-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#eef2f7" />
            </linearGradient>
            <linearGradient id="iceberg2d-water" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="iceberg2d-sub" x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#3730a3" />
              <stop offset="45%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="iceberg2d-tip" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="iceberg2d-soft" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset dy="2" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.18" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="1200" height="680" fill="url(#iceberg2d-sky)" />

          {/* 水下主体 */}
          <path
            fill="url(#iceberg2d-sub)"
            filter="url(#iceberg2d-soft)"
            d="M 600 312               C 505 332, 395 415, 352 530
               C 318 615, 455 672, 600 676
               C 745 672, 882 615, 848 530
               C 805 415, 695 332, 600 312 Z"
          />

          {/* 水上冰冠 */}
          <path
            fill="url(#iceberg2d-tip)"
            filter="url(#iceberg2d-soft)"
            d="M 600 312
               L 535 198 L 495 248 L 452 158 L 412 228 L 368 278
               L 445 302 L 515 288 L 600 312
               L 685 288 L 755 302 L 832 278 L 788 228 L 748 158 L 705 248 L 665 198 Z"
          />
          <path
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.15"
            opacity="0.9"
            d="M 600 312
               L 535 198 L 495 248 L 452 158 L 412 228 L 368 278
               L 445 302 L 515 288 L 600 312
               L 685 288 L 755 302 L 832 278 L 788 228 L 748 158 L 705 248 L 665 198 Z"
          />

          {/* 水体覆盖下半屏 */}
          <path fill="url(#iceberg2d-water)" d="M 0 312 L 1200 312 L 1200 680 L 0 680 Z" />

          {/* 浪线 */}
          <path
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.2"
            strokeLinecap="round"
            d="M 0 312 Q 200 298, 400 312 T 800 312 T 1200 308"
          />
          <path
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="1"
            strokeDasharray="5 12"
            opacity="0.75"
            d="M 0 318 Q 240 328, 480 318 T 960 318 T 1200 322"
          />

          <g transform="translate(600, 300)">
            <rect x="-168" y="-36" width="336" height="26" rx="13" fill="#fff1f2" stroke="#fecaca" strokeWidth="1" />
            <text x="0" y="-18" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="600" fontFamily="ui-sans-serif, system-ui, sans-serif">
              认知分界线 · 数字化转型的深水区
            </text>
          </g>
        </svg>

        {VISIBLE.map((item) => (
          <div key={item.id} className="absolute" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
            <MarkerDot tier="visible" active={openId === item.id} onToggle={() => toggle(item.id)} />
            <MarkerPanel item={item} tier="visible" active={openId === item.id} placement="below" />
          </div>
        ))}

        {HIDDEN.map((item) => (
          <div key={item.id} className="absolute" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
            <MarkerDot tier="hidden" active={openId === item.id} onToggle={() => toggle(item.id)} />
            <MarkerPanel item={item} tier="hidden" active={openId === item.id} placement="above" />
          </div>
        ))}
      </div>

      <p className="border-t border-[#f1f5f9] bg-[#fafbfc] px-3 py-2 text-center text-[10px] leading-relaxed text-[#94a3b8] md:text-[11px]">
        算力基座服务目的是避免形成新的 AI 孤岛，造成数据和资源的浪费
      </p>
    </div>
  );
}
