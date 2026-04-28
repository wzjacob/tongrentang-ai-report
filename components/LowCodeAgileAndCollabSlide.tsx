"use client";

import { Cable, CheckCircle2, Database, Network, ShieldCheck, Users, Wrench } from "lucide-react";

const slideData = {
  title: "低代码敏捷实施与组织协同保障",
  subtitle: "以低代码加速试错，以组织协同保障落地，以数据治理守住底线",
  left: {
    title: "敏捷开发方法",
    items: [
      {
        title: "低代码编排先行",
        desc: "用 AI 编排中台快速搭建流程原型并验证业务逻辑，先跑通、后优化。",
      },
      {
        title: "复杂接口专业攻坚",
        desc: "对高复杂度接口与系统集成，由工程团队开展专项开发与稳定性治理。",
      },
      {
        title: "快速迭代闭环",
        desc: "按“需求-验证-复盘-迭代”周节奏推进，持续提升上线效率与可用性。",
      },
    ],
  },
  middle: {
    title: "协同铁三角",
    center: "AI核心平台",
    nodes: [
      { id: "it", name: "集团信息化部", role: "统筹架构" },
      { id: "biz", name: "业务关键用户", role: "定义场景 / 验收效果" },
      { id: "vendor", name: "实施服务商", role: "私有化部署与调优" },
    ],
  },
  right: {
    title: "数据治理底线",
    items: ["统一 API 接入标准", "零信任数据权限管控", "主数据清洗与标注规范"],
  },
} as const;

export default function LowCodeAgileAndCollabSlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-[0.08em] text-slate-700">
            模块二 · 可落地实施保障
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{slideData.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{slideData.subtitle}</p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <Wrench className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-lg font-semibold text-[#111827]">{slideData.left.title}</h3>
            </div>
            <div className="mt-4 space-y-3">
              {slideData.left.items.map((item) => (
                <article key={item.title} className="rounded-2xl border border-sky-100 bg-sky-50/40 p-3.5">
                  <p className="text-sm font-semibold text-sky-700">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4b5563]">{item.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_12px_26px_rgba(15,23,42,0.06)] md:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Network className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-lg font-semibold text-[#111827]">{slideData.middle.title}</h3>
            </div>

            <div className="relative mt-5 rounded-2xl border border-violet-100 bg-gradient-to-b from-violet-50/60 to-white p-4">
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                <Cable className="h-4 w-4" />
                {slideData.middle.center}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <article className="rounded-xl border border-[#b91c1c]/25 bg-[#fff1f2] p-3 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#b91c1c] text-white">
                      <Users className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-semibold text-[#b91c1c]">{slideData.middle.nodes[0].name}</p>
                    <span className="rounded-full border border-[#fecaca] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#b91c1c]">
                      主导
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#7f1d1d]">{slideData.middle.nodes[0].role}</p>
                </article>

                <article className="rounded-xl border border-violet-200 bg-white p-3">
                  <p className="text-sm font-semibold text-violet-700">{slideData.middle.nodes[1].name}</p>
                  <p className="mt-1.5 text-xs text-slate-600">{slideData.middle.nodes[1].role}</p>
                </article>

                <article className="rounded-xl border border-violet-200 bg-white p-3">
                  <p className="text-sm font-semibold text-violet-700">{slideData.middle.nodes[2].name}</p>
                  <p className="mt-1.5 text-xs text-slate-600">{slideData.middle.nodes[2].role}</p>
                </article>
              </div>

              <div className="pointer-events-none absolute left-1/2 top-[3.1rem] h-[2.5rem] w-px -translate-x-1/2 bg-gradient-to-b from-violet-300 to-[#b91c1c]/60" />
              <div className="pointer-events-none absolute left-1/2 top-[7.4rem] h-[2.6rem] w-[38%] -translate-x-[98%] border-t border-dashed border-violet-300" />
              <div className="pointer-events-none absolute left-1/2 top-[7.4rem] h-[2.6rem] w-[38%] border-t border-dashed border-violet-300" />
            </div>
          </section>

          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-lg font-semibold text-[#111827]">{slideData.right.title}</h3>
            </div>
            <div className="mt-4 space-y-3">
              {slideData.right.items.map((item, idx) => (
                <article
                  key={item}
                  className={`rounded-2xl border p-3.5 ${
                    idx === 0
                      ? "border-blue-200 bg-blue-50/50"
                      : idx === 1
                        ? "border-rose-200 bg-rose-50/50"
                        : "border-emerald-200 bg-emerald-50/50"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                        idx === 0 ? "bg-blue-100 text-blue-700" : idx === 1 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {idx === 0 ? <Database className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
