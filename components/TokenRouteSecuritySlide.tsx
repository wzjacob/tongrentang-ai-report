"use client";

import { CheckCircle2, FileLock2, ShieldCheck, ShieldEllipsis, Waypoints } from "lucide-react";

const protectionLayers = [
  {
    title: "应用层安全",
    short: "架构隔离：数据底座在本地",
    points: [
      "企业规章、文档和业务数据存放在本地向量库，外部模型无法直连核心数据库。",
      "员工提问时，先由本地系统检索相关片段，再把“当次所需的少量材料”发送给模型 API。",
      "模型只看到局部上下文，无法主动浏览或获取企业完整数据资产。",
    ],
  },
  {
    title: "API 与供应链安全",
    short: "契约保障：企业级 API 合同约束",
    points: [
      "明确区分 C 端网页版与 B 端企业 API：本项目采购的是企业级商业接口。",
      "在合同中约定数据不留存、不训练（Zero Data Retention）并有法律责任约束。",
      "仅对接官方或合规云厂商，避免资质不明的第三方 Token 中转站。",
    ],
  },
  {
    title: "数据层安全（联邦学习）",
    short: "技术过滤：中台先安检再放行",
    points: [
      "调用外部 API 前，中台先做本地脱敏处理（姓名、证件号、财务敏感字段替换）。",
      "配置本地敏感词与机密规则，触发高风险问题时直接拦截，不发出外部调用。",
      "输出返回后继续做合规检查，确保内容可用、可控、可追溯。",
    ],
  },
] as const;

const gateSteps = [
  "架构隔离：核心数据库不对模型直连开放，本地检索后再调用",
  "契约保障：企业 API 合同明确数据不留存、不训练",
  "技术过滤：中台脱敏与敏感词拦截，先安检后放行",
  "网络加密：可选专线/VPC 私网直连，降低传输风险",
  "全程审计：问答、Token、调用来源全留痕，可 100% 溯源",
] as const;

const managerConclusions = [
  "我们用的是外部模型的“脑力”，但企业数据和记忆始终锁在自己的“保险柜”里。",
  "每次只传当次需要的脱敏片段，并通过企业 API 契约约束“阅后即焚、不做训练”。",
  "中台安检 + 日志审计双保险，既保证数据安全边界，也保证低成本持续可用。",
] as const;

export default function TokenRouteSecuritySlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="report-chip">安全专题页 · Token 采购路线</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">
            买 Token 路线下，企业敏感数据如何做到“可用、可控、可审计”
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">
            结论先行：模型只用“外脑”，数据仍在“内仓”。通过本地检索、契约约束、脱敏安检和审计留痕，保障企业敏感数据安全。
          </p>
        </div>

        <section className="report-conclusion mt-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4.5 w-4.5 text-[#b91c1c]" />
            <p className="font-semibold text-slate-800">一句话理解三层防护</p>
          </div>
          <p className="mt-1 text-sm text-slate-700">
            应用层“锁住数据底座”、API 层“锁住合同边界”、中台层“锁住出境内容”，再叠加网络与审计，形成闭环。
          </p>
        </section>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {protectionLayers.map((layer, idx) => (
            <section key={layer.title} className="report-panel p-4 md:p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-semibold text-[#111827]">{layer.title}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{layer.short}</p>
                </div>
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                    idx === 0 ? "bg-rose-50 text-rose-700" : idx === 1 ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {idx === 0 ? <ShieldEllipsis className="h-4.5 w-4.5" /> : idx === 1 ? <FileLock2 className="h-4.5 w-4.5" /> : <Waypoints className="h-4.5 w-4.5" />}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {layer.points.map((point) => (
                  <li key={point} className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-sm leading-relaxed text-slate-700">
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <section className="report-panel p-4 md:p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <CheckCircle2 className="h-4.5 w-4.5" />
              </span>
              <h3 className="text-base font-semibold text-[#111827]">Token 路线的 5 道安全闸门</h3>
            </div>
            <ul className="space-y-2.5">
              {gateSteps.map((step, idx) => (
                <li key={step} className="flex gap-2 text-sm text-slate-700">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-semibold text-slate-700">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="report-panel-soft p-4 md:p-5">
            <p className="text-sm font-semibold text-slate-800">合规资质与协议要点</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">供应商资质：SOC 2 Type 2、ISO 27001、ISO 42001、PCI-DSS。</li>
              <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">协议约束：明确客户业务数据不用于模型训练，支持 Zero Data Retention。</li>
              <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">传输与存储：关键链路采用 AES-256 加密能力，支持专线/VPC 对接。</li>
              <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">供应链风控：禁止使用资质不明的第三方 Token 中转。</li>
            </ul>
          </section>
        </div>

        <section className="report-conclusion mt-4">
          <p className="font-semibold text-slate-800">总结</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {managerConclusions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

