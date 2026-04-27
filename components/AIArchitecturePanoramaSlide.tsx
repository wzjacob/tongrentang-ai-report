"use client";

import { Bot, Database, ShieldCheck, Sparkles, SquareStack, Workflow } from "lucide-react";

const archData = {
  title: "AI 应用编排与模型底座全景架构",
  subtitle: "以开源 Dify 为核心中枢，串联交互入口、智能体流程、模型算力与数据底座",
  portalLayer: ["集团 OA", "企业微信", "门店智能终端"],
  coreHub: {
    title: "Dify 应用编排与大模型管理平台",
    badge: "核心主干 · 预算内替代高昂商业软件",
    streams: [
      { name: "知识检索增强流 (GraphRAG)", target: "赋能问药" },
      { name: "数据库交互流 (Text2SQL)", target: "赋能问数" },
      { name: "智能体工作流 (Multi-Agent)", target: "赋能问策" },
    ],
  },
  controlLayer: ["统一 API 网关", "RBAC 角色权限控制", "敏感数据护栏拦截"],
  modelLayer: ["本地千问 72B (主推理)", "千问 32B (微调)", "向量/重排小模型"],
  dataLayer: ["Milvus 向量库", "图数据库", "主数据安全视图"],
} as const;

function LayerCard({
  title,
  tone,
  children,
  icon,
}: {
  title: string;
  tone: "portal" | "core" | "control" | "model" | "data";
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  const toneStyle = {
    portal: "border-sky-200 bg-white",
    core: "border-[#b91c1c] bg-[#b91c1c] text-white shadow-[0_18px_34px_rgba(185,28,28,0.35)]",
    control: "border-indigo-200 bg-indigo-50",
    model: "border-slate-300 bg-slate-100",
    data: "border-emerald-200 bg-emerald-50",
  }[tone];

  return (
    <section className={`rounded-3xl border p-4 md:p-5 ${toneStyle}`}>
      <div className="flex items-center gap-2.5">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
            tone === "core"
              ? "bg-white/15 text-white"
              : tone === "portal"
                ? "bg-sky-50 text-sky-600"
                : tone === "control"
                  ? "bg-indigo-100 text-indigo-600"
                  : tone === "model"
                    ? "bg-slate-200 text-slate-700"
                    : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {icon}
        </span>
        <h3 className={`text-base font-semibold md:text-lg ${tone === "core" ? "text-white" : "text-[#111827]"}`}>{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function AIArchitecturePanoramaSlide() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#fcfcfd] px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#b91c1c]">
            模块二 · AI 实现路径与基础架构
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#111827] md:text-3xl">{archData.title}</h2>
          <p className="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-[#64748b] md:text-base">{archData.subtitle}</p>
        </div>

        <div className="mx-auto mt-7 max-w-5xl space-y-3">
          <LayerCard title="交互门户层" tone="portal" icon={<Workflow className="h-4.5 w-4.5" />}>
            <div className="grid gap-2 md:grid-cols-3">
              {archData.portalLayer.map((item) => (
                <div key={item} className="rounded-xl border border-sky-200 bg-sky-50/40 px-3 py-2 text-center text-sm font-semibold text-sky-700">
                  {item}
                </div>
              ))}
            </div>
          </LayerCard>

          <div className="mx-auto h-4 w-[2px] rounded-full bg-gradient-to-b from-sky-300 to-[#b91c1c]" />

          <LayerCard title={archData.coreHub.title} tone="core" icon={<Sparkles className="h-4.5 w-4.5" />}>
            <div className="rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-center text-xs font-semibold tracking-[0.08em] text-red-50">
              {archData.coreHub.badge}
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {archData.coreHub.streams.map((stream) => (
                <div key={stream.name} className="rounded-xl border border-white/25 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{stream.name}</p>
                  <div className="my-2 h-px w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
                  <p className="text-xs text-red-100">{stream.target}</p>
                </div>
              ))}
            </div>
          </LayerCard>

          <div className="mx-auto h-4 w-[2px] rounded-full bg-gradient-to-b from-[#b91c1c] to-indigo-400" />

          <LayerCard title="统一管控层" tone="control" icon={<ShieldCheck className="h-4.5 w-4.5" />}>
            <div className="grid gap-2 md:grid-cols-3">
              {archData.controlLayer.map((item) => (
                <div key={item} className="rounded-xl border border-indigo-200 bg-white px-3 py-2 text-center text-sm font-semibold text-indigo-700">
                  {item}
                </div>
              ))}
            </div>
          </LayerCard>

          <div className="mx-auto h-4 w-[2px] rounded-full bg-gradient-to-b from-indigo-300 to-slate-400" />

          <LayerCard title="模型算力层" tone="model" icon={<Bot className="h-4.5 w-4.5" />}>
            <div className="grid gap-2 md:grid-cols-3">
              {archData.modelLayer.map((item) => (
                <div key={item} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </LayerCard>

          <div className="mx-auto h-4 w-[2px] rounded-full bg-gradient-to-b from-slate-400 to-emerald-400" />

          <LayerCard title="数据底座层" tone="data" icon={<Database className="h-4.5 w-4.5" />}>
            <div className="grid gap-2 md:grid-cols-3">
              {archData.dataLayer.map((item) => (
                <div key={item} className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-center text-sm font-semibold text-emerald-700">
                  {item}
                </div>
              ))}
            </div>
          </LayerCard>
        </div>

        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
          <SquareStack className="h-3.5 w-3.5" />
          <span>Layered Architecture（自上而下可落地实施）</span>
        </div>
      </div>
    </div>
  );
}
