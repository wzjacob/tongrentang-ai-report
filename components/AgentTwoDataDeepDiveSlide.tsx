"use client";

import { AlertTriangle, ArrowRight, BarChart3, Cpu, Database, DatabaseZap, LineChart, Lock, SearchCode, ShieldCheck } from "lucide-react";

const dataDeepDive = {
  title: "智能体二：问数",
  subtitle: "基于业务主数据与语义转 SQL 技术，消除报表时差的对话式分析引擎",
  leftPanel: {
    title: "数据来源",
    items: [
      { name: "核心财务汇总库", desc: "领导驾驶舱后端数据，覆盖收入、成本、利润等核心指标", color: "blue" as const },
      { name: "集团主数据系统", desc: "30万+ 条清洗后的组织机构、客商、物料等基础维表", color: "slate" as const },
      {
        name: "接入规范",
        desc: "不直连生产库，构建【只读安全视图】，确保底层生产系统绝对安全",
        color: "rose" as const,
      },
    ],
  },
  rightPanel: {
    tech: {
      title: "实现路径：语义转 SQL 与领域微调",
      desc: "自然语言实时转化为 SQL 脚本，在安全沙箱内执行并动态渲染图表，告别固定维度 BI 报表。",
      compactDesc: "自然语言转 SQL，安全沙箱执行并即时图表化呈现。",
    },
    features: [
      { title: "自然语言即时查询", desc: "无需 IT 排期，语音输入“本月各战区毛利对比”即刻生成图表", compactDesc: "自然语言即问即查，即时出图。" },
      { title: "多维灵活钻取", desc: "支持按时间、组织、物料等维度，以对话追问形式层层下钻分析", compactDesc: "多维追问下钻，分析路径更灵活。" },
      { title: "异常指标智能预警", desc: "主动监测销售额环比下滑等异常波动，并推送归因分析摘要", compactDesc: "异常波动自动预警并给出归因摘要。" },
    ],
  },
  delivery: {
    title: "中台关联逻辑与场景落地",
    links: [
      "编排中台 -> 管控层：通过 RBAC 对指标、组织、敏感字段做分级可见与调用审计。",
      "编排中台 -> 数据底座层：基于主数据安全视图生成语义层，降低 SQL 幻觉与越权查询。",
      "编排中台 -> 模型算力层：语义转 SQL 任务调用本地模型，复杂分析自动切换高性能算力。",
      "编排中台 -> 数据底座层：统一纳管指标口径与维度映射，确保跨系统分析结果一致。",
    ],
    scenes: [
      "经营晨会快问：管理层即时查询“本周各战区毛利排名与环比变化”。",
      "财务差异归因：对异常成本科目自动下钻到组织/物料/时间维度。",
      "预算执行跟踪：按月输出预算偏差看板并提示高风险部门。",
      "供应协同预警：库存周转异常时联动采购与销售侧给出建议动作。",
    ],
  },
} as const;

const styleMap = {
  blue: {
    border: "border-sky-200",
    dot: "bg-sky-500",
    title: "text-sky-700",
    iconBg: "bg-sky-50",
    iconText: "text-sky-600",
  },
  slate: {
    border: "border-slate-200",
    dot: "bg-slate-500",
    title: "text-slate-700",
    iconBg: "bg-slate-100",
    iconText: "text-slate-600",
  },
  rose: {
    border: "border-rose-300",
    dot: "bg-rose-500",
    title: "text-rose-700",
    iconBg: "bg-rose-50",
    iconText: "text-rose-600",
  },
} as const;

const leftIcons = [Database, Lock, AlertTriangle] as const;
const featureIcons = [BarChart3, SearchCode, LineChart] as const;
const deliveryLinkIcons = [ShieldCheck, DatabaseZap, Cpu, BarChart3] as const;
const deliverySceneIcons = [BarChart3, SearchCode, LineChart, AlertTriangle] as const;

export default function AgentTwoDataDeepDiveSlide({ showFullVersion = false }: { showFullVersion?: boolean }) {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#0284c7]">
            智能体 02 · 问数深度剖析
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{dataDeepDive.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{dataDeepDive.subtitle}</p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
            <h3 className="text-lg font-semibold text-[#111827]">{dataDeepDive.leftPanel.title}</h3>
            <div className="mt-4 space-y-3">
              {dataDeepDive.leftPanel.items.map((item, idx) => {
                const style = styleMap[item.color];
                const Icon = leftIcons[idx] ?? Database;
                const isSecurity = item.color === "rose";
                return (
                  <article
                    key={item.name}
                    className={`rounded-2xl border p-4 ${style.border} ${isSecurity ? "bg-rose-50/60 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.08)]" : "bg-white"}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconBg} ${style.iconText}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                          <h4 className={`text-sm font-semibold ${style.title} md:text-base`}>{item.name}</h4>
                          {isSecurity ? (
                            <span className="rounded-full border border-rose-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                              只读安全视图
                            </span>
                          ) : null}
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
            <article className="rounded-3xl bg-slate-900 p-5 text-white shadow-[0_14px_34px_rgba(2,132,199,0.25)] md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">技术中枢</p>
              <h3 className="mt-2 text-lg font-semibold md:text-xl">{dataDeepDive.rightPanel.tech.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {showFullVersion ? dataDeepDive.rightPanel.tech.desc : dataDeepDive.rightPanel.tech.compactDesc}
              </p>
            </article>

            <article className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
              <h3 className="text-lg font-semibold text-[#111827]">核心能力</h3>
              <div className="mt-3 space-y-2.5">
                {dataDeepDive.rightPanel.features.map((feature, idx) => {
                  const Icon = featureIcons[idx] ?? BarChart3;
                  return (
                    <div key={feature.title} className="rounded-2xl border border-sky-100 bg-sky-50/40 p-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0284c7]">
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

        <section className="mt-5 rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
          <h3 className="text-lg font-semibold text-[#111827]">{dataDeepDive.delivery.title}</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0284c7]">底层逻辑映射</p>
              <div className="mt-2 space-y-2">
                {dataDeepDive.delivery.links.map((item, idx) => {
                  const [flow, desc] = item.split("：");
                  const [from, to] = flow.split("->").map((s) => s.trim());
                  const Icon = deliveryLinkIcons[idx] ?? Database;
                  return (
                    <article key={item} className="rounded-xl border border-sky-100 bg-sky-50/40 p-2.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#0284c7]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="rounded-md border border-sky-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-sky-700">{from}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-sky-500" />
                        <span className="rounded-md border border-sky-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-sky-700">{to}</span>
                      </div>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-[#4b5563]">{desc}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0284c7]">业务场景补充</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {dataDeepDive.delivery.scenes.map((item, idx) => {
                  const [title, desc] = item.split("：");
                  const Icon = deliverySceneIcons[idx] ?? BarChart3;
                  return (
                    <article key={item} className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white text-[#0284c7]">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-xs font-semibold text-[#111827]">{title}</p>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#4b5563]">{desc}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
