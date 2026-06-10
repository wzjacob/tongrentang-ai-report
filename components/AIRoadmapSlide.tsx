"use client";

import { useState } from "react";
import { Bot, Brain, CheckCircle2, Cpu, Sparkles } from "lucide-react";

const roadmapData = {
  header: {
    title: "实施路线总结：推广期3个月 + 深化期3个月",
    subtitle: "推荐方案约50.8万（中台授权与技术支持50万 + Token池约0.8万/年），分两阶段推进",
  },
  phases: [
    {
      step: "阶段 01",
      name: "推广期（M1-M3）",
      type: "foundation" as const,
      dataFocus: "阶段目标：上线与验证",
      dataDesc: "完成推荐方案预算执行并上线问药/问数/问策，组织100人试用并稳定支撑约10并发",
      tasks: ["中台授权与技术支持50万落地", "Token池约0.8万/年开通", "应用服务器申请集团现有资源（0元）"],
    },
    {
      step: "阶段 02",
      name: "深化期（M4-M6）",
      type: "climax" as const,
      dataFocus: "阶段目标：提效与收口",
      dataDesc: "围绕准确率、跨单位数据联动和策略可执行性开展专项提升，输出下一阶段扩展建议",
      tasks: [
        "建立低分问题专项优化机制",
        "形成跨单位数据联动与治理规则",
        "完成阶段评审并提交扩展建议书",
      ],
      outcome: "形成“推广落地—深化提效—评审扩展”的闭环机制，作为下一阶段投入决策依据",
    },
  ],
} as const;

const foundationPhases = roadmapData.phases.filter((p) => p.type === "foundation");
const climaxPhase = roadmapData.phases.find((p) => p.type === "climax")!;

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function AIRoadmapSlide() {
  const [spotlight, setSpotlight] = useState<number | "climax" | null>(null);
  const [climaxHover, setClimaxHover] = useState(false);
  const monthlyRoadmap = [
    {
      month: "M1",
      phase: "推广期",
      focus: "预算与底座落地",
      items: ["完成50.8万推荐方案预算锁定", "中台能力部署上线"],
    },
    {
      month: "M2",
      phase: "推广期",
      focus: "三场景联调上线",
      items: ["问药/问数/问策联调", "接口、权限、日志打通"],
    },
    {
      month: "M3",
      phase: "推广期",
      focus: "试用验收",
      items: ["组织100人试用", "稳定支撑约10并发"],
    },
    {
      month: "M4",
      phase: "深化期",
      focus: "准确率提升",
      items: ["低分问题专项优化", "知识库补齐与回归测试"],
    },
    {
      month: "M5",
      phase: "深化期",
      focus: "跨单位联动",
      items: ["形成跨单位数据联动规则", "重点看板联动验证"],
    },
    {
      month: "M6",
      phase: "深化期",
      focus: "阶段收口",
      items: ["提交阶段评审结果", "输出下一阶段扩展建议书"],
    },
  ] as const;

  return (
    <div className="min-h-full bg-[#fcfcfd] px-2 py-5 md:px-5 md:py-7">
      <header className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl lg:text-[2rem]">
          {roadmapData.header.title}
        </h2>
        <p className="mt-2 text-sm font-medium text-[#64748b] md:text-base">{roadmapData.header.subtitle}</p>
      </header>

      {/* 区域 A：阶段01（推广期） */}
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#94a3b8] md:text-xs">
          阶段 01：推广期（3个月）
        </p>

        <div
          className={cn(
            "flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:grid md:snap-none md:gap-4 md:overflow-visible md:pb-0",
            foundationPhases.length <= 1 ? "md:grid-cols-1" : "md:grid-cols-2",
          )}
        >
          {foundationPhases.map((phase, index) => {
            const dim =
              spotlight !== null && (spotlight === "climax" || (typeof spotlight === "number" && spotlight !== index));
            return (
              <div
                key={phase.step}
                className={cn(
                  "roadmap-phase-card flex w-[min(280px,82vw)] shrink-0 snap-center flex-col rounded-2xl border border-[#e2e8f0] bg-white/90 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-300 md:w-auto",
                  dim && "scale-[0.97] opacity-[0.38]",
                  spotlight === index && "z-[1] scale-[1.02] shadow-[0_20px_50px_-15px_rgba(225,29,72,0.25)] ring-1 ring-rose-200",
                )}
                style={{ animationDelay: `${0.08 + index * 0.1}s` }}
                onMouseEnter={() => setSpotlight(index)}
                onMouseLeave={() => setSpotlight(null)}
              >
                {/* min-height：桌面四列网格下统一上半区高度，使中间流程条横向对齐 */}
                <div className="flex min-h-[200px] flex-col border-b border-rose-100/80 bg-white p-4 md:min-h-[19rem] md:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">{phase.step}</p>
                  <h3 className="mt-1 text-base font-semibold text-[#111827] md:text-lg">{phase.name}</h3>
                  <ul className="mt-3 flex-1 space-y-2">
                    {phase.tasks.map((t) => (
                      <li key={t} className="flex gap-2 text-left text-[11px] leading-snug text-[#374151] md:text-xs">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" aria-hidden />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex h-12 shrink-0 items-center bg-[#fcfcfd] px-1">
                  <div className="flex h-[3px] w-full max-w-full items-center">
                    <div
                      className={cn(
                        "h-full min-w-0 flex-1 rounded-l-full",
                        index === 0 ? "bg-transparent" : "roadmap-flow-segment",
                      )}
                      aria-hidden
                    />
                    <div className="relative z-10 mx-0.5 h-3 w-3 shrink-0 rounded-full bg-rose-600 shadow-[0_0_0_4px_#fcfcfd,0_0_14px_rgba(225,29,72,0.45)] ring-2 ring-rose-400/40" />
                    <div
                      className={cn(
                        "h-full min-w-0 flex-1 rounded-r-full",
                        index === foundationPhases.length - 1 ? "bg-transparent" : "roadmap-flow-segment",
                      )}
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col rounded-b-2xl border-t border-rose-100/60 bg-gradient-to-b from-rose-50/90 to-rose-100/40 p-4 backdrop-blur-md md:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-rose-600">{phase.dataFocus}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#334155] md:text-xs">{phase.dataDesc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 移动端：连续流动条 */}
        <div className="relative mx-2 mt-2 h-[3px] overflow-hidden rounded-full bg-rose-100/80 md:hidden">
          <div className="roadmap-flow-mobile h-full w-[40%] rounded-full bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
        </div>
      </div>

      <section className="mx-auto mt-6 max-w-7xl rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:p-5">
        <h3 className="text-lg font-semibold text-[#111827] md:text-xl">实施路线图（M1-M6）</h3>
        <p className="mt-1 text-xs text-[#6b7280] md:text-sm">按月推进：前3个月完成推广落地，后3个月完成深化提效与阶段收口</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {monthlyRoadmap.map((node) => {
            const isPromotion = node.phase === "推广期";
            return (
              <article
                key={node.month}
                className={[
                  "rounded-xl border p-3",
                  isPromotion ? "border-rose-200 bg-rose-50/40" : "border-amber-200 bg-amber-50/35",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#111827]">{node.month}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${isPromotion ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                    {node.phase}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-[#1f2937]">{node.focus}</p>
                <ul className="mt-2 space-y-1.5 text-xs text-[#475569]">
                  {node.items.map((item) => (
                    <li key={item} className="flex gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#94a3b8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* 区域 B：阶段02（深化期） */}
      <div className="mx-auto mt-10 max-w-7xl md:mt-14">
        <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#94a3b8] md:text-xs">
          阶段 02：深化期（3个月）
        </p>

        <div className="roadmap-phase5-enter">
          <div
            className={cn(
              "roadmap-climax-shell relative overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950 via-[#3f0f12] to-[#7f1d1d] p-6 text-white shadow-[0_24px_70px_-20px_rgba(185,28,28,0.55)] md:p-10",
              climaxHover && "roadmap-climax-active",
            )}
            onMouseEnter={() => {
              setClimaxHover(true);
              setSpotlight("climax");
            }}
            onMouseLeave={() => {
              setClimaxHover(false);
              setSpotlight(null);
            }}
          >
            <div
              className={cn(
                "pointer-events-none absolute -right-20 -top-20 z-[1] h-56 w-56 rounded-full bg-red-500/20 blur-3xl transition-opacity duration-500",
                climaxHover ? "opacity-100" : "opacity-60",
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute -bottom-16 -left-16 z-[1] h-48 w-48 rounded-full bg-amber-500/10 blur-3xl transition-opacity duration-500",
                climaxHover ? "opacity-90" : "opacity-50",
              )}
            />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex shrink-0 flex-col items-center gap-4 lg:w-[220px]">
              <div className="roadmap-climax-pulse relative flex h-28 w-28 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 to-transparent" />
                <div className="relative flex items-center gap-1">
                  <Brain className="h-10 w-10 text-rose-200" strokeWidth={1.25} />
                  <Cpu className="h-9 w-9 text-amber-200" strokeWidth={1.25} />
                  <Bot className="h-9 w-9 text-red-200" strokeWidth={1.25} />
                </div>
                <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-200/90" />
              </div>
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-200/80">
                大脑 + 执行
              </p>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-300/90">{climaxPhase.step}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl lg:text-[1.65rem]">
                {climaxPhase.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-rose-200/90">{climaxPhase.dataFocus}</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300/95">{climaxPhase.dataDesc}</p>

              <ul className="mt-6 space-y-2.5">
                {climaxPhase.tasks.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-slate-100/95">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="roadmap-outcome-glow mt-8 rounded-2xl border border-amber-400/35 bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-amber-500/15 px-5 py-4 md:px-6 md:py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200/90">质变成果</p>
                <p className="mt-2 text-base font-semibold leading-snug text-amber-50 md:text-lg">{climaxPhase.outcome}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
