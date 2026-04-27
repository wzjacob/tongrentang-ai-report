"use client";

import { BadgeDollarSign, Coins, Database, HardDrive, Server, ShieldCheck, Wrench } from "lucide-react";

const budgetData = {
  title: "整体投资预算：控制在 100 万元以内",
  subtitle: "秉持‘重资产、抱开源、买服务’的极简建设策略，打造高性价比私有大脑",
  costColumns: [
    {
      title: "硬件资产保底 (大头)",
      amount: "约 75 万",
      desc: "转化为集团固定资产",
      items: [
        "1台 8卡高性价比推理服务器 (满足 72B 量化部署与高并发)",
        "2-3台 高主频通用服务器 (部署 Dify 应用及数据库)",
      ],
      tone: "red" as const,
    },
    {
      title: "软件授权费用 (红利)",
      amount: "0 元",
      desc: "拒绝商业授权绑架",
      items: ["全面采用 Dify + Qwen + Milvus 顶级开源生态", "省下百万级商业软件订阅费"],
      tone: "emerald" as const,
    },
    {
      title: "专业实施服务 (智力)",
      amount: "约 25 万",
      desc: "购买专业团队技术落地",
      items: ["基础架构本地化量化部署与网络打通", "三大业务场景大模型微调与 Dify 工作流搭建实施"],
      tone: "blue" as const,
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
          <p className="inline-flex items-center rounded-full border border-[#fecaca] bg-[#fff1f2] px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#b91c1c]">
            财务决策视角 · 总结页
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{budgetData.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{budgetData.subtitle}</p>
        </div>

        <div className="mt-5 text-center">
          <p className="text-4xl font-black tracking-tight text-[#b91c1c] md:text-6xl lg:text-7xl">100 万以内</p>
          <p className="mt-1 text-sm font-medium text-slate-600 md:text-base">重资产 · 抱开源 · 买服务</p>
        </div>

        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-[#fecaca] bg-white px-4 py-2 shadow-sm">
          <BadgeDollarSign className="h-4.5 w-4.5 text-[#b91c1c]" />
          <span className="text-sm font-semibold text-[#7f1d1d]">预算总控：100 万以内（75 万硬件 + 25 万服务 + 0 元授权）</span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {budgetData.costColumns.map((column, idx) => {
            const style = toneStyles[column.tone];
            const Icon = columnIcons[idx] ?? Server;
            return (
              <section key={column.title} className={`rounded-3xl border p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-6 ${style.card}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827]">{column.title}</h3>
                    <p
                      className={`mt-2 font-bold ${style.amount} ${
                        idx === 1 ? "text-5xl leading-none md:text-6xl lg:text-7xl drop-shadow-[0_8px_24px_rgba(16,185,129,0.35)]" : "text-2xl"
                      }`}
                    >
                      {column.amount}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{column.desc}</p>
                  </div>
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${style.iconWrap}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                {idx === 1 ? (
                  <div className="mt-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    帮集团省下百万级商业授权
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
                  {idx === 0 ? "重资产" : idx === 1 ? "抱开源" : "买服务"}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-slate-700">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Coins className="h-4 w-4 text-[#b91c1c]" />
              财务可控
            </p>
            <p className="mt-1">一次性投入边界清晰，后续运维成本结构透明。</p>
          </div>
          <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-slate-700">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              自主可控
            </p>
            <p className="mt-1">关键能力掌握在集团内部，避免外部平台锁定。</p>
          </div>
          <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-slate-700">
            <p className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Server className="h-4 w-4 text-sky-600" />
              持续扩展
            </p>
            <p className="mt-1">按业务成熟度扩容，资金投入与业务价值同步增长。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
