"use client";

import { BadgeAlert, Building2, Cpu, Database, Network, Server, ShieldCheck } from "lucide-react";

const physicalArchData = {
  title: "云网一体：本地化算力中心物理架构",
  subtitle: "弱化参数堆叠，强化安全、集约与可持续运营能力",
  corePositioning: "筑牢集团自主可控的数智化基座，打造 AI 时代的“水电煤”。",
  layers: [
    {
      id: "room",
      title: "物理机房层",
      desc: "初期采用 6kW 机柜租赁，满足基础供电与散热。",
      tone: "slate" as const,
    },
    {
      id: "cluster",
      title: "算力集群层",
      desc: "划分核心信创推理池与边缘通用算力池，兼顾高可用与弹性扩展。",
      tone: "blue" as const,
    },
    {
      id: "dispatch",
      title: "调度平台层",
      desc: "AI PaaS 平台实现多型号显卡异构纳管与算力切片分配。",
      tone: "violet" as const,
    },
  ],
  highlights: ["数据不出域", "资产全生命周期统管", "杜绝各单位分散重复建设"],
} as const;

const toneStyles = {
  slate: "border-slate-300 bg-slate-100 text-slate-700",
  blue: "border-sky-200 bg-sky-50 text-sky-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
} as const;

export default function LocalComputeCenterPhysicalArchSlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-[#fecaca] bg-[#fff1f2] px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#b91c1c]">
            模块二 · 基础架构与可落地性
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{physicalArchData.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{physicalArchData.subtitle}</p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] lg:col-span-2 md:p-6">
            <div className="rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3">
              <p className="text-sm font-semibold text-[#b91c1c]">{physicalArchData.corePositioning}</p>
            </div>

            <div className="mt-5">
              <div className="mx-auto flex w-full max-w-2xl flex-col-reverse gap-3">
                {physicalArchData.layers.map((layer, idx) => (
                  <div key={layer.id} className={`rounded-2xl border p-4 ${toneStyles[layer.tone]}`}>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold md:text-lg">{layer.title}</h3>
                      <span className="rounded-full border border-white/60 bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                        Layer {idx + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{layer.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-4 grid w-full max-w-2xl gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Server className="h-3.5 w-3.5" />
                    服务器意向
                  </p>
                  <div className="space-y-1.5">
                    <div className="h-2.5 rounded bg-slate-200" />
                    <div className="h-2.5 rounded bg-slate-300/80" />
                    <div className="h-2.5 rounded bg-slate-200" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Network className="h-3.5 w-3.5" />
                    网络拓扑意向
                  </p>
                  <div className="relative h-12">
                    <div className="absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-500" />
                    <div className="absolute bottom-1 left-2 h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <div className="absolute bottom-1 right-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <div className="absolute left-1/2 top-2 h-8 w-px -translate-x-1/2 bg-sky-400/70" />
                    <div className="absolute bottom-2 left-4 right-4 h-px bg-slate-300" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Building2 className="h-3.5 w-3.5" />
                    云网一体节点
                  </p>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] text-slate-700">
                    <span>机房</span>
                    <Cpu className="h-3.5 w-3.5 text-slate-500" />
                    <span>PaaS</span>
                    <Database className="h-3.5 w-3.5 text-slate-500" />
                    <span>数据</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-3xl border border-[#fecaca] bg-[#fff1f2] p-5 shadow-[0_12px_28px_rgba(185,28,28,0.12)] md:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#b91c1c] text-white">
                <ShieldCheck className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-lg font-semibold text-[#7f1d1d]">安全与集约化高亮</h3>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="rounded-2xl border border-[#fca5a5] bg-white px-3 py-2.5 text-center text-sm font-semibold text-[#b91c1c] shadow-sm">
                数据绝不出域
              </div>

              {physicalArchData.highlights.slice(1).map((item) => (
                <div key={item} className="rounded-2xl border border-[#fecaca] bg-white px-3 py-2.5 text-sm font-medium text-[#7f1d1d]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[#fca5a5] bg-white/80 px-3 py-2 text-xs leading-relaxed text-[#991b1b]">
              <p className="flex items-center gap-1.5 font-semibold">
                <BadgeAlert className="h-3.5 w-3.5" />
                安全红线
              </p>
              <p className="mt-1">任何分析、训练与推理过程均在可控域内执行，严格落实合规与审计要求。</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
