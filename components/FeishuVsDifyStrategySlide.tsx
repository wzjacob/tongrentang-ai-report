"use client";

import { ArrowRightLeft, Cpu, HelpCircle, ShieldCheck } from "lucide-react";

const compareRows = [
  {
    dim: "定位",
    feishu: "办公协同中的 AI 补充能力",
    private: "企业核心业务 AI 应用底座（主路径）",
  },
  {
    dim: "上线速度",
    feishu: "快，适合轻量试用",
    private: "中，需完成私有化部署与联调",
  },
  {
    dim: "场景适配",
    feishu: "标准化场景更友好",
    private: "问药/问数/问策可深度定制",
  },
  {
    dim: "编排能力",
    feishu: "流程灵活性受平台边界约束",
    private: "基于 Dify/ThinkingAI 可高度编排",
  },
  {
    dim: "调优能力",
    feishu: "调优空间相对有限",
    private: "可持续做 Prompt/知识库/流程调优",
  },
  {
    dim: "数据可控",
    feishu: "依赖平台治理边界",
    private: "企业侧更可控，便于沉淀自有资产",
  },
] as const;

const clarificationLeft = {
  question: "疑问一：能不能直接用飞书做 AI 中台？",
  conclusion: "初步判断问药可以使用，问数、问策能力会受限。",
  points: [
    "上手快：飞书里有 Aily、扣子，简单 AI 应用很快就能搭起来，适合前期试用、日常协同办公。",
    "有模板、也有边界：流程编排、接数据都有标准做法，开发门槛不高；但要深度调教模型，飞书能力有限。",
    "构建模式较固定：只能用 Aily 或 Coze 搭建，且没有迭代优化机制，只能通过换文件、换模型等传统方式进行优化。",
  ],
} as const;

const clarificationRight = {
  question: "疑问二：能否使用飞书的 Token 算力池？",
  conclusion: "不可以。自建架构与飞书算力严格物理隔离。",
  points: [
    "平台定位界定：飞书为“应用层与模型调度平台”，不售卖、不中转底层大模型 Token 业务。",
    "调度而非供给：飞书“智能伙伴”仅提供外部模型（如豆包、DeepSeek）的 API 接入与管理通道，并非算力分发商。",
    "自建算力规则：若评估后选择脱离飞书完全自建私有化 AI 架构，将绝对无法调用或享有飞书体系内的任何 Token 额度。",
  ],
} as const;

export default function FeishuVsDifyStrategySlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="report-chip">路径决策页 · 飞书 VS 私有化中台</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">
            企业核心 AI 应用建议私有化自建，飞书用于办公协同补位
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">
            核心结论：同仁堂自有 Agent 体系建议基于 Dify/ThinkingAI 建设，以“可定制、可编排、可调优”支撑长期落地。
          </p>
        </div>

        <section className="report-conclusion mt-5">
          <p className="font-semibold text-slate-800">关键判断</p>
          <p className="mt-1 text-sm text-slate-700">
            知识库不是建出来就好用，而是用出来才好用。先跑业务、回收问题、再持续调优，才能形成同仁堂可复用的 Agent 能力。
          </p>
        </section>

        <section className="report-panel mt-4 p-4 md:p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ArrowRightLeft className="h-4.5 w-4.5 text-[#b91c1c]" />
            路径深度对比（飞书 / 私有化中台）
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-[1.1fr_1.8fr_1.8fr] bg-slate-100 text-xs font-semibold text-slate-700">
              <div className="px-3 py-2">维度</div>
              <div className="border-l border-slate-200 px-3 py-2">飞书 AI</div>
              <div className="border-l border-slate-200 px-3 py-2">Dify/ThinkingAI 私有化中台</div>
            </div>
            {compareRows.map((row, idx) => (
              <div key={row.dim} className={`grid grid-cols-[1.1fr_1.8fr_1.8fr] text-sm ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}>
                <div className="px-3 py-2 font-medium text-slate-700">{row.dim}</div>
                <div className="border-l border-slate-200 px-3 py-2 text-slate-600">{row.feishu}</div>
                <div className="border-l border-slate-200 px-3 py-2 text-slate-700">{row.private}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section className="report-panel p-4 md:p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
                <HelpCircle className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-base font-semibold text-[#111827]">{clarificationLeft.question}</h3>
            </div>
            <p className="mt-3 text-base font-bold leading-snug text-[#CC0000] md:text-lg">{clarificationLeft.conclusion}</p>
            <ul className="mt-3 space-y-2.5">
              {clarificationLeft.points.map((item) => (
                <li key={item} className="text-sm leading-6 text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="report-panel p-4 md:p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <Cpu className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-base font-semibold text-[#111827]">{clarificationRight.question}</h3>
            </div>
            <p className="mt-3 text-base font-bold leading-snug text-[#CC0000] md:text-lg">{clarificationRight.conclusion}</p>
            <ul className="mt-3 space-y-2.5">
              {clarificationRight.points.map((item) => (
                <li key={item} className="text-sm leading-6 text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="report-conclusion mt-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4.5 w-4.5 text-[#b91c1c]" />
            <p className="font-semibold text-slate-800">结论建议</p>
          </div>
          <p className="mt-1 text-sm text-slate-700">
            核心业务 Agent 要掌握在企业内部：私有化中台承载主业务能力，飞书用于办公通讯场景补位，形成“主干自建 + 协同补充”的双层结构。
          </p>
        </section>
      </div>
    </div>
  );
}

