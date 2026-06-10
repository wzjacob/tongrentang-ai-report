"use client";

import { BadgeDollarSign, Coins, Database, HardDrive, Server, ShieldCheck, Wrench } from "lucide-react";

const budgetData = {
  title: "推荐方案经费：约 50.8 万（探索期）",
  subtitle: "采用“Token采购 + 中台能力建设”方式先跑通场景，私有化155万作为备选路径",
  costColumns: [
    {
      title: "中台授权与技术支持",
      amount: "约 50 万",
      desc: "统一中台能力底座与联调上线保障",
      items: [
        "建设统一编排流，支撑问药、问数、问策三场景接入",
        "提供权限、日志、审计、监控与稳定性保障",
      ],
      tone: "red" as const,
    },
    {
      title: "Token池费用",
      amount: "约 0.8 万/年",
      desc: "满足150人使用规模（含MCP调用）",
      items: ["支持DeepSeek/Kimi/GLM/MiniMax/Claude/GPT等模型", "按需消耗，探索期投入更轻"],
      tone: "blue" as const,
    },
    {
      title: "应用服务器",
      amount: "0 元",
      desc: "申请集团现有资源",
      items: [
        "不新增服务器采购费用",
        "作为通用计算与接口承载资源",
      ],
      tone: "emerald" as const,
    },
  ],
} as const;

const toneStyles = {
  red: {
    card: "border-[#fecaca] bg-[#fff1f2]",
    amount: "text-[#b91c1c]",
    badge: "border-[#fecaca] bg-white text-[#b91c1c]",
    iconWrap: "bg-[#fee2e2] text-[#b91c1c]",
  },
  emerald: {
    card: "border-emerald-200 bg-emerald-50",
    amount: "text-emerald-700",
    badge: "border-emerald-200 bg-white text-emerald-700",
    iconWrap: "bg-emerald-100 text-emerald-700",
  },
  blue: {
    card: "border-sky-200 bg-sky-50",
    amount: "text-sky-700",
    badge: "border-sky-200 bg-white text-sky-700",
    iconWrap: "bg-sky-100 text-sky-700",
  },
} as const;

const columnIcons = [HardDrive, Database, Wrench] as const;

export default function OverallBudgetAndCostPlanSlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="report-chip">
            财务决策视角 · 总结页
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{budgetData.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{budgetData.subtitle}</p>
        </div>

        <div className="mt-5 text-center">
          <p className="text-4xl font-black tracking-tight text-[#b91c1c] md:text-6xl lg:text-7xl">50.8 万</p>
          <p className="mt-1 text-sm font-medium text-slate-600 md:text-base">中台能力建设 · Token采购 · 服务器0元</p>
        </div>

        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <BadgeDollarSign className="h-4.5 w-4.5 text-[#b91c1c]" />
          <span className="text-sm font-semibold text-slate-700">预算总控：50.8 万（50万中台+技术支持 + 0.8万Token/年 + 应用服务器0元）</span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {budgetData.costColumns.map((column, idx) => {
            const style = toneStyles[column.tone];
            const Icon = columnIcons[idx] ?? Server;
            return (
              <section key={column.title} className={`report-panel p-5 md:p-6 ${style.card}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827]">{column.title}</h3>
                    <p className={`mt-2 text-2xl font-bold ${style.amount}`}>
                      {column.amount}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{column.desc}</p>
                  </div>
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${style.iconWrap}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                {idx === 2 ? (
                  <div className="mt-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    集团现有资源可直接承载
                  </div>
                ) : null}

                <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />

                <ul className="mt-3 space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item} className="rounded-xl border border-white/80 bg-white/70 px-3 py-2 text-sm leading-relaxed text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style.badge}`}>
                  {idx === 0 ? "中台+技术支持" : idx === 1 ? "Token采购" : "应用服务器"}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="report-panel px-4 py-3 text-sm text-slate-700">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Coins className="h-4 w-4 text-[#b91c1c]" />
              财务可控
            </p>
            <p className="mt-1">一次性投入边界清晰，后续运维成本结构透明。</p>
          </div>
          <div className="report-panel px-4 py-3 text-sm text-slate-700">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              自主可控
            </p>
            <p className="mt-1">核心能力掌握在集团内部，飞书等平台用于办公场景补位。</p>
          </div>
          <div className="report-panel px-4 py-3 text-sm text-slate-700">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Server className="h-4 w-4 text-sky-600" />
              持续扩展
            </p>
            <p className="mt-1">达标后再评估是否进入私有化155万重投入路径。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
