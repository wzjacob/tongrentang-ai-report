"use client";

import { AlertTriangle, ShieldCheck, Sparkles, Stethoscope, Workflow } from "lucide-react";

const deepDiveData = {
  title: "智能体一：问药",
  subtitle: "基于“智小谱”知识图谱 (GraphRAG) 升级，打造标准、合规的产品赋能专家",
  leftPanel: {
    title: "数据来源 (多源异构分类)",
    items: [
      { name: "图谱基座数据", desc: "股份公司产品主数据、说明书解析、功效/配伍禁忌图谱", color: "blue" as const },
      { name: "业务经验数据", desc: "历年全系培训课件、门店常见问题库 (FAQ)、标准销售话术 SOP", color: "emerald" as const },
      { name: "风控合规数据", desc: "国家药典标准、广告法禁用词库、不良反应警示库", color: "rose" as const },
    ],
  },
  rightPanel: {
    tech: {
      title: "实现路径：GraphRAG (图谱检索增强)",
      desc: "打破传统 RAG 碎片化检索，大模型基于“药材-病症-禁忌”关系网进行多跳推理，彻底消除中医药知识幻觉。",
      compactDesc: "以“药材-病症-禁忌”关系网实现多跳推理，显著降低知识幻觉与误答风险。",
    },
    features: [
      {
        title: "多跳逻辑精准问答",
        desc: "解答复杂禁忌咨询（如特定病史能否服用），返回带权威引用的防幻觉答案",
        compactDesc: "复杂禁忌问答，附权威引用。",
      },
      {
        title: "结构化属性秒查",
        desc: "系统化输出产品基本属性、君臣佐使、绝对禁忌与规格信息",
        compactDesc: "关键属性与禁忌结构化秒查。",
      },
      {
        title: "合规推荐与红线拦截",
        desc: "触发敏感词自动预警，基于中医“同病异治”逻辑进行精准产品推荐",
        compactDesc: "敏感词预警 + 同病异治推荐。",
      },
    ],
  },
} as const;

const sourceStyleMap = {
  blue: {
    border: "border-blue-200",
    dot: "bg-blue-500",
    title: "text-blue-700",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
  },
  emerald: {
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    title: "text-emerald-700",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
  },
  rose: {
    border: "border-rose-200",
    dot: "bg-rose-500",
    title: "text-rose-700",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
  },
} as const;

const sourceIcons = [Workflow, Stethoscope, AlertTriangle] as const;
const featureIcons = [Sparkles, ShieldCheck, AlertTriangle] as const;

export default function AgentOneMedicineDeepDiveSlide({ showFullVersion = false }: { showFullVersion?: boolean }) {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-[#fecaca] bg-[#fff1f2] px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#b91c1c]">
            智能体 01 · 问药深度剖析
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{deepDiveData.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{deepDiveData.subtitle}</p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
            <h3 className="text-lg font-semibold text-[#111827]">{deepDiveData.leftPanel.title}</h3>
            <div className="mt-4 space-y-3">
              {deepDiveData.leftPanel.items.map((item, idx) => {
                const style = sourceStyleMap[item.color];
                const Icon = sourceIcons[idx] ?? Workflow;
                return (
                  <article key={item.name} className={`rounded-2xl border bg-white p-4 ${style.border}`}>
                    <div className="flex items-start gap-3">
                      <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconBg} ${style.iconText}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                          <h4 className={`text-sm font-semibold ${style.title} md:text-base`}>{item.name}</h4>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{item.desc}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <article className="rounded-3xl bg-[#111827] p-5 text-white shadow-[0_14px_34px_rgba(15,23,42,0.25)] md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fecaca]">技术中枢</p>
              <h3 className="mt-2 text-lg font-semibold md:text-xl">{deepDiveData.rightPanel.tech.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {showFullVersion ? deepDiveData.rightPanel.tech.desc : deepDiveData.rightPanel.tech.compactDesc}
              </p>
            </article>

            <article className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
              <h3 className="text-lg font-semibold text-[#111827]">核心能力（3项）</h3>
              <div className="mt-3 space-y-2.5">
                {deepDiveData.rightPanel.features.map((feature, idx) => {
                  const Icon = featureIcons[idx] ?? Sparkles;
                  return (
                    <div key={feature.title} className="rounded-2xl border border-[#f1f5f9] bg-[#fcfcfd] p-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff1f2] text-[#b91c1c]">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <p className="text-sm font-semibold text-[#111827] md:text-[0.95rem]">{feature.title}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
                        {showFullVersion ? feature.desc : feature.compactDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
