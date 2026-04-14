"use client";

import { useState } from "react";
import { Bot, Brain, CheckCircle2, Cpu, Sparkles } from "lucide-react";

const roadmapData = {
  header: {
    title: "十五五同仁堂AI平台实施路线图",
    subtitle: "从数据聚合到业务执行的 AI 演进路径",
  },
  phases: [
    {
      step: "Phase 01",
      name: "基建与速赢",
      type: "foundation" as const,
      dataFocus: "数据聚合与底座",
      dataDesc: "算力统建，打破孤岛，存量数据清洗入库",
      tasks: ["统一部署通用算力底座", "构建集团统一知识库", "部署通用大语言模型 (LLM)"],
    },
    {
      step: "Phase 02",
      name: "场景与数据",
      type: "foundation" as const,
      dataFocus: "场景反哺与生成",
      dataDesc: "硬件作为传感器，捕捉一线真实互动数据",
      tasks: ["上线 AI 智能工牌等端侧硬件", "赋能一线门店与生产工厂", "持续精进知识库丰容度"],
    },
    {
      step: "Phase 03",
      name: "表达与交互",
      type: "foundation" as const,
      dataFocus: "高保真数据输出",
      dataDesc: "利用高质量图谱，实现复杂知识可视化",
      tasks: ["建设重交互产品培训系统", "探索中医药“讲清楚、说明白”", "古籍与现代语境的 AI 映射"],
    },
    {
      step: "Phase 04",
      name: "预测与决策",
      type: "foundation" as const,
      dataFocus: "多模态数据智能",
      dataDesc: "全量数据质变，驱动核心生产力重构",
      tasks: ["商业公司辅助诊疗系统落地", "新药研发与大分子成分预测"],
    },
    {
      step: "Phase 05",
      name: "AI 指挥官 (全面智能体化)",
      type: "climax" as const,
      dataFocus: "脑手合一 (Brain + Hands)",
      dataDesc: "超越大语言模型，通过 AI 与 RPA 的深度融合，实现执行自动化",
      tasks: [
        "部署基于 Clawbot 的 AI 核心调度枢纽",
        "扩展挂载 Skills 插件与 RPA 执行器",
        "员工角色重塑：从执行者变为 Workflow 管理者",
      ],
      outcome: "重塑企业生产力结构，让每一位员工拥有专属 AI 团队",
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

  return (
    <div className="min-h-full bg-[#fcfcfd] px-2 py-5 md:px-5 md:py-7">
      <header className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl lg:text-[2rem]">
          {roadmapData.header.title}
        </h2>
        <p className="mt-2 text-sm font-medium text-[#64748b] md:text-base">{roadmapData.header.subtitle}</p>
      </header>

      {/* 区域 A：前四阶段 */}
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#94a3b8] md:text-xs">
          前沿积累区 · Phase 01 — 04
        </p>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 md:grid md:snap-none md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
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
                <div className="border-b border-rose-100/80 bg-white p-4 md:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">{phase.step}</p>
                  <h3 className="mt-1 text-base font-semibold text-[#111827] md:text-lg">{phase.name}</h3>
                  <ul className="mt-3 space-y-2">
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
                    <div className="relative z-10 mx-0.5 h-3 w-3 shrink-0 rounded-full bg-blue-600 shadow-[0_0_0_4px_#fcfcfd,0_0_14px_rgba(37,99,235,0.45)] ring-2 ring-blue-400/40" />
                    <div
                      className={cn(
                        "h-full min-w-0 flex-1 rounded-r-full",
                        index === foundationPhases.length - 1 ? "bg-transparent" : "roadmap-flow-segment",
                      )}
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col rounded-b-2xl border-t border-blue-100/60 bg-gradient-to-b from-blue-50/90 to-blue-100/40 p-4 backdrop-blur-md md:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-blue-600">{phase.dataFocus}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#334155] md:text-xs">{phase.dataDesc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 移动端：连续流动条 */}
        <div className="relative mx-2 mt-2 h-[3px] overflow-hidden rounded-full bg-blue-100/80 md:hidden">
          <div className="roadmap-flow-mobile h-full w-[40%] rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
      </div>

      {/* 区域 B：终局质变 */}
      <div className="mx-auto mt-10 max-w-7xl md:mt-14">
        <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#94a3b8] md:text-xs">
          终局质变区
        </p>

        <div className="roadmap-phase5-enter">
          <div
            className={cn(
              "roadmap-climax-shell relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-indigo-950 via-[#1e1b4b] to-purple-950 p-6 text-white shadow-[0_24px_70px_-20px_rgba(76,29,149,0.55)] md:p-10",
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
                "pointer-events-none absolute -right-20 -top-20 z-[1] h-56 w-56 rounded-full bg-purple-500/20 blur-3xl transition-opacity duration-500",
                climaxHover ? "opacity-100" : "opacity-60",
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute -bottom-16 -left-16 z-[1] h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition-opacity duration-500",
                climaxHover ? "opacity-90" : "opacity-50",
              )}
            />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex shrink-0 flex-col items-center gap-4 lg:w-[220px]">
              <div className="roadmap-climax-pulse relative flex h-28 w-28 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent" />
                <div className="relative flex items-center gap-1">
                  <Brain className="h-10 w-10 text-purple-200" strokeWidth={1.25} />
                  <Cpu className="h-9 w-9 text-cyan-200" strokeWidth={1.25} />
                  <Bot className="h-9 w-9 text-violet-200" strokeWidth={1.25} />
                </div>
                <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-200/90" />
              </div>
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-200/80">
                Brain + Hands
              </p>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-300/90">{climaxPhase.step}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl lg:text-[1.65rem]">
                {climaxPhase.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-purple-200/90">{climaxPhase.dataFocus}</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300/95">{climaxPhase.dataDesc}</p>

              <ul className="mt-6 space-y-2.5">
                {climaxPhase.tasks.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-slate-100/95">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
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
