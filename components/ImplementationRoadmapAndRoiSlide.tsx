"use client";

import { BarChart3, CalendarClock, LineChart, Rocket, ShieldCheck, TrendingUp } from "lucide-react";

const roadmapData = {
  title: "十五五初期：三个月破局，六个月成军的实施路线图",
  phases: [
    {
      range: "第 1-2 个月",
      title: "基建搭建与首战",
      desc: "完成本地算力就绪与 AI 编排中台统建；“问药”智能体率先上线验证。",
      tag: "问药上线",
      start: 1,
      end: 2,
      color: "bg-rose-500",
    },
    {
      range: "第 3-4 个月",
      title: "数据融合与深水区",
      desc: "打通主数据只读视图，完成语义转 SQL 微调，“问数”上线。",
      tag: "问数上线",
      start: 3,
      end: 4,
      color: "bg-sky-500",
    },
    {
      range: "第 5-6 个月",
      title: "全栈协同",
      desc: "门店外部数据汇聚，多 Agent 流水线跑通，“问策”全面上线。",
      tag: "问策上线",
      start: 5,
      end: 6,
      color: "bg-violet-500",
    },
  ],
  roi: [
    {
      title: "降本增效",
      metric: "40%",
      unit: "培训通过率提升",
      desc: "一线导购与药师产品培训周期缩短，整体通过率显著提升。",
      icon: "shield" as const,
      tone: "emerald" as const,
    },
    {
      title: "敏捷决策",
      metric: "周级 -> 秒级",
      unit: "分析时效压缩",
      desc: "管理层数据查询与多维分析耗时由“周级别”压缩到“秒级”。",
      icon: "line" as const,
      tone: "blue" as const,
    },
    {
      title: "营销响应",
      metric: "100%",
      unit: "策略生成自动化",
      desc: "区域竞品报告及营销策略生成实现自动化，消除人工滞后。",
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
          <p className="inline-flex items-center rounded-full border border-[#e5e7eb] bg-white px-3 py-1 text-xs font-semibold tracking-[0.08em] text-slate-700">
            收官页 · 路线图与ROI
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{roadmapData.title}</h2>
        </div>

        <section className="mt-6 rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <CalendarClock className="h-4.5 w-4.5 text-sky-600" />
            顶部时间轴
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
              <article key={phase.range} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4">
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
            预期 ROI 价值区
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {roadmapData.roi.map((item) => {
              const tone = roiTone[item.tone];
              return (
                <article key={item.title} className={`rounded-3xl border p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ${tone.card}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-[#111827]">{item.title}</h3>
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone.icon}`}>
                      <RoiIcon icon={item.icon} />
                    </span>
                  </div>
                  <p className={`mt-3 text-4xl font-black tracking-tight ${tone.number} md:text-5xl`}>{item.metric}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{item.unit}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-[#fecaca] bg-[#fff1f2] px-4 py-2 text-sm font-semibold text-[#7f1d1d]">
          <TrendingUp className="h-4.5 w-4.5 text-[#b91c1c]" />
          <span>6个月形成“可复制、可衡量、可持续”的集团级 AI 作战体系</span>
        </div>
      </div>
    </div>
  );
}
