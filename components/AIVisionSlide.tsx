"use client";

import { useState } from "react";
import { Compass, Factory, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

const visionData = {
  header: {
    title: "AI 顶层设计与战略愿景",
    subtitle: "吸纳顶层方法论，锚定北极星指标，构筑“数智同仁”新生态",
  },
  northStar: {
    tag: "North Star Vision",
    title: "战略定调：精准服务、持续跟进",
    desc: "天然吸纳同仁堂十五五顶层设计的方法论，跳过传统 IT 漫长的技术试错期。直接站在大模型时代的巨人肩膀上，实现数字化转型的弯道超车。",
  },
  twinEngines: {
    title: "天然优势：双端原生协同",
    subtitle: "摒弃“先建系统、后加 AI”的外挂模式，伴随集团建设步伐原生植入 AI 大脑",
    items: [
      {
        id: "management" as const,
        title: "管控端：原生智治",
        desc: "伴随集团管控体系升级，同步铺设 AI 决策网络。让合规风控、财务预测、人事调度从信息化直接跃升为智能化。",
      },
      {
        id: "industry" as const,
        title: "产业端：原生智造",
        desc: "深度咬合产业链建设，将 AI 作为核心生产要素注入。赋能新药研发发现、智能显微镜质检与精准营销全链路。",
      },
    ],
  },
  coreMission: {
    title: "核心使命：用 AI 语言将中医药“说清楚，讲明白”",
    desc: "破译传统中医药的认知密码。利用大模型与重交互技术，将晦涩的古籍文献和机理，转化为现代消费者可感知、可互动的数字体验，打造高科技国潮品牌形象。",
  },
} as const;

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function MissionIcon({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex text-amber-800", className)}>
      <MessageSquare className="h-8 w-8 md:h-9 md:w-9" strokeWidth={1.5} aria-hidden />
      <Sparkles
        className="absolute -right-1 -top-1 h-4 w-4 text-amber-500/90 md:h-5 md:w-5"
        strokeWidth={2}
        aria-hidden
      />
    </span>
  );
}

export default function AIVisionSlide() {
  const [twinHover, setTwinHover] = useState<"management" | "industry" | null>(null);

  return (
    <div className="relative min-h-full overflow-hidden bg-[#fcfcfd] px-4 py-8 md:px-8 md:py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100%,720px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.12),transparent_58%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[280px] w-full max-w-4xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(59,130,246,0.06),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
        <div className="vision-tower-north flex w-full flex-col items-center">
          <header className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl lg:text-[2rem]">
              {visionData.header.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[#64748b] md:text-base">
              {visionData.header.subtitle}
            </p>
          </header>

          {/* 北极星卡片 */}
          <div className="mt-8 w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-violet-200/50 bg-gradient-to-br from-violet-50/90 via-white/70 to-sky-50/80 p-6 shadow-[0_20px_60px_-28px_rgba(91,33,182,0.22)] backdrop-blur-xl md:p-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              <div
                className="vision-north-star-icon flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-[0_8px_32px_-8px_rgba(139,92,246,0.45)] ring-1 ring-violet-200/60"
                aria-hidden
              >
                <Compass className="h-8 w-8 text-violet-600" strokeWidth={1.35} />
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-500/90 md:text-[11px]">
                {visionData.northStar.tag}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#1e1b4b] md:text-2xl">
                {visionData.northStar.title}
              </h3>
              <p className="mt-4 max-w-2xl text-left text-sm leading-relaxed text-[#475569] md:text-center md:text-[0.95rem]">
                {visionData.northStar.desc}
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* 双引擎 */}
        <div className="vision-tower-engines mt-12 w-full max-w-5xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#111827] md:text-xl">{visionData.twinEngines.title}</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#64748b]">{visionData.twinEngines.subtitle}</p>
          </div>

          <div className="relative mt-8 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4 lg:gap-6">
            {/* 左卡 */}
            <div
              className={cn(
                "vision-engine-left rounded-2xl border bg-white/90 p-5 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-300 md:p-6",
                twinHover === "management"
                  ? "border-blue-400/60 shadow-[0_16px_48px_-18px_rgba(37,99,235,0.28)] ring-2 ring-blue-400/25"
                  : "border-slate-200/80",
                twinHover === "industry" && "md:opacity-55",
              )}
              onMouseEnter={() => setTwinHover("management")}
              onMouseLeave={() => setTwinHover(null)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-all duration-300",
                    twinHover === "management" && "bg-blue-50 shadow-[0_0_24px_-4px_rgba(37,99,235,0.45)]",
                  )}
                >
                  <ShieldCheck
                    className={cn(
                      "h-6 w-6 text-slate-600 transition-colors duration-300",
                      twinHover === "management" && "text-blue-600",
                    )}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#0f172a] md:text-lg">
                    {visionData.twinEngines.items[0].title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{visionData.twinEngines.items[0].desc}</p>
                </div>
              </div>
            </div>

            {/* 中轴：能量束 + 光核 */}
            <div className="relative hidden min-h-[200px] w-[88px] shrink-0 flex-col items-center justify-center md:flex lg:w-[104px]">
              <div
                className="vision-twin-beam pointer-events-none absolute right-1/2 top-[46%] h-[2px] w-[min(140px,14vw)] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-violet-400/65 to-violet-500/35"
                aria-hidden
              />
              <div
                className="vision-twin-beam pointer-events-none absolute left-1/2 top-[46%] h-[2px] w-[min(140px,14vw)] -translate-y-1/2 rounded-full bg-gradient-to-l from-transparent via-violet-400/65 to-violet-500/35"
                aria-hidden
              />
              <div className="vision-ai-core relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-violet-500/15 via-white to-sky-500/20 shadow-[0_0_40px_-8px_rgba(139,92,246,0.55)] ring-1 ring-violet-200/80">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-400/20 to-sky-400/25 blur-sm" />
                <CpuCoreGlyph className="relative z-10 h-9 w-9 text-violet-700" />
              </div>
              <span className="relative z-10 mt-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-500/80">
                AI Core
              </span>
            </div>

            {/* 右卡 */}
            <div
              className={cn(
                "vision-engine-right rounded-2xl border bg-white/90 p-5 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-300 md:p-6",
                twinHover === "industry"
                  ? "border-[#c81e1e]/45 shadow-[0_16px_48px_-18px_rgba(200,30,30,0.22)] ring-2 ring-[#c81e1e]/20"
                  : "border-slate-200/80",
                twinHover === "management" && "md:opacity-55",
              )}
              onMouseEnter={() => setTwinHover("industry")}
              onMouseLeave={() => setTwinHover(null)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-all duration-300",
                    twinHover === "industry" && "bg-red-50 shadow-[0_0_24px_-4px_rgba(200,30,30,0.4)]",
                  )}
                >
                  <Factory
                    className={cn(
                      "h-6 w-6 text-slate-600 transition-colors duration-300",
                      twinHover === "industry" && "text-[#b91c1c]",
                    )}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#0f172a] md:text-lg">
                    {visionData.twinEngines.items[1].title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{visionData.twinEngines.items[1].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 移动端：简化的中轴提示 */}
          <div className="mt-6 flex justify-center md:hidden">
            <div className="vision-ai-core flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/15 to-sky-500/20 ring-1 ring-violet-200/80">
              <CpuCoreGlyph className="h-7 w-7 text-violet-700" />
            </div>
          </div>
        </div>

        {/* 核心使命基座 */}
        <div className="vision-tower-base mt-12 w-full max-w-5xl pb-4">
          <div className="relative overflow-hidden rounded-3xl border border-amber-200/40 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 p-6 shadow-[0_18px_50px_-24px_rgba(180,83,9,0.15)] md:p-8">
            <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-amber-200/20 blur-3xl" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-sm ring-1 ring-amber-200/50 md:h-16 md:w-16">
                <MissionIcon />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold leading-snug text-[#1c1917] md:text-xl lg:text-2xl">
                  {visionData.coreMission.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#57534e] md:text-base">{visionData.coreMission.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 简化的「核心」符号，避免与页面其它图标重复 */
function CpuCoreGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2M6.4 6.4l1.4 1.4M16.2 16.2l1.4 1.4M6.4 17.6l1.4-1.4M16.2 7.8l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
