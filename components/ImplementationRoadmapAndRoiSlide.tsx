"use client";

import { BarChart3, CalendarClock, LineChart, Rocket, ShieldCheck, TrendingUp } from "lucide-react";

const roadmapData = {
  title: "推广期与深化期实施路线图（6个月）",
  phases: [
    {
      range: "第 1-2 个月",
      title: "底座搭建与首批上线",
      desc: "完成本地算力就绪与业务中枢统建；“问药”专题率先上线验证。",
      tag: "问药上线",
      start: 1,
      end: 2,
      color: "bg-rose-500",
    },
    {
      range: "第 3-4 个月",
      title: "数据融合与能力验证",
      desc: "打通主数据只读视图，完成语义转 SQL 优化，“问数”专题上线。",
      tag: "问数上线",
      start: 3,
      end: 4,
      color: "bg-sky-500",
    },
    {
      range: "第 5-6 个月",
      title: "协同运行与策略落地",
      desc: "门店外部数据汇聚，多角色协同流程跑通，“问策”专题全面上线。",
      tag: "问策上线",
      start: 5,
      end: 6,
      color: "bg-violet-500",
    },
  ],
  roi: [
    {
      title: "AI能力认知与场景想象",
      phase: "从0到1",
      focus: "先让业务团队敢用、会用本地AI",
      desc: "围绕同仁堂本地AI能力开展认知培训与场景共创，形成“先试用、再沉淀”的使用习惯。",
      actions: ["建立统一入口与示例问法", "按部门组织小范围试用", "沉淀可复用场景清单"],
      icon: "shield" as const,
      tone: "emerald" as const,
    },
    {
      title: "新技术与新场景持续跟进",
      phase: "从0到1",
      focus: "建立“评估-试点-复盘”闭环",
      desc: "对眼前新技术和新场景保持月度跟进，先做小范围验证，再决定是否纳入集团推进节奏。",
      actions: ["月度技术与场景盘点", "试点结果复盘与归档", "形成是否继续投入的判断依据"],
      icon: "line" as const,
      tone: "blue" as const,
    },
    {
      title: "问数推进数据积累与质量提升",
      phase: "从0到1",
      focus: "在使用中反哺数据治理",
      desc: "通过问数过程持续暴露口径、缺失与质量问题；同时结合问药反馈机制，用问题牵引数据与知识的持续补齐。",
      actions: ["建立高频问题回收机制", "按周修订指标口径与字典", "形成问药/问数联动反馈闭环"],
      icon: "line" as const,
      tone: "blue" as const,
    },
    {
      title: "问策沉淀与市场机制铺开",
      phase: "从0到1",
      focus: "策略方法先沉淀、能力建设先行",
      desc: "问策侧重点是策略模板与机制沉淀；具体营销执行可由营销团队按业务节奏自主引入第三方推进。",
      actions: ["沉淀可复用策略模板", "建立区域策略复盘机制", "营销侧自主对接第三方执行"],
      icon: "rocket" as const,
      tone: "violet" as const,
    },
  ],
} as const;

const roiTone = {
  emerald: {
    card: "border-emerald-200 bg-emerald-50",
    number: "text-emerald-700",
    icon: "bg-emerald-100 text-emerald-700",
  },
  blue: {
    card: "border-sky-200 bg-sky-50",
    number: "text-sky-700",
    icon: "bg-sky-100 text-sky-700",
  },
  violet: {
    card: "border-violet-200 bg-violet-50",
    number: "text-violet-700",
    icon: "bg-violet-100 text-violet-700",
  },
} as const;

function RoiIcon({ icon }: { icon: "shield" | "line" | "rocket" }) {
  if (icon === "shield") return <ShieldCheck className="h-5 w-5" />;
  if (icon === "line") return <LineChart className="h-5 w-5" />;
  return <Rocket className="h-5 w-5" />;
}

export default function ImplementationRoadmapAndRoiSlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="report-chip">
            收官页 · 路线图与ROI
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{roadmapData.title}</h2>
        </div>

        <section className="report-panel mt-6 p-5 md:p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <CalendarClock className="h-4.5 w-4.5 text-sky-600" />
            时间轴
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="grid grid-cols-6 gap-1 text-center text-[10px] font-semibold text-slate-500">
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <div key={m}>M{m}</div>
              ))}
            </div>
            <div className="relative mt-2 h-28 rounded-xl border border-slate-200 bg-white">
              {roadmapData.phases.map((phase, idx) => {
                const left = ((phase.start - 1) / 6) * 100;
                const width = ((phase.end - phase.start + 1) / 6) * 100;
                const top = 8 + idx * 32;
                return (
                  <div key={`${phase.range}-bar`} className="absolute" style={{ left: `${left}%`, width: `${width}%`, top }}>
                    <div className={`rounded-md px-2 py-1 text-[10px] font-semibold text-white ${phase.color}`}>{phase.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {roadmapData.phases.map((phase, idx) => (
              <article key={phase.range} className="report-panel-soft relative p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">{phase.range}</p>
                <h3 className="mt-1.5 text-base font-semibold text-[#111827]">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{phase.desc}</p>
                <div className="mt-3 inline-flex rounded-full border border-sky-200 bg-white px-2.5 py-1 text-xs font-semibold text-sky-700">
                  {phase.tag}
                </div>
                {idx < roadmapData.phases.length - 1 ? (
                  <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-[2px] w-4 -translate-y-1/2 bg-gradient-to-r from-sky-400 to-sky-200 md:block" />
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BarChart3 className="h-4.5 w-4.5 text-[#b91c1c]" />
            建设成效
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roadmapData.roi.map((item) => {
              const tone = roiTone[item.tone];
              return (
                <article key={item.title} className={`report-panel p-5 ${tone.card}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-[#111827]">{item.title}</h3>
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>
                      <RoiIcon icon={item.icon} />
                    </span>
                  </div>
                  <div className="mt-3 inline-flex rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {item.phase}
                  </div>
                  <p className={`mt-2 text-base font-semibold ${tone.number}`}>{item.focus}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                    {item.actions.map((line) => (
                      <li key={line} className="flex gap-1.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <div className="report-conclusion mx-auto mt-5 flex w-fit items-center gap-2 text-sm font-semibold text-slate-700">
          <TrendingUp className="h-4.5 w-4.5 text-[#b91c1c]" />
          <span>先完成从0到1的能力建设，再按业务价值逐步扩大应用范围</span>
        </div>
      </div>
    </div>
  );
}
