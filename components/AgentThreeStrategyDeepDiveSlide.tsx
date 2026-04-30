"use client";

import { ArrowRight, AudioLines, BarChart3, Cpu, DatabaseZap, FileText, GitBranch, Radar, Route, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";

const strategyDeepDive = {
  title: "智能体三：问策",
  subtitle: "基于多智能体协同，打通前线炮火与总部决策的营销智囊",
  leftPanel: {
    title: "数据来源",
    items: [
      { name: "一线业务反馈数据", desc: "门店导购脱敏录音转文本、内培系统考核薄弱点", color: "emerald" as const },
      { name: "经营端动销数据", desc: "产品销量、区域分布特征、各渠道销售表现", color: "blue" as const },
      { name: "外部竞品与行业数据", desc: "自动化采集的行业公开研报、竞品动态与电商平台用户评价", color: "slate" as const },
    ],
  },
  rightPanel: {
    tech: {
      title: "实现路径：多智能体编排",
      desc: "编排多个专业 Agent 流水线作业：洞察 Agent 提取拒买原因，竞品 Agent 对比优劣，策略 Agent 生成建议。",
      compactDesc: "多 Agent 流水线协同：洞察 -> 竞品 -> 策略，闭环生成营销建议。",
      pipeline: ["洞察 Agent", "竞品 Agent", "策略 Agent"],
    },
    features: [
      { title: "顾客抗性深度洞察", desc: "从千万条真实门店录音中，语义聚类出顾客最常见的疑虑与拒绝购买原因", compactDesc: "语义聚类挖掘顾客疑虑与拒买原因。" },
      { title: "竞品动态自动监测", desc: "输入竞品名称，自动爬取公开舆情并生成本品与竞品的优劣势对比报告", compactDesc: "自动监测竞品舆情并生成对比报告。" },
      { title: "区域策略自动化生成", desc: "每月融合上述数据，自动输出高保真《重点产品区域营销策略建议书》", compactDesc: "自动生成区域营销策略建议书。" },
    ],
  },
  delivery: {
    title: "中台关联逻辑与场景落地",
    links: [
      "编排中台 -> 数据填入层：融合门店语音转写、竞品舆情、电商评价与动销数据形成策略语料。",
      "编排中台 -> 模型算力层：多 Agent 任务并行调度，洞察/竞品/策略链路按需调用算力。",
      "编排中台 -> 管控层：策略发布前进行敏感词、合规风险与品牌口径校验。",
      "编排中台 -> 数据底座层：沉淀区域画像、产品标签与策略模板，支持月度复用迭代。",
    ],
    scenes: [
      "新品上市战役：自动生成区域差异化话术与首月动销策略包。",
      "竞品价格战响应：竞品动作发生后 24 小时内形成反制建议。",
      "门店督导协同：识别抗性高发区域并推送针对性培训脚本。",
      "大促复盘优化：活动后自动归因“转化差异点”并输出下一轮优化方案。",
    ],
  },
} as const;

const styleMap = {
  emerald: {
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    title: "text-emerald-700",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
  },
  blue: {
    border: "border-blue-200",
    dot: "bg-blue-500",
    title: "text-blue-700",
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
  },
  slate: {
    border: "border-slate-200",
    dot: "bg-slate-500",
    title: "text-slate-700",
    iconBg: "bg-slate-100",
    iconText: "text-slate-600",
  },
} as const;

const leftIcons = [AudioLines, BarChart3, ShoppingBag] as const;
const featureIcons = [Radar, GitBranch, FileText] as const;
const deliveryLinkIcons = [DatabaseZap, Cpu, ShieldCheck, FileText] as const;
const deliverySceneIcons = [Sparkles, GitBranch, AudioLines, Radar] as const;

export default function AgentThreeStrategyDeepDiveSlide({ showFullVersion = false }: { showFullVersion?: boolean }) {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#7c3aed]">
            智能体 03 · 问策深度剖析
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{strategyDeepDive.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{strategyDeepDive.subtitle}</p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
            <h3 className="text-lg font-semibold text-[#111827]">{strategyDeepDive.leftPanel.title}</h3>
            <div className="mt-4 space-y-3">
              {strategyDeepDive.leftPanel.items.map((item, idx) => {
                const style = styleMap[item.color];
                const Icon = leftIcons[idx] ?? AudioLines;
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
            <article className="rounded-3xl bg-slate-900 p-5 text-white shadow-[0_14px_34px_rgba(124,58,237,0.25)] md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">技术中枢</p>
              <h3 className="mt-2 text-lg font-semibold md:text-xl">{strategyDeepDive.rightPanel.tech.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {showFullVersion ? strategyDeepDive.rightPanel.tech.desc : strategyDeepDive.rightPanel.tech.compactDesc}
              </p>

              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {strategyDeepDive.rightPanel.tech.pipeline.map((step, idx) => (
                  <div key={step} className="rounded-xl border border-violet-300/30 bg-white/5 px-3 py-2 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-200/90">Step {idx + 1}</p>
                    <p className="mt-1 text-sm font-medium text-white">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-center text-violet-200/90">
                <Route className="h-4 w-4" />
                <Sparkles className="mx-1 h-3.5 w-3.5" />
                <span className="text-xs">流水线协同执行</span>
              </div>
            </article>

            <article className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6">
              <h3 className="text-lg font-semibold text-[#111827]">核心能力</h3>
              <div className="mt-3 space-y-2.5">
                {strategyDeepDive.rightPanel.features.map((feature, idx) => {
                  const Icon = featureIcons[idx] ?? Radar;
                  return (
                    <div key={feature.title} className="rounded-2xl border border-violet-100 bg-violet-50/40 p-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#7c3aed]">
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
          <h3 className="text-lg font-semibold text-[#111827]">{strategyDeepDive.delivery.title}</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c3aed]">策略脑图</p>
              <div className="relative mt-2 min-h-[260px] rounded-xl border border-violet-100 bg-violet-50/40 p-3">
                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  <line x1="50" y1="50" x2="16" y2="20" stroke="#c4b5fd" strokeWidth="1.2" />
                  <line x1="50" y1="50" x2="84" y2="20" stroke="#c4b5fd" strokeWidth="1.2" />
                  <line x1="50" y1="50" x2="16" y2="80" stroke="#c4b5fd" strokeWidth="1.2" />
                  <line x1="50" y1="50" x2="84" y2="80" stroke="#c4b5fd" strokeWidth="1.2" />
                </svg>
                <div className="absolute left-1/2 top-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-violet-300 bg-white px-2 py-2 text-center shadow-sm">
                  <p className="text-[11px] font-semibold text-violet-700">编排中台</p>
                </div>
                {strategyDeepDive.delivery.links.map((item, idx) => {
                  const [flow, desc] = item.split("：");
                  const [, to] = flow.split("->").map((s) => s.trim());
                  const Icon = deliveryLinkIcons[idx] ?? Sparkles;
                  const posClass = [
                    "left-[3%] top-[5%]",
                    "right-[3%] top-[5%]",
                    "left-[3%] bottom-[5%]",
                    "right-[3%] bottom-[5%]",
                  ][idx];
                  return (
                    <article key={item} className={`absolute w-[40%] rounded-lg border border-violet-200 bg-white/95 p-2 ${posClass}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-violet-50 text-[#7c3aed]">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-[11px] font-semibold text-violet-700">{to}</p>
                      </div>
                      <p className="mt-1 text-[10px] leading-relaxed text-[#4b5563]">{desc}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7c3aed]">业务场景应用</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {strategyDeepDive.delivery.scenes.map((item, idx) => {
                  const [title, desc] = item.split("：");
                  const Icon = deliverySceneIcons[idx] ?? Sparkles;
                  return (
                    <article key={item} className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white text-[#7c3aed]">
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
