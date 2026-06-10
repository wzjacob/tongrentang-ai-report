"use client";

import Image from "next/image";
import IcebergFlatIllustration from "@/components/IcebergFlatIllustration";
import AIRoadmapSlide from "@/components/AIRoadmapSlide";
import ThankYouSlide from "@/components/ThankYouSlide";
import AIVisionSlide from "@/components/AIVisionSlide";
import AgentOneMedicineDeepDiveSlide from "@/components/AgentOneMedicineDeepDiveSlide";
import AgentTwoDataDeepDiveSlide from "@/components/AgentTwoDataDeepDiveSlide";
import AgentThreeStrategyDeepDiveSlide from "@/components/AgentThreeStrategyDeepDiveSlide";
import AIArchitecturePanoramaSlide from "@/components/AIArchitecturePanoramaSlide";
import LowCodeAgileAndCollabSlide from "@/components/LowCodeAgileAndCollabSlide";
import LocalComputeCenterPhysicalArchSlide from "@/components/LocalComputeCenterPhysicalArchSlide";
import OverallBudgetAndCostPlanSlide from "@/components/OverallBudgetAndCostPlanSlide";
import ImplementationRoadmapAndRoiSlide from "@/components/ImplementationRoadmapAndRoiSlide";
import DifyThreeScenariosDemoSlide from "@/components/DifyThreeScenariosDemoSlide";
import FeishuVsDifyStrategySlide from "@/components/FeishuVsDifyStrategySlide";
import TokenRouteSecuritySlide from "@/components/TokenRouteSecuritySlide";
import { REPORT_TITLE_FULL, REPORT_TITLE_MAIN } from "@/lib/reportMeta";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  AlarmClock,
  ArrowRight,
  BarChart3,
  Blocks,
  BrainCircuit,
  Brain,
  BookOpen,
  CalendarClock,
  CheckCircle,
  Cpu,
  Database,
  Info,
  FileText,
  FlaskConical,
  HardDrive,
  Layers,
  LayoutGrid,
  LayoutDashboard,
  Lightbulb,
  Microscope,
  Network,
  Waypoints,
  BookX,
  DatabaseZap,
  Server,
  ServerOff,
  ShieldCheck,
  Shield,
  Smartphone,
  Sparkles,
  Scale,
  Table2,
  Target,
  Unplug,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LayoutElement = {
  id: string;
  type: "shape" | "picture" | "connector";
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  text_lines?: string[] | null;
  image?: string | null;
};

type LayoutSlide = { slide_id: number; elements: LayoutElement[] };
type LayoutPayload = { meta: { slide_count: number }; slides: LayoutSlide[] };
type ScenarioStatus = "ongoing" | "planning" | "proposed" | "upcoming" | "core";
type ExecutiveScenarioItem = {
  id: number;
  title: string;
  timeline: string;
  category: string;
  desc: string;
  hardware: string;
  status: ScenarioStatus;
  owner: string;
  metric: string;
};
type ScenarioDraft = {
  background: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  risks: string;
  matrixNotes: string;
};
type SwotQuadrant = {
  key: "S" | "W" | "O" | "T";
  title: string;
  tone: string;
  points: string[];
};
type MatrixBlock = {
  title: string;
  points: string[];
};
const defaultLayoutData: LayoutPayload = {
  meta: { slide_count: 13 },
  slides: Array.from({ length: 13 }, (_, i) => ({ slide_id: i + 1, elements: [] })),
};

const aiBlueprint = {
  title: "两阶段建设蓝图（推广期3个月 / 深化期3个月）",
  layers: [
    {
      id: "saas",
      name: "SaaS (场景层)",
      type: "grid",
      items: ["问药", "问数", "问策", "推广期试用驾驶舱", "深化期协同工作台"],
    },
    {
      id: "paas",
      name: "PaaS (AI能力中台)",
      type: "nested",
      subLayers: [
        {
          name: "工具层",
          items: ["统一编排平台", "统一接口服务", "统一权限与审计", "统一日志与监控"],
        },
        {
          name: "模型层",
          items: ["问药场景模型", "问数场景模型", "问策场景模型", "向量检索与重排模型"],
        },
        {
          name: "原子能力层",
          items: ["文档解析/意图识别/答案溯源", "OCR/ASR/结构化抽取/知识标签化"],
        },
      ],
    },
    {
      id: "data",
      name: "数据层",
      type: "flex",
      items: ["经营系统数据", "非结构化知识库", "图谱与标签体系", "试用反馈数据", "制度与会议文档", "外部参考资料"],
    },
    {
      id: "idc",
      name: "IDC 本地部署",
      type: "flex",
      items: ["算力", "存储", "网络", "安全"],
    },
  ],
} as const;

const idcInfraMeta: Record<string, { icon: LucideIcon; subtitle: string }> = {
  算力: { icon: Cpu, subtitle: "训推一体 · 弹性调度" },
  存储: { icon: HardDrive, subtitle: "高性能 · 多协议" },
  网络: { icon: Network, subtitle: "低时延 · 高带宽" },
  安全: { icon: Shield, subtitle: "纵深防护 · 合规审计" },
};

const icebergSlideHeader = {
  title: "业务痛点与数智化挑战",
  subtitle: "剖析表象背后的核心隐患，明确 AI 破局方向",
} as const;

const painBridgeData = {
  header: {
    title: "当前模式难以汇总形成合力",
    highlight: "（将AI用准、用好、用实）",
    subtitle: "当前问题集中在知识触达、数据联动与智能分析三方面。",
  },
  symptoms: [
    { id: "s1", icon: "ServerOff", title: "中医药知识触达难", desc: "知识分散在系统与文档中，一线触达慢、复用弱。" },
    { id: "s2", icon: "Unplug", title: "二级板块数据难联动", desc: "各二级单位数据口径和接口不统一，协同分析成本高。" },
    { id: "s3", icon: "Network", title: "数据库缺智能分析能力", desc: "系统底表可查但难直接分析，管理层洞察产出效率低。" },
  ],
  rootCauses: [
    { id: "r1", icon: "LayoutDashboard", title: "知识资产未统一沉淀", desc: "缺统一知识治理机制，经验和资料难形成可复用资产。" },
    { id: "r2", icon: "BookX", title: "数据标准与接口未统一", desc: "跨系统主数据与字段映射不一致，联动能力不足。" },
    { id: "r3", icon: "Target", title: "分析引擎能力不足", desc: "数据库缺语义分析与智能问数能力，依赖人工取数解释。" },
  ],
} as const;

const distillationData = {
  core_process: {
    title: "两阶段推进闭环",
    base_model: "推广期（0-3个月）",
    target_model: "深化期（4-6个月）",
    action: "阶段评审 → 数据沉淀 → 问法复盘 → Agent持续优化",
    enhancements: ["问答日志采集与标签化", "高频问法收集与归类", "低分问法复盘与改写", "知识库增补发布与版本迭代"],
  },
  modules: [
    {
      id: "knowledge",
      title: "推广期：数据采集与沉淀机制上线",
      themeColor: "blue",
      items: ["统一日志、权限、审计与监控发布", "问答数据自动归档并建立标签体系", "业务反馈与真实问法统一沉淀入库"],
    },
    {
      id: "top_design",
      title: "推广期：双场景上线与问法采集",
      themeColor: "purple",
      items: ["问药/问数双场景上线试用", "核心部门与领导组织150人试用", "高频问法周度复盘与口径统一"],
    },
    {
      id: "reasoning",
      title: "深化期：复盘提效与Agent优化",
      themeColor: "red",
      items: ["低分问法专项改写与规则优化", "问策场景上线并接入复盘链路", "问药/问数/问策效果指标持续提升"],
    },
    {
      id: "generation",
      title: "深化期：联动扩展与机制固化",
      themeColor: "green",
      items: ["跨单位数据联动机制形成", "形成‘收集-复盘-优化-发布’闭环机制", "输出下一阶段扩展建议与治理清单"],
    },
  ],
} as const;

const computeComparisonData = {
  pageTitle: "Token采购 vs 私有化算力底座经费对比",
  planA: {
    title: "方案A：私有化自建算力底座",
    architecture: "本地化算力中心建设 + 企业中台授权与技术支持，适合长期重资产布局。",
    capex: 1550000,
    utilization: 68,
    opexComplexity: "高（需持续硬件运维与资源管理）",
    scenes: [
      "本地化算力底座：约105万",
      "应用服务器：申请集团公司现有资源（0元）",
      "中台软件授权+技术支持：50万",
      "合计：约155万",
      "数据可控性高，建设周期较长",
    ],
  },
  planB: {
    title: "方案B：API买Token（推荐）",
    architecture: "按需采购模型Token + 企业中台授权与技术支持，探索期投入更轻。",
    capex: 508000,
    utilization: 82,
    opexComplexity: "低（无需自建算力硬件运维）",
    scenes: [
      "Token池费用：约8000元/年（150人，含MCP调用）",
      "应用服务器：申请集团公司现有资源（0元）",
      "中台软件授权+技术支持：50万",
      "合计：约50.8万",
      "支持模型多，问答效果好",
    ],
  },
} as const;

const localComputePlanningData = {
  header: {
    title: "推广期（3个月）：统一底座与双场景上线",
    subtitle: "聚焦先上线、先试用、先验证，形成可复制的推广期执行模板",
  },
  investment: {
    total: "50.8 万",
    desc: "探索期轻投入先跑通，后续按评审结果决定是否转入私有化重投入",
    breakdown: [
      { name: "中台授权+技术支持", amount: "约 50万", share: "98.4%", detail: "统一编排、权限、日志、审计与联调上线保障", color: "bg-rose-600", theme: "blue" },
      { name: "Token池费用", amount: "约 0.8万/年", share: "1.6%", detail: "满足150人使用并覆盖MCP组件调用", color: "bg-amber-500", theme: "violet" },
      { name: "应用服务器", amount: "0元", share: "0%", detail: "申请集团公司现有资源，无新增采购成本", color: "bg-emerald-500", theme: "emerald" },
    ],
  },
  strategy: {
    title: "两阶段推进路径",
    current: {
      status: "推广期目标（0-3个月）",
      points: ["上线问药、问数双场景 POC", "完成10并发与150人试用验证", "沉淀统一验收口径与推广期复盘结论"],
    },
    future: {
      status: "深化期目标（4-6个月）",
      points: ["提升三场景准确率与可执行性", "形成跨单位数据联动机制", "形成下一阶段扩展方向与投入建议"],
    },
    architecture: {
      top: ["问药", "问数", "问策", "统一验收口径"],
      middle: "统一AI中台与编排流",
      bottom: [
        { name: "模型接入能力（多模型 API）", theme: "emerald" },
        { name: "统一中台能力（权限/日志/审计）", theme: "blue" },
      ],
    },
  },
} as const;

const buildMethodData = {
  header: {
    title: "两阶段推进：推广期打基础，深化期提质量",
    subtitle: "推广期聚焦上线与试用，深化期聚焦提效与扩展建议",
  },
  columns: {
    left: {
      title: "阶段执行与协同",
      items: [
        {
          id: "l1",
          icon: "Zap",
          title: "推广期：先上线后验证",
          desc: "三场景上线试用并快速迭代，先保障可用性与稳定性。",
        },
        {
          id: "l2",
          icon: "Users",
          title: "深化期：提效与联动",
          details: [
            { label: "集团侧", text: "提供统一中台、算力和治理规则" },
            { label: "业务侧", text: "各单位围绕场景持续优化并反馈效果" },
            { label: "评审侧", text: "按阶段评审产出扩展建议与投入计划" },
          ],
        },
      ],
    },
    center: {
      title: "试点治理中枢",
      nodes: [
        { id: "c1", type: "management", title: "集团信息化管理部", desc: "统筹两阶段推进与评审节奏" },
        { id: "core", type: "hub", title: "统一AI中台", desc: "问药/问数/问策统一能力底座" },
        { id: "c2", type: "external", title: "技术支持与开发团队", desc: "保障上线、联调与稳定运行" },
        { id: "c3", type: "business", title: "各单位业务部门", desc: "组织试用并沉淀场景优化需求" },
      ],
    },
    right: {
      title: "知识与数据深化",
      items: [
        { id: "r1", icon: "Waypoints", title: "统一接入口径", desc: "推广期统一问药、问数、问策接入口径，降低重复建设成本。" },
        { id: "r2", icon: "ShieldCheck", title: "全过程合规可审计", desc: "两阶段均按角色分级授权，保障过程可追踪、可审计。" },
        { id: "r3", icon: "DatabaseZap", title: "低分问题专项提升", desc: "深化期围绕低分问题增补知识与规则，持续提高答案质量。" },
      ],
    },
  },
} as const;

const localModelHybridData = {
  header: {
    title: "深化期（3个月）：三场景提效与跨单位协同",
    subtitle: "在推广期基础上持续优化准确率、联动能力与扩展准备",
  },
  models: [
    {
      id: "general",
      type: "问药场景能力",
      name: "问药",
      version: "推广期上线版",
      features: ["支撑药品问答与溯源", "聚焦高频问法准确率提升", "支持门店与内训持续优化"],
      theme: "blue",
      icon: "Brain",
    },
    {
      id: "professional",
      type: "问数场景能力",
      name: "问数",
      version: "推广期上线版",
      features: ["面向经营数据问答", "聚焦核心指标口径一致性提升", "支持跨单位看板联动验证"],
      theme: "emerald",
      icon: "Microscope",
    },
    {
      id: "vector",
      type: "问策场景能力",
      name: "问策",
      version: "深化期上线版",
      features: ["融合问药与问数结果", "输出可执行策略建议", "推广期完成模板沉淀，深化期正式上线"],
      theme: "amber",
      icon: "Network",
    },
    {
      id: "security",
      type: "知识库与治理",
      name: "知识中枢",
      version: "深化期增强",
      features: ["非结构化文档持续入库", "低分问答反哺知识优化", "支撑下一阶段扩展决策"],
      theme: "slate",
      icon: "ShieldCheck",
    },
  ],
  bottomSection: {
    mapping: {
      title: "模型与场景映射关系",
      items: [
        {
          model: "问药能力",
          version: "试用版",
          theme: "blue",
          modelId: "general",
          scenarios: ["药品问答", "门店试用", "领导抽检"],
          trigger: "成分、适应症、用法问答",
          output: "标准答复 + 溯源依据（知识条目）+ 或然症 + 使用小妙招",
          metric: "首答命中率、人工改写率、问答完成时长",
        },
        {
          model: "问数能力",
          version: "试用版",
          theme: "emerald",
          modelId: "professional",
          scenarios: ["经营问答", "指标校核", "看板联动"],
          trigger: "经营复盘、日报周报、口径核对",
          output: "口径一致的数据解释 + 可复用看板问法",
          metric: "口径争议次数、取数时长、复盘周期缩短比例",
        },
      ],
    },
    advantages: {
      title: "两阶段核心收益",
      items: [
        { title: "预算结构清晰", desc: "推荐方案约50.8万（中台+技术支持50万 + Token池0.8万/年），投入边界明确", icon: "Scale" },
        { title: "推广期快速见效", desc: "三场景上线并完成10并发、150人试用，形成首轮业务验证", icon: "Zap" },
        { title: "深化期稳步提升", desc: "围绕准确率和联动能力优化，形成下一阶段扩展依据", icon: "Layers" },
      ],
    },
  },
  footer: "两阶段部署策略：推广期完成上线与试用验证，深化期完成提效与扩展建议收口。",
} as const;

const marketingBadgeData = {
  header: {
    title: "营销工牌试点：先把一线真实数据跑起来",
    subtitle: "把门店录音、知识库和策略建议连成闭环，看得见转化提升",
    conclusion: "AI硬件 + AI知识库 = 销售知识全链路贯通",
  },
  architecture: {
    inputs: ["买药过程中自然产生的录音数据", "同仁堂大模型 / 同仁堂知识库", "决策预测与调整"],
    coreSystems: [
      {
        id: "crm",
        name: "CRM",
        desc: "买药过程管家，智能话术建议",
        linksTo: ["efficiency"],
      },
      {
        id: "rag",
        name: "RAG",
        desc: "基于当前痛点，沉淀药师应答与偏方知识",
        linksTo: ["authenticity", "knowledge"],
      },
      {
        id: "mcm",
        name: "MCM",
        desc: "多渠道触达，精准内容推荐",
        linksTo: ["conversion"],
      },
    ],
    foundations: ["金牌讲师产品知识 -> 销售知识沉淀 -> 配合营销改革", "老百姓诉求 -> 产品知识沉淀 -> 市场发现"],
  },
  metrics: [
    { id: "efficiency", value: "50%", title: "会员自分类效率提升", desc: "音频自动转文字，自动脱敏隐私信息并分类", color: "blue" },
    { id: "authenticity", value: "300%", title: "互动真实性提升", desc: "一线数据直入知识库进行AI处理", color: "indigo" },
    { id: "management", value: "70%", title: "管理效率提升", desc: "部署100+控制点，辅助管理层决策", color: "green" },
    { id: "compliance", value: "90%", title: "不良行为拦截监控", desc: "实时合规看板，及时提醒销售人员", color: "red" },
    { id: "hcp", value: "20%", title: "HCP反馈数量提升", desc: "数字化手段T-1追踪老百姓的HCP", color: "purple" },
    { id: "conversion", value: "80%", title: "推销完成率", desc: "针对性的内容转发策略，提升完成率", color: "orange" },
  ],
} as const;

function SlideWrap({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SlideCover() {
  return (
    <SlideWrap>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.14),transparent_40%)] px-4 py-10 text-center">
        <p className="text-5xl font-semibold leading-tight text-[#b91c1c] md:text-7xl">同仁堂集团</p>
        <h2 className="mx-auto mt-6 max-w-4xl px-2 text-sm font-medium leading-relaxed tracking-[0.12em] text-[#111827] md:text-base md:tracking-[0.18em]">
          {REPORT_TITLE_MAIN}
        </h2>
        <p className="mt-8 rounded-full border border-[#fecaca] bg-[#fff1f2] px-8 py-2 text-xl text-[#7f1d1d]">2026.4</p>
      </div>
    </SlideWrap>
  );
}

function SlideCatalog() {
  const agendas = [
    {
      index: "01",
      title: "现状盘点与系统边界",
      desc: "从组织、系统、数据三方面梳理当前基础，明确重复建设与信息孤岛。",
    },
    {
      index: "02",
      title: "专题深化与建设方案",
      desc: "围绕问药、问数、问策展开专题深化，并收口预算、ROI与实施节奏。",
    },
  ] as const;

  return (
    <SlideWrap>
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden py-2 md:py-4">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-red-50/50 to-blue-50/30 blur-3xl" />

        <div className="relative z-10 mb-10 md:mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#111827] md:text-5xl">目录</h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#9ca3af]">CONTENTS & AGENDA</p>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center gap-4 md:gap-6">
          {agendas.map((item) => (
            <div
              key={item.index}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#dc2626]/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] md:p-8"
            >
              <div className="absolute -bottom-8 -right-4 select-none text-[120px] font-black text-gray-50 transition-all duration-500 group-hover:-translate-x-4 group-hover:text-[#dc2626]/5">
                {item.index}
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-lg font-bold text-gray-400 transition-colors group-hover:bg-[#dc2626]/10 group-hover:text-[#dc2626] md:h-14 md:w-14 md:text-xl">
                    {item.index}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111827] transition-colors group-hover:text-[#dc2626] md:text-2xl">{item.title}</h3>
                    <p className="mt-1 text-sm text-[#6b7280]">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden h-10 w-10 -translate-x-4 items-center justify-center rounded-full bg-gray-50 text-[#dc2626] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:flex">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}

function SlideChapter({
  index,
  title,
  desc,
}: {
  index: string;
  title: string;
  desc: string;
}) {
  return (
    <SlideWrap>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.10),transparent_42%)] px-4 py-10 text-center">
        <p className="report-chip">
          Chapter {index}
        </p>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#111827] md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#64748b] md:text-base">{desc}</p>
      </div>
    </SlideWrap>
  );
}

const commercialDiagnosisSwotData = {
  header: {
    title: "案例剖析：商业公司中医药 AI 辅助诊疗系统",
    subtitle: "剥离外部包装，客观评估其业务真实价值与集团管控风险（SWOT 矩阵）",
    conclusion: "核心结论：业务场景探索价值明确，但底层技术外部依赖较高。建议提炼其辨证逻辑并纳入集团统一底座。",
  },
  swot: [
    {
      id: "strengths",
      letter: "S",
      type: "优势（内部/现有）",
      theme: "blue",
      items: [
        { title: "高颗粒度药方拆解", desc: "打破通稿式开方，具备较细颗粒度的方剂拆解与组合能力。" },
        { title: "拉平新手医师下限", desc: "能基于病案数据输出标准建议，有效托底年轻大夫与药店店员的专业能力。" },
        { title: "兼容多流派辨证", desc: "能根据患者体质，灵活输出伤寒派、温病派等不同中医流派的方剂逻辑。" },
      ],
    },
    {
      id: "weaknesses",
      letter: "W",
      type: "劣势（内部/现有）",
      theme: "orange",
      items: [
        { title: "核心资产外部依赖", desc: "系统由第三方主导，核心算法与关键逻辑外部依赖明显，内部掌控力不足。" },
        { title: "系统复用性极差", desc: "作为单体项目建设，其能力无法被集团其他单位（如股份公司）沉淀和复用。" },
        { title: "沦为应用孤岛", desc: "独立于集团主干网络之外，难以与智小谱等现有知识库打通协同。" },
      ],
    },
    {
      id: "opportunities",
      letter: "O",
      type: "机会（外部/未来）",
      theme: "emerald",
      items: [
        { title: "底层逻辑借鉴价值", desc: "其处理“同病异治/异病同治”的中医认知模式，可直接作为集团自研“问药”智能体的优秀业务蓝本。" },
        { title: "双端场景验证", desc: "其“医生端辅助 + 店员端科普”的双端落地模式，已在门店完成可行性验证，降低了集团后续推广的试错成本。" },
      ],
    },
    {
      id: "threats",
      letter: "T",
      type: "威胁（外部/未来）",
      theme: "rose",
      items: [
        { title: "核心医疗数据流失", desc: "名老中医的独家病案数据、处方习惯长期在第三方系统流转，存在核心资产外流风险。" },
        { title: "供应商技术绑架", desc: "后续任何微小的业务迭代或对接需求，都将面临第三方供应商高昂的定制开发费用与排期制约。" },
      ],
    },
  ],
} as const;

function SlideCommercialDiagnosisSwotBoard() {
  const themeMap: Record<
    "blue" | "orange" | "emerald" | "rose",
    {
      icon: LucideIcon;
      iconClass: string;
      tagClass: string;
      borderClass: string;
      shadowClass: string;
      watermarkClass: string;
    }
  > = {
    blue: {
      icon: CheckCircle,
      iconClass: "text-blue-600",
      tagClass: "bg-blue-50 text-blue-700 border-blue-200",
      borderClass: "border-blue-100 hover:border-blue-200",
      shadowClass: "hover:shadow-blue-900/5",
      watermarkClass: "text-blue-50",
    },
    orange: {
      icon: Scale,
      iconClass: "text-orange-500",
      tagClass: "bg-orange-50 text-orange-700 border-orange-200",
      borderClass: "border-orange-100 hover:border-orange-200",
      shadowClass: "hover:shadow-orange-900/5",
      watermarkClass: "text-orange-50",
    },
    emerald: {
      icon: Lightbulb,
      iconClass: "text-emerald-600",
      tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      borderClass: "border-emerald-100 hover:border-emerald-200",
      shadowClass: "hover:shadow-emerald-900/5",
      watermarkClass: "text-emerald-50",
    },
    rose: {
      icon: Shield,
      iconClass: "text-rose-700",
      tagClass: "bg-rose-50 text-rose-700 border-rose-200",
      borderClass: "border-rose-100 hover:border-rose-200",
      shadowClass: "hover:shadow-rose-900/5",
      watermarkClass: "text-rose-50",
    },
  };

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[#fcfcfd] p-2 md:p-4">
        <header className="rounded-3xl border border-[#e5e7eb] bg-white px-5 py-6 md:px-7 md:py-7">
          <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl">{commercialDiagnosisSwotData.header.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b] md:text-base">{commercialDiagnosisSwotData.header.subtitle}</p>
          <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 md:px-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-10 w-1 rounded-full bg-[#94a3b8]" />
              <p className="text-sm font-semibold leading-relaxed text-[#1f2937] md:text-base">{commercialDiagnosisSwotData.header.conclusion}</p>
            </div>
          </div>
        </header>

        <section className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {commercialDiagnosisSwotData.swot.map((quadrant, index) => {
            const theme = themeMap[quadrant.theme as "blue" | "orange" | "emerald" | "rose"];
            const Icon = theme.icon;
            return (
              <motion.article
                key={quadrant.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.12 }}
                className={[
                  "group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.04)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)]",
                  theme.borderClass,
                  theme.shadowClass,
                ].join(" ")}
              >
                <span
                  className={[
                    "pointer-events-none absolute -right-1 top-0 select-none text-[7.5rem] font-black leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 md:text-[9rem]",
                    theme.watermarkClass,
                  ].join(" ")}
                  aria-hidden
                >
                  {quadrant.letter}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4.5 w-4.5 ${theme.iconClass}`} />
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${theme.tagClass}`}>{quadrant.type}</span>
                  </div>
                  <ul className="mt-4 space-y-3.5">
                    {quadrant.items.map((item) => (
                      <li key={item.title}>
                        <p className="text-sm font-semibold text-[#0f172a] md:text-[0.96rem]">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#64748b]">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </section>
      </div>
    </SlideWrap>
  );
}

const financeIntelligenceSwotData = {
  header: {
    title: "案例剖析：财务智能大数据分析",
    subtitle: "围绕财务一体化推进，评估财务 AI 的落地价值与管控边界。",
    conclusion: "建议在财务一体化主线上内嵌数理计算 Agent，优先落地自动算数与智能审单。",
  },
  swot: [
    {
      id: "strengths",
      letter: "S",
      type: "优势（内部/现有）",
      theme: "blue",
      items: [
        { title: "规则基础较完整", desc: "核算与审批流程清晰，便于规则化落地。" },
        { title: "数据基础较扎实", desc: "ERP、BI、资金、税务等系统具备可用数据。" },
        { title: "成效可量化", desc: "可用效率、准确率、处理时长等指标衡量效果。" },
      ],
    },
    {
      id: "weaknesses",
      letter: "W",
      type: "短板（内部/现有）",
      theme: "orange",
      items: [
        { title: "数据口径不统一", desc: "跨系统口径差异影响统一建模与核对。" },
        { title: "自动化能力分散", desc: "局部自动化较多，集团级统一编排不足。" },
        { title: "复杂场景依赖人工", desc: "例外审单与复杂对账仍依赖资深人员。" },
      ],
    },
    {
      id: "opportunities",
      letter: "O",
      type: "机会（外部/未来）",
      theme: "emerald",
      items: [
        { title: "一体化项目可同步建设", desc: "可在主干改造中直接嵌入财务 Agent。" },
        { title: "CLINE Agent 易起步", desc: "自动算数与智能审单可先行，短期见效。" },
        { title: "可扩展跨部门协同", desc: "后续可联动采购、供应链、营销数据。" },
      ],
    },
    {
      id: "threats",
      letter: "T",
      type: "威胁（外部/未来）",
      theme: "rose",
      items: [
        { title: "合规与审计风险", desc: "权限与审计设计不足会触碰财务红线。" },
        { title: "供应商锁定风险", desc: "核心能力外置会影响成本与迭代节奏。" },
        { title: "模型误判风险", desc: "缺少规则兜底时可能造成核算偏差。" },
      ],
    },
  ],
  focusModules: [
    {
      title: "CLINE 自动算数 Agent",
      points: ["自动汇总多系统凭证与科目数据", "支持复杂规则计算与口径比对", "输出可追溯计算链路与差异说明"],
    },
    {
      title: "CLINE 智能审单 Agent",
      points: ["按制度规则自动审单与分级告警", "识别票据异常、金额异常与流程越权", "联动工单流转，实现闭环处置"],
    },
    {
      title: "统筹设计与中台接入",
      points: ["内嵌到财务一体化项目主干流程", "统一权限、日志、审计与版本治理", "沉淀集团复用模板并分单位推广"],
    },
  ],
} as const;

function SlideFinanceIntelligenceSwotBoard() {
  const themeMap: Record<
    "blue" | "orange" | "emerald" | "rose",
    {
      icon: LucideIcon;
      iconClass: string;
      tagClass: string;
      borderClass: string;
      shadowClass: string;
      watermarkClass: string;
    }
  > = {
    blue: {
      icon: BarChart3,
      iconClass: "text-blue-600",
      tagClass: "bg-blue-50 text-blue-700 border-blue-200",
      borderClass: "border-blue-100 hover:border-blue-200",
      shadowClass: "hover:shadow-blue-900/5",
      watermarkClass: "text-blue-50",
    },
    orange: {
      icon: Scale,
      iconClass: "text-orange-500",
      tagClass: "bg-orange-50 text-orange-700 border-orange-200",
      borderClass: "border-orange-100 hover:border-orange-200",
      shadowClass: "hover:shadow-orange-900/5",
      watermarkClass: "text-orange-50",
    },
    emerald: {
      icon: Sparkles,
      iconClass: "text-emerald-600",
      tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      borderClass: "border-emerald-100 hover:border-emerald-200",
      shadowClass: "hover:shadow-emerald-900/5",
      watermarkClass: "text-emerald-50",
    },
    rose: {
      icon: Shield,
      iconClass: "text-rose-700",
      tagClass: "bg-rose-50 text-rose-700 border-rose-200",
      borderClass: "border-rose-100 hover:border-rose-200",
      shadowClass: "hover:shadow-rose-900/5",
      watermarkClass: "text-rose-50",
    },
  };

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[#fcfcfd] p-2 md:p-4">
        <header className="rounded-3xl border border-[#e5e7eb] bg-white px-5 py-6 md:px-7 md:py-7">
          <h3 className="text-2xl font-bold tracking-tight text-[#0f172a] md:text-3xl">{financeIntelligenceSwotData.header.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b] md:text-base">{financeIntelligenceSwotData.header.subtitle}</p>
          <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 md:px-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-10 w-1 rounded-full bg-[#94a3b8]" />
              <p className="text-sm font-semibold leading-relaxed text-[#1f2937] md:text-base">{financeIntelligenceSwotData.header.conclusion}</p>
            </div>
          </div>
        </header>

        <section className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {financeIntelligenceSwotData.swot.map((quadrant, index) => {
            const theme = themeMap[quadrant.theme as "blue" | "orange" | "emerald" | "rose"];
            const Icon = theme.icon;
            return (
              <motion.article
                key={quadrant.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.12 }}
                className={[
                  "group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.04)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)]",
                  theme.borderClass,
                  theme.shadowClass,
                ].join(" ")}
              >
                <span
                  className={[
                    "pointer-events-none absolute -right-1 top-0 select-none text-[7.5rem] font-black leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 md:text-[9rem]",
                    theme.watermarkClass,
                  ].join(" ")}
                  aria-hidden
                >
                  {quadrant.letter}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4.5 w-4.5 ${theme.iconClass}`} />
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${theme.tagClass}`}>{quadrant.type}</span>
                  </div>
                  <ul className="mt-4 space-y-3.5">
                    {quadrant.items.map((item) => (
                      <li key={item.title}>
                        <p className="text-sm font-semibold text-[#0f172a] md:text-[0.96rem]">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#64748b]">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </section>

        <section className="mt-5 rounded-3xl border border-[#e5e7eb] bg-white p-5 md:p-6">
          <h4 className="text-lg font-semibold text-[#111827]">CLINE 财务 Agent 专项攻坚模块</h4>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {financeIntelligenceSwotData.focusModules.map((module) => (
              <article key={module.title} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                <p className="text-sm font-semibold text-[#7f1d1d]">{module.title}</p>
                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[#334155]">
                  {module.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SlideWrap>
  );
}

function SlideKnowledgeMatrix({
  scenario,
  draft,
}: {
  scenario: ExecutiveScenarioItem;
  draft: ScenarioDraft;
}) {
  if (scenario.id === 3) {
    return <SlideFinanceIntelligenceSwotBoard />;
  }

  if (scenario.id === 7) {
    return <SlideCommercialDiagnosisSwotBoard />;
  }

  const toPoints = (value: string, fallback: string) => {
    const points = value
      .split(/\n|；|;|。/)
      .map((item) => item.trim())
      .filter(Boolean);
    return points.length > 0 ? points : [fallback];
  };

  const swotData: SwotQuadrant[] =
    scenario.title === "股份公司智小谱"
      ? [
          {
            key: "S",
            title: "优势",
            tone: "border-emerald-200 bg-emerald-50",
            points: ["数据量大、数据全，覆盖股份公司大部分品种（除睡眠品种）", "已经建好 Neo4J 图数据库，底子在", "产品、知识、文化之间的关联关系已沉淀"],
          },
          {
            key: "W",
            title: "短板",
            tone: "border-amber-200 bg-amber-50",
            points: ["目前较依赖外部供应商", "系统自身 AI 能力偏弱", "交互功能不够强，用户体验一般"],
          },
          {
            key: "O",
            title: "机会",
            tone: "border-sky-200 bg-sky-50",
            points: ["基于现有图谱，补齐自有 AI 问答与推荐能力", "和问药、问数、问策打通，形成统一入口", "可扩展到培训、导购、客服等更多场景"],
          },
          {
            key: "T",
            title: "风险",
            tone: "border-rose-200 bg-rose-50",
            points: ["供应商策略变化可能影响迭代节奏和成本", "若 AI 与交互能力长期不提升，使用积极性会下降", "业务变化快，图谱更新跟不上会影响实用价值"],
          },
        ]
      : scenario.id === 2
        ? [
            {
              key: "S",
              title: "优势",
              tone: "border-emerald-200 bg-emerald-50",
              points: [
                "行业方案成熟，SOP动作识别与违规检测可直接复用",
                "对通用大模型依赖低，部署路径清晰、上线周期可控",
                "可实时输出预警并留痕，便于安全管理闭环复盘",
              ],
            },
            {
              key: "W",
              title: "短板",
              tone: "border-amber-200 bg-amber-50",
              points: [
                "现场光照、遮挡、摄像角度会影响识别稳定性",
                "SOP标签体系需先标准化，否则误报漏报会偏高",
                "初期需要一定样本和现场联调，见效节奏受数据质量影响",
              ],
            },
            {
              key: "O",
              title: "机会",
              tone: "border-sky-200 bg-sky-50",
              points: [
                "可复制到质检、巡检、仓储与装配等多个车间场景",
                "可接入集团中台形成统一告警中心和跨单位看板",
                "可与问药/问数联动，沉淀“安全-产能-质量”综合洞察",
              ],
            },
            {
              key: "T",
              title: "风险",
              tone: "border-rose-200 bg-rose-50",
              points: [
                "过度依赖单一算法供应商会影响后续迭代自主性",
                "如果处置流程不联动，预警可能停留在展示层面",
                "现场网络与摄像头稳定性不足会影响连续监测效果",
              ],
            },
          ]
      : scenario.id === 4
        ? [
            {
              key: "S",
              title: "优势",
              tone: "border-emerald-200 bg-emerald-50",
              points: [
                "研究院已完成实机部署，形成可复盘的真实运行界面",
                "已具备文档问答、知识解析、结构化表格输出等核心能力",
                "对中药品种知识与功效说明的检索响应较快，可直接用于研发辅助",
              ],
            },
            {
              key: "W",
              title: "短板",
              tone: "border-amber-200 bg-amber-50",
              points: [
                "当前覆盖范围以已接入知识为主，跨系统数据联动仍有限",
                "表格结果与结论仍需人工复核，尚未形成全自动闭环",
                "实机能力已具备，但规模化接入与标准口径治理仍待完善",
              ],
            },
            {
              key: "O",
              title: "机会",
              tone: "border-sky-200 bg-sky-50",
              points: [
                "可与问药图谱能力和问数经营能力联动，形成研产销一体化分析",
                "可扩展到药材研究、说明书生成、临床资料归纳等更多研发场景",
                "可沉淀研究院标准知识资产，支撑内部培训与专家经验传承",
              ],
            },
            {
              key: "T",
              title: "风险",
              tone: "border-rose-200 bg-rose-50",
              points: [
                "若数据来源与更新机制不稳定，回答可信度会波动",
                "若缺少统一质控流程，可能出现不同人员使用结果不一致",
                "若停留在试点层面，难以转化为可量化的研发提效成果",
              ],
            },
          ]
      : [
          {
            key: "S",
            title: "优势",
            tone: "border-emerald-200 bg-emerald-50",
            points: toPoints(draft.strengths, "待补充优势"),
          },
          {
            key: "W",
            title: "短板",
            tone: "border-amber-200 bg-amber-50",
            points: toPoints(draft.weaknesses, "待补充短板"),
          },
          {
            key: "O",
            title: "机会",
            tone: "border-sky-200 bg-sky-50",
            points: toPoints(draft.opportunities, "待补充机会"),
          },
          {
            key: "T",
            title: "风险",
            tone: "border-rose-200 bg-rose-50",
            points: toPoints(draft.risks, "待补充风险"),
          },
        ];

  const originalMatrix: MatrixBlock[] =
    scenario.title === "股份公司智小谱"
      ? [
          {
            title: "互动体验功能",
            points: ["沉浸式科普评测", "3D 全景漫游", "VR 虚拟场馆", "自动评判打分"],
          },
          {
            title: "图谱检索功能",
            points: ["关键词检索", "扫码智能识别", "产品/文化关联展示", "精准知识触达"],
          },
          {
            title: "运营与转化功能",
            points: ["党建业务融合", "海量数据库管理", "线上知识索引", "线下购药承接"],
          },
        ]
      : scenario.id === 2
        ? [
            {
              title: "核心技术模块",
              points: ["多路视频流接入", "SOP动作识别模型", "违规行为检测引擎", "告警分级策略（高/中/低）"],
            },
            {
              title: "业务能力输出",
              points: ["标准动作实时监测", "异常行为秒级预警", "事件回放与留痕追溯", "班组/产线安全看板"],
            },
            {
              title: "落地实施路径",
              points: ["先选单产线试点（2-4周）", "完成SOP标准与标签治理", "接入中台告警与工单流程", "按车间逐步复制扩面"],
            },
          ]
      : scenario.id === 4
        ? [
            {
              title: "实机能力验证",
              points: ["同仁堂品种融合信息库助手运行稳定", "支持自然语言问答与长文本解析", "支持结构化表格输出（药品名称/功效主治/适用症状）"],
            },
            {
              title: "当前业务价值",
              points: ["研发资料检索与梳理效率提升", "复杂资料由“手工翻阅”转为“智能归纳”", "专家经验可沉淀为可复用知识资产"],
            },
            {
              title: "下一步建设重点",
              points: ["接入更多研究文献与药材实验数据", "建立标准化质控与口径校验流程", "打通问药与问数数据，形成策略级洞察支撑"],
            },
          ]
      : [
          {
            title: "现状补充",
            points: toPoints(draft.background, "待补充现状"),
          },
          {
            title: "功能矩阵补充",
            points: toPoints(draft.matrixNotes, "待补充功能矩阵"),
          },
          {
            title: "基础信息",
            points: [`计划节点：${scenario.timeline}`, `责任单位：${scenario.owner}`],
          },
        ];

  return (
    <SlideWrap>
      <h3 className="text-3xl font-semibold text-[#111827]">{scenario.title}：SWOT 与功能矩阵</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="h-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-xl bg-white">
            {scenario.id === 1 ? (
              <div className="h-full w-full">
                <iframe
                  src="http://114.132.213.75:5080"
                  title="工业显微镜核心画面"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white">
                  工业显微镜核心画面窗口
                </div>
              </div>
            ) : scenario.id === 2 ? (
              <div className="h-full w-full">
                <Image
                  src="/safety-alert-board.png"
                  alt="现场生产安全预警看板示意图"
                  fill
                  unoptimized
                  className="object-contain object-center"
                />
              </div>
            ) : scenario.id === 4 ? (
              <div className="h-full w-full overflow-y-auto p-3">
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    { src: "/research-lab-1.png", caption: "实机首页：中药信息助手入口与会话区域" },
                    { src: "/research-lab-2.png", caption: "能力验证：针对药品提出问题并返回详细解析" },
                    { src: "/research-lab-3.png", caption: "结构化输出：自动生成药品功效与适应症对照表" },
                  ].map((item) => (
                    <article key={item.src} className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
                      <div className="relative h-44 w-full bg-slate-50">
                        <Image src={item.src} alt={item.caption} fill unoptimized className="object-cover object-top" />
                      </div>
                      <p className="px-2 py-1.5 text-[11px] leading-relaxed text-[#4b5563]">{item.caption}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <Image src="/ppt-layout/media/image43.jpeg" alt={`${scenario.title}配图`} fill unoptimized className="object-contain object-center" />
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
          <h4 className="text-lg font-semibold text-[#111827]">SWOT 综合分析</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {swotData.map((item) => (
              <div key={item.key} className={`rounded-xl border p-3 ${item.tone}`}>
                <p className="text-sm font-semibold text-[#111827]">
                  <span className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs">{item.key}</span>
                  {item.title}
                </p>
                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[#374151]">
                  {item.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
        <p className="text-base font-semibold text-[#111827]">原有功能矩阵</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {originalMatrix.map((block) => (
            <div key={block.title} className="rounded-xl border border-[#e5e7eb] bg-white p-3">
              <p className="text-sm font-semibold text-[#7f1d1d]">{block.title}</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[#374151]">
                {block.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  );
}

function SlideFiveExecutive({ onOpenKnowledgeMatrix }: { onOpenKnowledgeMatrix?: (item: ExecutiveScenarioItem) => void }) {
  const [mode, setMode] = useState<"grid" | "table">("grid");
  const localizedScenarioIds = new Set<number>([1, 2, 3, 4]);
  const builtScenarioIds = new Set<number>([4]);
  const cloudLeaseScenarioIds = new Set<number>([6, 7]);
  const sectionData: {
    secondary_units: { sectionTitle: string; sectionSubtitle: string; items: ExecutiveScenarioItem[] };
  } = {
    secondary_units: {
      sectionTitle: "场景池（各二级单位）",
      sectionSubtitle: "已开展场景详情，未开展场景需求摸排",
      items: [
        { id: 1, title: "工业显微镜识别", timeline: "2026Q3 上线", category: "视觉识别", desc: "实验过程自动识别有效成分，拍照后快速形成标准报告模板", hardware: "NVIDIA GeForce RTX4080 32G * 8", status: "planning", owner: "股份公司工装部", metric: "识别准确率 >= 95%" },
        { id: 2, title: "现场生产安全预警", timeline: "2026Q4 试运行", category: "视觉识别", desc: "图像识别 + SOP 动作检测，形成实时预警闭环", hardware: "NVIDIA GeForce RTX4080 32G * 8", status: "planning", owner: "股份公司安全保障部", metric: "高风险动作漏检率 <= 5%" },
        { id: 3, title: "财务智能大数据分析", timeline: "2026Q3 交付", category: "大数据分析", desc: "海量财务数据整理、分析与预测，支撑预算与审计协同", hardware: "海光 DCU K100 AI 64G PCIe", status: "upcoming", owner: "股份公司财务部", metric: "月结周期缩短 >= 30%" },
        { id: 4, title: "药物研发发现", timeline: "2026Q4 扩容", category: "研发分析", desc: "支撑文献分类、说明书信息抽取与政策问答等研发任务", hardware: "NVIDIA L20 48G * 8 (有拓展需求)", status: "ongoing", owner: "研究院", metric: "研发检索耗时下降 >= 40%" },
        { id: 6, title: "股份公司智小谱", timeline: "2026Q2 优化", category: "企业知识库", desc: "产品数据知识问答、党建宣传展示与门店知识触达", hardware: "华为昇腾910B 32GB * 8", status: "ongoing", owner: "股份公司", metric: "首问命中率 >= 85%" },
        { id: 7, title: "商业公司辅助诊疗系统", timeline: "2026Q4 评估", category: "医疗决策支持", desc: "沉淀名老中医经验，实现同病不同证/同证不同方辅助建议", hardware: "NVIDIA A100 80G * 8", status: "core", owner: "商业公司", metric: "知识复用率 >= 70%" },
      ],
    },
  };
  const allItems = [...sectionData.secondary_units.items];
  const onsiteScenarioIds = new Set<number>([1, 2, 4]);
  const companyScenarioIds = new Set<number>([3, 6, 7]);
  const onsiteItems = allItems.filter((item) => onsiteScenarioIds.has(item.id));
  const companyItems = allItems.filter((item) => companyScenarioIds.has(item.id));
  const onsiteLocalizedCount = onsiteItems.filter((item) => localizedScenarioIds.has(item.id)).length;
  const companyCloudCount = companyItems.filter((item) => cloudLeaseScenarioIds.has(item.id)).length;
  const companyDomesticCount = companyItems.filter((item) => item.hardware.includes("华为") || item.hardware.includes("海光")).length;
  const domestic = allItems.filter((item) => item.hardware.includes("海光") || item.hardware.includes("华为")).length;
  const coreCards = 16;
  const statusColor: Record<string, string> = {
    ongoing: "bg-emerald-500",
    planning: "bg-blue-500",
    proposed: "bg-amber-500",
    upcoming: "bg-indigo-500",
    core: "bg-rose-500",
  };
  const categoryStyle: Record<string, string> = {
    视觉识别: "bg-blue-100 text-blue-700",
    大数据分析: "bg-purple-100 text-purple-700",
    研发分析: "bg-pink-100 text-pink-700",
    营销策略: "bg-orange-100 text-orange-700",
    企业知识库: "bg-green-100 text-green-700",
    医疗决策支持: "bg-red-100 text-red-700",
    策略分析: "bg-rose-100 text-rose-700",
    问药: "bg-rose-100 text-rose-700",
    问数: "bg-sky-100 text-sky-700",
    问策: "bg-violet-100 text-violet-700",
  };

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.12),transparent_35%)]">
        <h3 className="text-center text-3xl font-semibold text-[#111827] md:text-4xl">摸排结果：首批场景经营看板</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <p className="text-xs text-[#6b7280]">纳入经营管理的场景数</p>
            <p className="mt-1 text-2xl font-semibold text-[#111827]">{allItems.length} 个</p>
          </div>
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <p className="text-xs text-[#6b7280]">国产算力项目占比</p>
            <p className="mt-1 text-2xl font-semibold text-[#111827]">{Math.round((domestic / allItems.length) * 100)}%</p>
          </div>
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
            <p className="text-xs text-[#6b7280]">重磅算力卡（A100+L20）</p>
            <p className="mt-1 text-2xl font-semibold text-[#111827]">{coreCards} 卡</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("grid")}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-sm ${mode === "grid" ? "bg-[#111827] text-white" : "border border-[#e5e7eb] bg-white text-[#374151]"}`}
          >
            <LayoutGrid size={14} />
            网格
          </button>
          <button
            type="button"
            onClick={() => setMode("table")}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-sm ${mode === "table" ? "bg-[#111827] text-white" : "border border-[#e5e7eb] bg-white text-[#374151]"}`}
          >
            <Table2 size={14} />
            表格
          </button>
        </div>

        {mode === "grid" ? (
          <>
            <div className="mt-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-1.5 rounded-full bg-blue-500" />
                <div>
                  <h4 className="text-lg font-semibold text-[#111827]">{sectionData.secondary_units.sectionTitle}</h4>
                  <p className="text-xs text-[#6b7280]">{sectionData.secondary_units.sectionSubtitle}</p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {sectionData.secondary_units.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenKnowledgeMatrix?.(item)}
                    className="rounded-2xl border border-[#e5e7eb] bg-white p-4 text-left transition-all hover:scale-[1.01] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold text-[#111827]">{item.title}</h4>
                      <span className={`h-2.5 w-2.5 rounded-full ${statusColor[item.status] ?? "bg-gray-400"}`} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                        <CalendarClock size={12} />
                        {item.timeline}
                      </span>
                      <span className={`rounded-full px-2 py-1 text-xs ${categoryStyle[item.category] ?? "bg-gray-100 text-gray-700"}`}>{item.category}</span>
                      {localizedScenarioIds.has(item.id) ? (
                        <span className="inline-flex items-center gap-2 whitespace-nowrap">
                          <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700">本地化</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              builtScenarioIds.has(item.id) ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {builtScenarioIds.has(item.id) ? "已建设" : "拟建设"}
                          </span>
                        </span>
                      ) : null}
                      {cloudLeaseScenarioIds.has(item.id) ? (
                        <span className="rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-700">云租用</span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm text-[#4b5563]">{item.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#eef2ff] px-2 py-1 text-xs text-[#3730a3]">
                      <Cpu size={12} />
                      {item.hardware}
                    </div>
                    <div className="mt-3 space-y-1 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2 text-xs text-[#4b5563]">
                      <p>责任单位：{item.owner}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
            <table className="w-full text-sm">
              <thead className="bg-[#f9fafb] text-left text-[#6b7280]">
                <tr>
                  <th className="px-3 py-2">场景</th>
                  <th className="px-3 py-2">时间</th>
                  <th className="px-3 py-2">类别</th>
                  <th className="px-3 py-2">硬件</th>
                  <th className="px-3 py-2">责任单位</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#f1f5f9] bg-blue-50/40">
                  <td colSpan={5} className="px-3 py-2 text-xs font-semibold tracking-[0.08em] text-blue-700">
                    {sectionData.secondary_units.sectionTitle}
                  </td>
                </tr>
                {sectionData.secondary_units.items.map((item) => (
                  <tr key={item.id} className="border-t border-[#f1f5f9]">
                    <td className="px-3 py-2 text-[#111827]">
                      <button
                        type="button"
                        onClick={() => onOpenKnowledgeMatrix?.(item)}
                        className="cursor-pointer touch-manipulation text-left font-medium text-[#b91c1c] underline decoration-[#b91c1c]/40 underline-offset-2 hover:decoration-[#b91c1c]"
                      >
                        {item.title}
                      </button>
                    </td>
                    <td className="px-3 py-2 text-[#4b5563]">{item.timeline}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        <span className={`rounded-full px-2 py-1 text-xs ${categoryStyle[item.category] ?? "bg-gray-100 text-gray-700"}`}>{item.category}</span>
                        {localizedScenarioIds.has(item.id) ? (
                          <span className="inline-flex items-center gap-2 whitespace-nowrap">
                            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700">本地化</span>
                            <span
                              className={`rounded-full px-2 py-1 text-xs ${
                                builtScenarioIds.has(item.id) ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {builtScenarioIds.has(item.id) ? "已建设" : "拟建设"}
                            </span>
                          </span>
                        ) : null}
                        {cloudLeaseScenarioIds.has(item.id) ? (
                          <span className="rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-700">云租用</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-[#3730a3]">{item.hardware}</td>
                    <td className="px-3 py-2 text-[#4b5563]">{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <section className="mt-5 rounded-2xl border border-[#dbeafe] bg-[#f8fbff] p-4 md:p-5">
          <div className="rounded-xl border border-[#bfdbfe] bg-white px-3 py-2 text-sm text-[#1e3a8a]">
            <span className="font-semibold">摸排结论：</span>
            当前场景结构呈现“3类能力并行”特征：生产/研发侧（现场）以本地化部署为主，知识服务侧（公司）以数据治理和知识传播为重点。
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-[#e5e7eb] bg-white p-4">
              <h4 className="text-base font-semibold text-[#111827]">现场侧（生产/研发）本地化结论</h4>
              <div className="mt-2 grid gap-2 text-xs md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 px-2 py-2 text-[#374151]">现场场景：{onsiteItems.length} 个</div>
                <div className="rounded-lg bg-indigo-50 px-2 py-2 text-indigo-700">本地化：{onsiteLocalizedCount} 个</div>
                <div className="rounded-lg bg-emerald-50 px-2 py-2 text-emerald-700">
                  本地化占比：{Math.round((onsiteLocalizedCount / Math.max(onsiteItems.length, 1)) * 100)}%
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-[#4b5563]">
                <li>• 需本地化部署：工业显微镜识别、现场生产安全预警、药物研发发现。</li>
                <li>• 共性原因：实时识别与持续推理需求高，且涉及现场工艺与研发数据，需就地处理保障稳定与合规。</li>
                <li>• 推进建议：在保障识别准确率与误报控制的前提下，鼓励工业单位结合产线特点自行探索，并逐步沉淀标准SOP与复盘机制。</li>
              </ul>
            </article>

            <article className="rounded-xl border border-[#e5e7eb] bg-white p-4">
              <h4 className="text-base font-semibold text-[#111827]">公司级（知识服务）共性结论</h4>
              <div className="mt-2 grid gap-2 text-xs md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 px-2 py-2 text-[#374151]">公司级场景：{companyItems.length} 个</div>
                <div className="rounded-lg bg-sky-50 px-2 py-2 text-sky-700">云租用：{companyCloudCount} 个</div>
                <div className="rounded-lg bg-purple-50 px-2 py-2 text-purple-700">
                  国产算力覆盖：{Math.round((companyDomesticCount / Math.max(companyItems.length, 1)) * 100)}%
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-[#4b5563]">
                <li>• 公司级场景：财务智能大数据分析、股份公司智小谱、商业公司辅助诊疗系统。</li>
                <li>• 共性重点：统一数据口径、知识库治理、跨系统接口标准与权限审计。</li>
                <li>• 推进建议：集团公司可统筹各单位数据进行综合利用，赋能问药、问数、问策；例如将股份公司智小谱药品数据与商业公司门店数据结合，形成市场洞察。</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </SlideWrap>
  );
}

function SlideOpenClawStory() {
  const stages = [
    {
      title: "起源阶段",
      subtitle: "退休开发者十天奇迹",
      img: "/brand/openclaw-stage-1.png",
    },
    {
      title: "爆发阶段",
      subtitle: "Claude Opus 4.5 引爆社区",
      img: "/brand/openclaw-stage-2.png",
    },
    {
      title: "演进阶段",
      subtitle: "Clawbot → Moltbot → Openclaw",
      img: "/brand/openclaw-stage-3.png",
    },
    {
      title: "生态阶段",
      subtitle: "ClawHub 与智能体协作",
      img: "/brand/openclaw-stage-4.png",
    },
  ];
  return (
    <SlideWrap>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-4xl font-semibold text-[#111827]">OpenClaw 诞生故事与智能体 OS 路径</h3>
        <div className="relative h-12 w-56">
          <Image src="/brand/openclaw-logo.png" alt="OpenClaw Logo" fill unoptimized className="object-contain" />
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {stages.map((stage) => (
          <div key={stage.title} className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <div className="relative h-24 w-full overflow-hidden rounded-lg bg-white">
              <Image src={stage.img} alt={stage.title} fill unoptimized className="object-cover" />
            </div>
            <p className="mt-2 text-base font-semibold text-[#111827]">{stage.title}</p>
            <p className="text-sm text-[#4b5563]">{stage.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
        <h4 className="text-lg font-semibold text-[#111827]">原文故事线（对应四阶段）</h4>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[#dbeafe] bg-[#eff6ff] p-3">
            <p className="text-sm font-semibold text-[#1e3a8a]">起源阶段 · 2025年末</p>
            <p className="mt-1 text-sm text-[#374151]">退休后的“十天奇迹”，奥地利开发者 Peter Steinberger 仅靠自然语言与 AI 对话构建原型。</p>
          </div>
          <div className="rounded-xl border border-[#ddd6fe] bg-[#f5f3ff] p-3">
            <p className="text-sm font-semibold text-[#5b21b6]">爆发阶段 · 2026年1月</p>
            <p className="mt-1 text-sm text-[#374151]">Claude Opus 4.5 发布后项目迅速引爆技术社区。</p>
          </div>
          <div className="rounded-xl border border-[#fee2e2] bg-[#fff1f2] p-3">
            <p className="text-sm font-semibold text-[#9f1239]">演进阶段 · 三次蜕壳</p>
            <p className="mt-1 text-sm text-[#374151]">Clawbot → Moltbot → OpenClaw，Same soul, new shell。</p>
          </div>
          <div className="rounded-xl border border-[#dcfce7] bg-[#f0fdf4] p-3">
            <p className="text-sm font-semibold text-[#166534]">生态阶段 · 社区验证</p>
            <p className="mt-1 text-sm text-[#374151]">84 天突破 20 万 Star，单日提交 1374 次，完成从“十天奇迹”到“AI 智能体操作系统”的跨越。</p>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

function SlideAIBlueprint() {
  return (
    <div className="min-h-full w-full overflow-y-auto bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,0.12),transparent_36%),linear-gradient(180deg,#fffaf9_0%,#fff2f2_55%,#ffe8e8_100%)] pb-8 text-slate-800">
      <h3 className="text-3xl font-semibold text-rose-900">{aiBlueprint.title}</h3>

      <div className="mt-5 space-y-4">
        {aiBlueprint.layers.map((layer) => {
          return (
            <div key={layer.id} className="rounded-2xl border border-rose-200/80 bg-white/75 p-4 backdrop-blur-xl">
              <div className="mb-3 inline-flex rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                {layer.name}
              </div>

              {"items" in layer && layer.type === "grid" ? (
                <div className="grid gap-3 md:grid-cols-5">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-center text-xs text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_0_24px_rgba(239,68,68,0.22)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}

              {"subLayers" in layer && layer.type === "nested" ? (
                <div className="rounded-xl border border-rose-200 bg-[#fff6f6]/85 p-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    {layer.subLayers.map((sub) => (
                      <div key={sub.name} className="rounded-xl border border-rose-200 bg-white p-3">
                        <p className="text-sm font-semibold text-rose-700">{sub.name}</p>
                        <div className="mt-2 space-y-2">
                          {sub.items.map((item) => (
                            <div
                              key={item}
                              className="rounded-lg border border-rose-100 bg-slate-50 px-2 py-1 text-xs text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(239,68,68,0.18)]"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                        {sub.name === "原子能力层" ? (
                          <div className="mt-2 grid gap-2">
                            <div className="rounded-lg border border-dashed border-rose-300 bg-rose-50/60 px-2 py-2 text-xs text-rose-700">
                              扩展预留 A（准确率达标后启用）
                            </div>
                            <div className="rounded-lg border border-dashed border-rose-300 bg-rose-50/60 px-2 py-2 text-xs text-rose-700">
                              扩展预留 B（知识库完善后启用）
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {"items" in layer && layer.type === "flex" ? (
                layer.id === "idc" ? (
                  <div className="mt-4 grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4 md:gap-8 lg:gap-10">
                    {layer.items.map((item) => {
                      const meta = idcInfraMeta[item] ?? { icon: Cpu, subtitle: "基础设施" };
                      const Icon = meta.icon;
                      return (
                        <div
                          key={item}
                          className="group relative flex min-h-[148px] flex-col items-center justify-center gap-3 rounded-2xl border border-rose-200/90 bg-gradient-to-b from-white via-white to-rose-50/70 px-4 py-7 text-center shadow-[0_10px_40px_-12px_rgba(185,28,28,0.15)] ring-1 ring-rose-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-rose-300/90 hover:shadow-[0_24px_48px_-14px_rgba(239,68,68,0.32)] md:min-h-[168px] md:px-5 md:py-8"
                        >
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-amber-50 text-rose-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-rose-200/70 transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16">
                            <Icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} aria-hidden />
                          </span>
                          <p className="text-lg font-semibold tracking-[0.12em] text-slate-800 md:text-xl">{item}</p>
                          <p className="max-w-[11rem] text-[11px] font-medium leading-relaxed text-slate-500 md:text-xs">{meta.subtitle}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {layer.items.map((item) => (
                      <div
                        key={item}
                        className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-rose-200 bg-white px-3 py-1 text-xs text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(239,68,68,0.22)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SlideVibeCodingProject() {
  const scenarios = [
    { name: "内部知识培训", icon: BookOpen, desc: "沉浸式学习中药知识结构" },
    { name: "品牌 IP 打造", icon: Sparkles, desc: "形成可传播的药丸交互形象" },
    { name: "app 引流", icon: Smartphone, desc: "转化为小程序/APP 入口" },
    { name: "服药提醒", icon: AlarmClock, desc: "关联药品提醒与场景服务" },
    { name: "服务提升", icon: Sparkles, desc: "增强药师与用户交互体验" },
    { name: "......", icon: ArrowRight, desc: "更多场景持续拓展中" },
  ];

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(192,64,0,0.14),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef7ff_60%,#e9fff1_100%)]">
        <h3 className="text-3xl font-bold text-[#111827]">
          <span className="text-[#2563eb]">【Vibe-coding</span>
          <span className="text-[#c04000]">实践游戏药丸】</span>
          <span className="text-[#111827]">——探索知识库的新型表达方式</span>
        </h3>

        <div className="mt-5 rounded-2xl border border-sky-200 bg-white/70 p-4 backdrop-blur">
          <h4 className="text-lg font-semibold text-sky-700">同仁堂游戏药丸制作流程</h4>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
            <div className="rounded-xl border border-sky-200 bg-white p-3">
              <p className="text-sm font-semibold text-[#111827]">第一阶段：知识炼制坊</p>
              <div className="mt-2 grid gap-2">
                {[
                  "智小谱的知识图谱数据",
                  "产品挂网的数据",
                  "大师工作室口口相传的偏方功效",
                ].map((input) => (
                  <div key={input} className="rounded-lg border border-sky-100 bg-sky-50 px-2 py-1 text-xs text-slate-700">
                    {input}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-sky-50 px-2 py-2 text-xs text-sky-700">
                <FlaskConical size={14} />
                AI 炼制炉 · 训练周期 6 个工作日
              </div>
            </div>

            <motion.div
              className="hidden items-center justify-center md:flex"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <div className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-700">
                <ArrowRight size={12} />
                流转
              </div>
            </motion.div>

            <div className="rounded-xl border border-sky-200 bg-white p-3">
              <p className="text-sm font-semibold text-[#111827]">第二阶段：游戏药丸工坊</p>
              <div className="mt-2 grid gap-3">
                <div className="rounded-lg border border-dashed border-cyan-300 bg-sky-50/60 p-2">
                  <div className="relative h-24 w-full overflow-hidden rounded bg-white">
                    <Image src="/brand/vibe-preview-1.png" alt="药物展示体验预留位" fill unoptimized className="object-cover" />
                  </div>
                  <p className="mt-1 text-xs text-[#374151]">药物展示体验：选一盒药，2.5D 解构看成分</p>
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-sky-600">
                  <ArrowRight size={12} className="animate-pulse" />
                  深化体验
                </div>
                <div className="rounded-lg border border-dashed border-cyan-300 bg-sky-50/60 p-2">
                  <div className="relative h-24 w-full overflow-hidden rounded bg-white">
                    <Image src="/brand/vibe-preview-2.png" alt="配方探索体验预留位" fill unoptimized className="object-cover" />
                  </div>
                  <p className="mt-1 text-xs text-[#374151]">配方探索体验：互动、查询的配方网络探索</p>
                </div>
              </div>
            </div>

            <motion.div
              className="hidden items-center justify-center md:flex"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-700">
                <ArrowRight size={12} />
                输出
              </div>
            </motion.div>

            <div className="rounded-xl border border-sky-200 bg-white p-3">
              <p className="text-sm font-semibold text-[#111827]">第三阶段：价值输出站</p>
              <p className="mt-2 text-xs text-[#4b5563]">形成可运营、可传播、可转化的中医药知识新表达。</p>
              <div className="mt-4 rounded-lg bg-emerald-50 px-2 py-2 text-xs text-emerald-700">连接应用场景卡片集，驱动业务价值落地</div>
              <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-2">
                <div className="relative h-28 w-full overflow-hidden rounded bg-white">
                  <Image src="/brand/vibe-junchen-network.png" alt="君臣佐使关系图" fill unoptimized className="object-cover" />
                </div>
                <p className="mt-1 text-xs text-[#4b5563]">君臣佐使关系图（可扩展故事线节点）</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[#d1fae5] bg-white/75 p-4 backdrop-blur">
          <h4 className="text-lg font-semibold text-emerald-700">应用场景</h4>
          <div className="mt-3 grid gap-3 md:grid-cols-6">
            {scenarios.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  className="group rounded-full border border-emerald-200 bg-white px-3 py-2 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(34,197,94,0.25)]"
                >
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#111827]">
                    <Icon size={12} />
                    {s.name}
                  </div>
                  <p className="mt-1 max-h-0 overflow-hidden text-[11px] text-[#4b5563] transition-all duration-200 group-hover:max-h-12">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

function SlideOpenClawVibeFusion() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{ active: boolean; startX: number; startScrollLeft: number }>({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  const openclawStages = [
    { title: "起源阶段", subtitle: "退休开发者十天奇迹", img: "/brand/openclaw-stage-1.png" },
    { title: "爆发阶段", subtitle: "Claude Opus 4.5 引爆社区", img: "/brand/openclaw-stage-2.png" },
    { title: "演进阶段", subtitle: "Clawbot → Moltbot → Openclaw", img: "/brand/openclaw-stage-3.png" },
    { title: "生态阶段", subtitle: "ClawHub 与智能体协作", img: "/brand/openclaw-stage-4.png" },
  ] as const;

  const vibeScenarios = [
    { name: "内部知识培训", icon: BookOpen, desc: "沉浸式学习中药知识结构" },
    { name: "品牌 IP 打造", icon: Sparkles, desc: "形成可传播的药丸交互形象" },
    { name: "app 引流", icon: Smartphone, desc: "转化为小程序/APP 入口" },
    { name: "服药提醒", icon: AlarmClock, desc: "关联药品提醒与场景服务" },
    { name: "服务提升", icon: Sparkles, desc: "增强药师与用户交互体验" },
    { name: "......", icon: ArrowRight, desc: "更多场景持续拓展中" },
  ] as const;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = sliderRef.current;
    if (!target) return;
    target.focus();
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      startScrollLeft: target.scrollLeft,
    };
    setIsDragging(true);
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = sliderRef.current;
    if (!target || !dragStateRef.current.active) return;
    const delta = e.clientX - dragStateRef.current.startX;
    target.scrollLeft = dragStateRef.current.startScrollLeft - delta;
  };

  const endPointerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = sliderRef.current;
    if (!target || !dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    setIsDragging(false);
    if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
  };

  const goToPage = (page: number) => {
    const target = sliderRef.current;
    if (!target) return;
    const nextPage = Math.max(0, Math.min(totalPages - 1, page));
    target.scrollTo({ left: nextPage * target.clientWidth, behavior: "smooth" });
    setCurrentPage(nextPage);
  };

  const handleSliderScroll = () => {
    const target = sliderRef.current;
    if (!target || target.clientWidth === 0) return;
    const page = Math.round(target.scrollLeft / target.clientWidth);
    if (page !== currentPage) setCurrentPage(page);
  };

  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToPage(currentPage + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPage(currentPage - 1);
    }
  };

  return (
    <SlideWrap>
      <div className="min-h-full overflow-hidden">
        <div
          ref={sliderRef}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointerDrag}
          onPointerCancel={endPointerDrag}
          onScroll={handleSliderScroll}
          onKeyDown={handleSliderKeyDown}
          className={`flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ touchAction: "pan-x" }}
        >
          <section className="min-h-0 min-w-full snap-start overflow-y-auto rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold text-[#111827]">OpenClaw 诞生故事与智能体 OS 路径</h3>
              <div className="relative h-10 w-44 shrink-0">
                <Image src="/brand/openclaw-logo.png" alt="OpenClaw Logo" fill unoptimized className="object-contain" />
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {openclawStages.map((stage) => (
                <div key={stage.title} className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-2.5">
                  <div className="relative h-20 w-full overflow-hidden rounded-lg bg-white">
                    <Image src={stage.img} alt={stage.title} fill unoptimized className="object-cover" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">{stage.title}</p>
                  <p className="text-xs text-[#4b5563]">{stage.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3">
              <h4 className="text-base font-semibold text-[#111827]">原文故事线（对应四阶段）</h4>
              <div className="mt-2 grid gap-2">
                <div className="rounded-lg border border-[#dbeafe] bg-[#eff6ff] p-2.5">
                  <p className="text-xs font-semibold text-[#1e3a8a]">起源阶段 · 2025年末</p>
                  <p className="mt-1 text-xs text-[#374151]">退休后的“十天奇迹”，奥地利开发者 Peter Steinberger 仅靠自然语言与 AI 对话构建原型。</p>
                </div>
                <div className="rounded-lg border border-[#ddd6fe] bg-[#f5f3ff] p-2.5">
                  <p className="text-xs font-semibold text-[#5b21b6]">爆发阶段 · 2026年1月</p>
                  <p className="mt-1 text-xs text-[#374151]">Claude Opus 4.5 发布后项目迅速引爆技术社区。</p>
                </div>
                <div className="rounded-lg border border-[#fee2e2] bg-[#fff1f2] p-2.5">
                  <p className="text-xs font-semibold text-[#9f1239]">演进阶段 · 三次蜕壳</p>
                  <p className="mt-1 text-xs text-[#374151]">Clawbot → Moltbot → OpenClaw，Same soul, new shell。</p>
                </div>
                <div className="rounded-lg border border-[#dcfce7] bg-[#f0fdf4] p-2.5">
                  <p className="text-xs font-semibold text-[#166534]">生态阶段 · 社区验证</p>
                  <p className="mt-1 text-xs text-[#374151]">84 天突破 20 万 Star，单日提交 1374 次，完成从“十天奇迹”到“AI 智能体操作系统”的跨越。</p>
                </div>
              </div>
            </div>
          </section>

          <section className="min-h-0 min-w-full snap-start overflow-y-auto rounded-2xl border border-sky-200 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_75%,rgba(192,64,0,0.14),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef7ff_60%,#e9fff1_100%)] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <h3 className="text-2xl font-bold text-[#111827]">
              <span className="text-[#2563eb]">【Vibe-coding</span>
              <span className="text-[#c04000]">实践游戏药丸】</span>
              <span className="text-[#111827]">——探索知识库的新型表达方式</span>
            </h3>

            <div className="mt-3 rounded-xl border border-sky-200 bg-white/75 p-3 backdrop-blur">
              <h4 className="text-sm font-semibold text-sky-700">同仁堂游戏药丸制作流程</h4>
              <div className="mt-2 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                <div className="rounded-lg border border-sky-200 bg-white p-2">
                  <p className="text-xs font-semibold text-[#111827]">第一阶段：知识炼制坊</p>
                  <div className="mt-2 grid gap-1">
                    {["智小谱的知识图谱数据", "产品挂网的数据", "大师工作室口口相传的偏方功效"].map((input) => (
                      <div key={input} className="rounded-md border border-sky-100 bg-sky-50 px-2 py-1 text-[11px] text-slate-700">
                        {input}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 text-[11px] text-sky-700">
                    <FlaskConical size={12} />
                    AI 炼制炉 · 训练周期 6 个工作日
                  </div>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <div className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-[11px] text-sky-700">
                    <ArrowRight size={11} />
                    流转
                  </div>
                </div>

                <div className="rounded-lg border border-sky-200 bg-white p-2">
                  <p className="text-xs font-semibold text-[#111827]">第二阶段：游戏药丸工坊</p>
                  <div className="mt-2 grid gap-2">
                    <div className="rounded-md border border-dashed border-cyan-300 bg-sky-50/60 p-2">
                      <div className="relative h-16 w-full overflow-hidden rounded bg-white">
                        <Image src="/brand/vibe-preview-1.png" alt="药物展示体验预留位" fill unoptimized className="object-cover" />
                      </div>
                      <p className="mt-1 text-[11px] text-[#374151]">药物展示体验：选一盒药，2.5D 解构看成分</p>
                    </div>
                    <div className="rounded-md border border-dashed border-cyan-300 bg-sky-50/60 p-2">
                      <div className="relative h-16 w-full overflow-hidden rounded bg-white">
                        <Image src="/brand/vibe-preview-2.png" alt="配方探索体验预留位" fill unoptimized className="object-cover" />
                      </div>
                      <p className="mt-1 text-[11px] text-[#374151]">配方探索体验：互动、查询的配方网络探索</p>
                    </div>
                  </div>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <div className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-[11px] text-sky-700">
                    <ArrowRight size={11} />
                    输出
                  </div>
                </div>

                <div className="rounded-lg border border-sky-200 bg-white p-2">
                  <p className="text-xs font-semibold text-[#111827]">第三阶段：价值输出站</p>
                  <p className="mt-1 text-[11px] text-[#4b5563]">形成可运营、可传播、可转化的中医药知识新表达。</p>
                  <div className="mt-2 rounded-md bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">连接应用场景卡片集，驱动业务价值落地</div>
                  <div className="mt-2 rounded-md border border-emerald-200 bg-white p-1.5">
                    <div className="relative h-16 w-full overflow-hidden rounded bg-white">
                      <Image src="/brand/vibe-junchen-network.png" alt="君臣佐使关系图" fill unoptimized className="object-cover" />
                    </div>
                    <p className="mt-1 text-[11px] text-[#4b5563]">君臣佐使关系图（可扩展故事线节点）</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-[#d1fae5] bg-white/75 p-3 backdrop-blur">
              <h4 className="text-sm font-semibold text-emerald-700">应用场景</h4>
              <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3">
                {vibeScenarios.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.name} className="rounded-full border border-emerald-200 bg-white px-2.5 py-1.5 text-center">
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#111827]">
                        <Icon size={11} />
                        {s.name}
                      </div>
                      <p className="mt-0.5 text-[10px] text-[#4b5563]">{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="min-h-0 min-w-full snap-start overflow-y-auto rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <SlideMarketingBadgePanorama />
          </section>
        </div>
      </div>
    </SlideWrap>
  );
}

function AnimatedPercent({ value }: { value: string }) {
  const target = Number(value.match(/\d+/)?.[0] ?? NaN);
  const n = Number.isFinite(target) && target > 0 ? Math.round(target) : 0;
  return (
    <span className="text-5xl font-thin tracking-tight text-[#111827] md:text-6xl">
      {n}
      <span className="ml-1 text-2xl text-[#9ca3af]">%</span>
    </span>
  );
}

function SlideMarketingBadgePanorama() {
  const [activeMetrics, setActiveMetrics] = useState<string[] | null>(null);

  const systemIcons: Record<string, React.ReactNode> = {
    crm: <LayoutGrid size={16} className="text-[#b91c1c]" />,
    rag: <Brain size={16} className="text-[#2563eb]" />,
    mcm: <Sparkles size={16} className="text-[#0f766e]" />,
  };

  const inputIcons = [Smartphone, Database, BarChart3];
  const metricIcons: Record<string, React.ReactNode> = {
    efficiency: <BarChart3 size={14} className="text-blue-600" />,
    authenticity: <Sparkles size={14} className="text-indigo-600" />,
    management: <LayoutGrid size={14} className="text-emerald-600" />,
    compliance: <Shield size={14} className="text-rose-600" />,
    hcp: <BookOpen size={14} className="text-violet-600" />,
    conversion: <ArrowRight size={14} className="text-amber-600" />,
  };

  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50/70 border-blue-200",
    indigo: "bg-indigo-50/70 border-indigo-200",
    green: "bg-emerald-50/70 border-emerald-200",
    red: "bg-rose-50/70 border-rose-200",
    purple: "bg-violet-50/70 border-violet-200",
    orange: "bg-amber-50/70 border-amber-200",
  };

  const getLinkedMetrics = (links: readonly string[]) =>
    links.flatMap((id) => (id === "knowledge" ? ["management", "hcp"] : [id]));

  return (
    <div className="min-h-full overflow-y-auto">
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4">
        <h3 className="text-2xl font-semibold text-[#111827] md:text-3xl">{marketingBadgeData.header.title}</h3>
        <p className="mt-2 text-sm text-[#6b7280]">{marketingBadgeData.header.subtitle}</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[5fr_7fr]">
        <div className="space-y-3 rounded-2xl border border-[#e5e7eb] bg-white p-4">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#b91c1c]">业务流程</p>
          <div className="grid gap-2 md:grid-cols-3">
            {marketingBadgeData.architecture.inputs.map((input, idx) => {
              const Icon = inputIcons[idx];
              return (
                <div key={input} className="rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] p-3">
                  <div className="inline-flex rounded-xl bg-red-50 p-2 text-[#b91c1c]">
                    <Icon size={14} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#374151]">{input}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            {marketingBadgeData.architecture.coreSystems.map((system) => (
              <motion.div
                key={system.id}
                onHoverStart={() => setActiveMetrics(getLinkedMetrics(system.linksTo))}
                onHoverEnd={() => setActiveMetrics(null)}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm transition-all hover:border-[#fecaca]"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-[#fcfcfd] px-2 py-1 text-sm font-semibold text-[#111827]">
                  {systemIcons[system.id]}
                  {system.name}
                </div>
                <p className="mt-2 text-xs leading-5 text-[#4b5563]">{system.desc}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#9ca3af]">
                  <ArrowRight size={11} />
                  悬停联动指标看板
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {marketingBadgeData.architecture.foundations.map((item) => (
              <div key={item} className="rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] p-3 text-xs leading-5 text-[#374151]">
                {item}
              </div>
            ))}
          </div>

          <div className="relative h-44 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f8fafc]">
            <Image src="/brand/marketing-smart-badge.png" alt="智能营销工牌示意图" fill unoptimized className="object-cover" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#2563eb]">业务价值看板</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {marketingBadgeData.metrics.map((metric) => {
              const linked = !activeMetrics || activeMetrics.includes(metric.id);
              return (
                <motion.div
                  key={metric.id}
                  animate={{ opacity: linked ? 1 : 0.4, scale: linked ? 1 : 0.98 }}
                  className={`rounded-2xl border p-3 shadow-sm transition-all ${colorStyles[metric.color]}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6b7280]">{metric.title}</span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white">{metricIcons[metric.id]}</span>
                  </div>
                  <div className="mt-2">
                    <AnimatedPercent value={metric.value} />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#4b5563]">{metric.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#fecaca] bg-red-50/70 px-4 py-3 text-center">
        <p className="text-lg font-semibold tracking-wide text-[#b91c1c]">{marketingBadgeData.header.conclusion}</p>
      </div>
    </div>
  );
}

function SlideDistillationPanorama() {
  const [focusId, setFocusId] = useState<string | null>(null);
  const [coreHover, setCoreHover] = useState(false);
  const [deepseekLogoError, setDeepseekLogoError] = useState(false);

  const themeClasses: Record<string, string> = {
    blue: "bg-rose-50/70 border-rose-200",
    purple: "bg-violet-50/70 border-violet-200",
    red: "bg-rose-50/70 border-rose-200",
    green: "bg-emerald-50/70 border-emerald-200",
  };

  const iconByModule: Record<string, React.ReactNode> = {
    knowledge: <Database size={14} />,
    top_design: <FileText size={14} />,
    reasoning: <Brain size={14} />,
    generation: <BarChart3 size={14} />,
  };

  return (
    <div className="min-h-full overflow-y-auto">
      <h3 className="text-3xl font-semibold text-[#111827]">{distillationData.core_process.title}</h3>

      <motion.div
        className="relative mt-5 rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
        onHoverStart={() => setCoreHover(true)}
        onHoverEnd={() => setCoreHover(false)}
      >
        <div className="mb-4 flex items-center justify-center gap-3 text-center">
          <p className="text-lg font-semibold tracking-[0.16em] text-[#374151] md:text-2xl">{distillationData.core_process.action}</p>
          {deepseekLogoError ? (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-600 md:h-10 md:w-10">
              <Sparkles size={18} />
            </span>
          ) : (
            <Image
              src="/brand/deepseek-whale.png"
              alt="DeepSeek 小鲸鱼 Logo"
              width={40}
              height={40}
              unoptimized
              className="h-9 w-9 rounded-full border border-rose-200 bg-white object-contain p-1 md:h-10 md:w-10"
              onError={() => setDeepseekLogoError(true)}
            />
          )}
        </div>
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 text-center text-sm font-semibold text-[#374151]">
            {distillationData.core_process.base_model}
          </div>
          <div className="relative h-44 w-56">
            <div className="absolute left-1/2 top-3 h-[86%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-rose-300 via-red-400 to-amber-500/60" />
            {distillationData.core_process.enhancements.map((step, idx) => (
              <motion.div
                key={step}
                animate={{
                  opacity: coreHover ? 1 : 0.45,
                  scale: coreHover ? 1 : 0.96,
                  backgroundColor: coreHover ? "#fff1f2" : "#f8fafc",
                }}
                transition={{ duration: 0.25, delay: coreHover ? idx * 0.12 : 0 }}
                className="absolute left-1/2 w-44 -translate-x-1/2 rounded-full border border-rose-200 px-2 py-1 text-center text-xs text-rose-700"
                style={{ top: `${16 + idx * 36}px` }}
              >
                {step}
              </motion.div>
            ))}
            <motion.div
              animate={{ y: coreHover ? [-8, -120, -8] : -8, opacity: coreHover ? [0, 1, 0] : 0 }}
              transition={{ duration: 1.6, repeat: coreHover ? Infinity : 0, ease: "easeInOut" }}
              className="absolute left-1/2 top-[82%] -translate-x-1/2 text-rose-500"
            >
              <ArrowRight size={16} className="-rotate-90" />
            </motion.div>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            {distillationData.core_process.target_model}
          </div>
        </div>
      </motion.div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {distillationData.modules.map((module) => {
          const focused = focusId === null || focusId === module.id;
          return (
            <motion.div
              key={module.id}
              onHoverStart={() => setFocusId(module.id)}
              onHoverEnd={() => setFocusId(null)}
              className={[
                "rounded-2xl border p-4 transition-all duration-200",
                themeClasses[module.themeColor],
                focused ? "opacity-100" : "opacity-40",
              ].join(" ")}
              whileHover={{ y: -4, boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#374151]">
                {iconByModule[module.id]}
                {module.title}
              </div>
              <div className="space-y-2">
                {module.items.map((item) => (
                  <div key={item} className="rounded-xl border border-white bg-white/85 px-3 py-2 text-sm text-[#374151]">
                    <span className="inline-flex items-center gap-1">
                      <Lightbulb size={12} className="text-slate-500" />
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SlideComputeFoundationDashboard() {
  const [activePlan, setActivePlan] = useState<"A" | "B" | null>(null);
  /** 仅在浏览器完成挂载后再渲染图表，避免内嵌 WebView / Simple Browser 下首帧或 SSR 边界导致 Recharts 空白 */
  const [chartsReady, setChartsReady] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setChartsReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);
  /** 固定像素：嵌套 overflow/滚动下测量常为 0，Recharts 3 会不渲染 SVG */
  const chartW = 520;
  const chartH = 248;

  const radarData = [
    { metric: "投入可控性", A: 4, B: 9 },
    { metric: "上线速度", A: 5, B: 9 },
    { metric: "运维简化度", A: 4, B: 8 },
    { metric: "扩展弹性", A: 6, B: 8 },
    { metric: "数据可控性", A: 9, B: 7 },
  ];

  const utilizationData = [
    { name: "私有化自建", value: computeComparisonData.planA.utilization, fill: "#f59e0b" },
    { name: "Token采购", value: computeComparisonData.planB.utilization, fill: "#b91c1c" },
  ];
  const utilizationLift = computeComparisonData.planB.utilization - computeComparisonData.planA.utilization;
  const capexDelta = computeComparisonData.planB.capex - computeComparisonData.planA.capex;
  const annualOpsSaving = computeComparisonData.planA.capex - computeComparisonData.planB.capex;
  const capexIsSaving = capexDelta < 0;
  const capexDeltaAbs = Math.abs(capexDelta);
  const capexLabel = capexIsSaving ? "方案B经费节约" : "方案B新增经费";
  const capexSign = capexIsSaving ? "-" : "+";
  const paybackYears = "探索期不设回收期";

  const summaryCards = [
    { title: "通用费用", desc: "两种方案均需中台授权+技术支持，合计50万", icon: <LayoutGrid size={18} className="text-red-700" /> },
    { title: "Token年费估算", desc: "150人规模约8000元/年（含MCP组件调用费）", icon: <AlarmClock size={18} className="text-rose-600" /> },
    { title: "本地化算力报价", desc: "自建算力底座报价约105万（素材口径）", icon: <Shield size={18} className="text-amber-600" /> },
    { title: "探索期建议", desc: "先以Token模式跑通场景，再评估是否重资产投入", icon: <Cpu size={18} className="text-rose-700" /> },
  ];

  return (
    <div className="min-h-full overflow-y-auto bg-gradient-to-b from-[#fff7f7] to-white pb-6">
      <h3 className="text-2xl font-semibold text-[#111827] md:text-3xl">{computeComparisonData.pageTitle}</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">资源弹性提升</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">+{utilizationLift}%</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">{capexLabel}</p>
          <p className={`mt-1 text-xl font-semibold ${capexIsSaving ? "text-emerald-600" : "text-[#111827]"}`}>
            {capexSign}¥{capexDeltaAbs.toLocaleString("zh-CN")}
          </p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">两方案总经费差额</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">¥{annualOpsSaving.toLocaleString("zh-CN")}</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">评估方式</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">{paybackYears}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <motion.div
          onHoverStart={() => setActivePlan("A")}
          onHoverEnd={() => setActivePlan(null)}
          animate={{ opacity: activePlan && activePlan !== "A" ? 0.45 : 1 }}
          className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-[0_6px_20px_rgba(245,158,11,0.08)]"
        >
          <p className="text-lg font-semibold text-[#111827]">{computeComparisonData.planA.title}</p>
          <p className="mt-2 text-sm text-[#4b5563]">{computeComparisonData.planA.architecture}</p>
          <div className="mt-3 grid gap-2 text-sm text-[#374151]">
            <div className="rounded-xl border border-amber-100 bg-white/90 px-3 py-2">
              预估 Capex：<span className="font-semibold text-amber-700">¥{computeComparisonData.planA.capex.toLocaleString("zh-CN")}</span>
            </div>
            <div className="rounded-xl border border-amber-100 bg-white/90 px-3 py-2">资源平均利用率：{computeComparisonData.planA.utilization}%</div>
            <div className="rounded-xl border border-amber-100 bg-white/90 px-3 py-2">运维复杂度：{computeComparisonData.planA.opexComplexity}</div>
          </div>
          <div className="mt-3 space-y-2">
            {computeComparisonData.planA.scenes.map((scene) => (
              <div key={scene} className="rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm text-[#374151]">
                {scene}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          onHoverStart={() => setActivePlan("B")}
          onHoverEnd={() => setActivePlan(null)}
          animate={{ opacity: activePlan && activePlan !== "B" ? 0.45 : 1 }}
          className="relative rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-[0_6px_20px_rgba(225,29,72,0.12)]"
        >
          <span className="absolute right-4 top-4 rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-700">推荐方案</span>
          <p className="pr-28 text-lg font-semibold text-[#111827]">{computeComparisonData.planB.title}</p>
          <p className="mt-2 text-sm text-[#4b5563]">{computeComparisonData.planB.architecture}</p>
          <div className="mt-3 grid gap-2 text-sm text-[#374151]">
            <div className="rounded-xl border border-rose-100 bg-white/90 px-3 py-2">
              预估 Capex：<span className="font-semibold text-rose-700">¥{computeComparisonData.planB.capex.toLocaleString("zh-CN")}</span>
            </div>
            <div className="rounded-xl border border-rose-100 bg-white/90 px-3 py-2">资源平均利用率：{computeComparisonData.planB.utilization}%</div>
            <div className="rounded-xl border border-rose-100 bg-white/90 px-3 py-2">运维复杂度：{computeComparisonData.planB.opexComplexity}</div>
          </div>
          <div className="mt-3 space-y-2">
            {computeComparisonData.planB.scenes.map((scene) => (
              <div key={scene} className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-[#374151]">
                {scene}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="min-h-[260px] min-w-0 rounded-2xl border border-[#e5e7eb] bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-[#374151]">综合能力雷达（越外圈越优）</p>
          <div className="overflow-x-auto overflow-y-visible [isolation:isolate]" style={{ minWidth: chartW, minHeight: chartH }}>
            {chartsReady ? (
              <RadarChart
                id="tco-radar"
                width={chartW}
                height={chartH}
                data={radarData}
                margin={{ top: 16, right: 28, bottom: 12, left: 28 }}
              >
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#4b5563", fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 10]} tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <Radar name="方案A" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.35} isAnimationActive={false} />
                <Radar name="方案B" dataKey="B" stroke="#b91c1c" fill="#b91c1c" fillOpacity={0.28} isAnimationActive={false} />
                <Tooltip />
              </RadarChart>
            ) : (
              <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/50" style={{ width: chartW, height: chartH }} aria-hidden />
            )}
          </div>
        </div>
        <div className="min-h-[260px] min-w-0 rounded-2xl border border-[#e5e7eb] bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-[#374151]">资源弹性对比（%）</p>
          <div
            className="overflow-x-auto overflow-y-visible [isolation:isolate]"
            style={{ minWidth: chartW, minHeight: chartH }}
          >
            {chartsReady ? (
              <BarChart id="tco-bar" width={chartW} height={chartH} data={utilizationData} margin={{ left: 8, right: 8, top: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                <XAxis dataKey="name" tick={{ fill: "#4b5563", fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                  {utilizationData.map((row) => (
                    <Cell key={row.name} fill={row.fill} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/50" style={{ width: chartW, height: chartH }} aria-hidden />
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-[0_4px_18px_rgba(15,23,42,0.04)]">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8fafc]">{card.icon}</div>
            <p className="text-sm font-semibold text-[#111827]">{card.title}</p>
            <p className="mt-1 text-xs leading-5 text-[#6b7280]">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideLocalComputeInvestmentPlan() {
  const [hoveredModel, setHoveredModel] = useState<"general" | "professional" | null>(null);
  const iconMap: Record<string, LucideIcon> = {
    Brain,
    Microscope,
    Network,
    ShieldCheck,
    CheckCircle,
    Zap,
    Layers,
  };
  const themeStyles: Record<string, { card: string; chip: string; glow: string; mappingChip: string; mappingPill: string }> = {
    blue: {
      card: "from-red-700 to-rose-800",
      chip: "bg-white/20 text-rose-50",
      glow: "shadow-[0_18px_34px_rgba(185,28,28,0.35)]",
      mappingChip: "bg-rose-100 text-rose-700",
      mappingPill: "border-rose-200 bg-rose-50 text-rose-700",
    },
    emerald: {
      card: "from-emerald-500 to-emerald-700",
      chip: "bg-white/20 text-emerald-50",
      glow: "shadow-[0_18px_34px_rgba(16,185,129,0.35)]",
      mappingChip: "bg-emerald-100 text-emerald-700",
      mappingPill: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    amber: {
      card: "from-amber-500 to-orange-500",
      chip: "bg-white/20 text-amber-50",
      glow: "shadow-[0_18px_34px_rgba(245,158,11,0.3)]",
      mappingChip: "bg-amber-100 text-amber-700",
      mappingPill: "border-amber-200 bg-amber-50 text-amber-700",
    },
    slate: {
      card: "from-slate-800 to-gray-900",
      chip: "bg-white/20 text-slate-100",
      glow: "shadow-[0_18px_34px_rgba(15,23,42,0.35)]",
      mappingChip: "bg-slate-200 text-slate-700",
      mappingPill: "border-slate-300 bg-slate-100 text-slate-700",
    },
  };
  const phaseActionData = {
    promotion: {
      title: "推广期要做的事（0-3个月）",
      items: ["上线问药、问数双场景 POC", "完成10并发与150人试用验证", "统一接入口径并完成首轮问题清单闭环"],
    },
    deepen: {
      title: "深化期要做的事（4-6个月）",
      items: ["问策场景正式上线，形成策略建议闭环", "围绕低分问法做专项提效，提升准确率与可执行性", "形成跨单位数据联动机制与协同节奏，并输出扩展建议"],
    },
    keyResults: [
      { title: "推广期快速见效", desc: "先把三场景跑通并完成试用验证，形成首轮业务证据。", icon: "Zap" },
      { title: "深化期稳步提升", desc: "在推广期基础上持续优化准确率、联动能力与治理机制。", icon: "Layers" },
      { title: "两阶段可持续", desc: "先验证再扩展，确保每一步都可量化、可复盘、可决策。", icon: "CheckCircle" },
    ],
  } as const;

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[#fcfcfd]">
        <header className="text-center">
          <h3 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">{localComputePlanningData.header.title}</h3>
          <p className="mx-auto mt-2 max-w-4xl text-sm text-[#6b7280] md:text-base">以三场景能力卡为主线，推广期先上线问药/问数，问策在深化期正式上线并协同提效。</p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {localModelHybridData.models.map((model, idx) => {
            const Icon = iconMap[model.icon] ?? Sparkles;
            const style = themeStyles[model.theme];
            return (
              <motion.article
                key={model.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onHoverStart={() =>
                  setHoveredModel(model.id === "general" || model.id === "professional" ? (model.id as "general" | "professional") : null)
                }
                onHoverEnd={() => setHoveredModel(null)}
                className={`rounded-3xl bg-gradient-to-br p-5 text-white ${style.card} ${style.glow}`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                  <Icon className="h-5 w-5" />
                  <span>{model.type}</span>
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight">{model.name}</p>
                <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style.chip}`}>{model.version}</span>
                <ul className="mt-4 space-y-2 text-sm">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-white/95">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[inset_0_0_0_1px_rgba(226,232,240,0.4)] lg:col-span-5">
            <h4 className="text-lg font-semibold text-[#111827]">{localModelHybridData.bottomSection.mapping.title}</h4>
            <div className="mt-4 space-y-3">
              {localModelHybridData.bottomSection.mapping.items.map((row) => {
                const style = themeStyles[row.theme];
                const focused = !hoveredModel || hoveredModel === row.modelId;
                return (
                  <div key={row.model} className={`rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] p-3 transition-all ${focused ? "opacity-100" : "opacity-35"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.mappingChip}`}>
                        {row.model} · {row.version}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {row.scenarios.map((scene) => (
                        <span key={scene} className={`rounded-full border px-2.5 py-1 text-xs font-medium ${style.mappingPill}`}>
                          {scene}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 space-y-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-600">
                      <p><span className="font-semibold text-slate-700">触发：</span>{row.trigger}</p>
                      <p><span className="font-semibold text-slate-700">输出：</span>{row.output}</p>
                      <p><span className="font-semibold text-slate-700">验收：</span>{row.metric}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)] lg:col-span-7">
            <h4 className="text-lg font-semibold text-[#111827]">两阶段推进要点</h4>
            <div className="mt-4 space-y-3">
              {phaseActionData.keyResults.map((item, idx) => {
                const Icon = iconMap[item.icon] ?? Sparkles;
                return (
                  <div key={item.title} className="rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                          idx === 0 ? "bg-emerald-50 text-emerald-600" : idx === 1 ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-semibold text-[#111827]">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#4b5563]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="report-panel p-4 md:p-5">
            <p className="text-base font-semibold text-[#111827]">{phaseActionData.promotion.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-[#4b5563]">
              {phaseActionData.promotion.items.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="report-panel p-4 md:p-5">
            <p className="text-base font-semibold text-[#111827]">{phaseActionData.deepen.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-[#4b5563]">
              {phaseActionData.deepen.items.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </SlideWrap>
  );
}

function SlideNextStepTaskBoard() {
  const boardData = {
    header: {
      title: "两阶段推进计划",
      subtitle: "以责任人牵引推进节奏：先推广落地，再深化提效，最终形成扩展建议",
    },
    milestones: ["推广期 M1-M3：三场景上线并完成试用", "深化期 M4-M6：准确率与联动能力提升", "阶段收口：形成下一阶段扩展建议"],
    tracks: [
      {
        id: "scenario",
        title: "场景推进与效果验证",
        theme: "red",
        tasks: [
          {
            name: "推广期完成三场景上线",
            desc: "统一入口与统一中枢发布问药、问数、问策版本，确保链路可用、可追踪。",
            tag: "第一优先级",
            owner: "信息化管理部 + 业务条线",
            deadline: "M1-M2",
            metric: "三场景全链路可用率 >= 99%",
          },
          {
            name: "推广期组织试用与验收",
            desc: "围绕核心业务部门和管理层组织约100人试用，覆盖高频问法与核心流程。",
            tag: "重点验证",
            owner: "业务部门 + 项目PMO",
            deadline: "M2-M3",
            metric: "试用人数 >= 100，稳定支撑约10并发",
          },
          {
            name: "深化期专项提效",
            desc: "围绕低分问题、跨单位联动和建议可执行性开展专项优化，形成量化提升结果。",
            tag: "决策门槛",
            owner: "项目评审组 + 业务评委",
            deadline: "M4-M6",
            metric: "关键问法准确率达标后再进入扩展阶段",
          },
        ],
      },
      {
        id: "infrastructure",
        title: "预算执行与底座治理",
        theme: "amber",
        tasks: [
          {
            name: "推荐方案预算落地",
            desc: "按中台授权+技术支持50万、Token池约0.8万/年、应用服务器0元完成投入与验收。",
            tag: "预算执行",
            owner: "信息化管理部 + 财务",
            deadline: "M1",
            metric: "预算执行偏差 <= 5%",
          },
          {
            name: "推广期稳定性保障",
            desc: "统一监控、权限和告警，保障三场景试用期稳定运行。",
            tag: "容量保障",
            owner: "信息化管理部",
            deadline: "M1-M3",
            metric: "10并发持续稳定运行",
          },
          {
            name: "深化期知识与数据联动优化",
            desc: "围绕低分问题与跨单位联动需求，补齐知识与规则，沉淀扩展建议。",
            tag: "持续迭代",
            owner: "信息化管理部 + 业务专家",
            deadline: "M4-M6",
            metric: "低分问题回收闭环率 >= 90%",
          },
        ],
      },
    ],
  } as const;

  const trackStyles: Record<string, { accent: string; line: string; tag: string; hover: string; icon: LucideIcon }> = {
    red: {
      accent: "text-rose-600",
      line: "from-rose-500/60 to-transparent",
      tag: "bg-red-50 text-red-600 border-red-100",
      hover: "hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_14px_28px_rgba(225,29,72,0.14)]",
      icon: Target,
    },
    amber: {
      accent: "text-amber-700",
      line: "from-amber-500/60 to-transparent",
      tag: "bg-amber-50 text-amber-700 border-amber-100",
      hover: "hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_14px_28px_rgba(217,119,6,0.16)]",
      icon: Server,
    },
  };
  const executionGuardrails = {
    title: "实施保障与责任协同",
    subtitle: "在责任人分工基础上，明确方法、协同与治理底线，保障两阶段推进稳定落地",
    method: [
      "低代码先行验证：先跑通流程，再做稳定性优化",
      "复杂接口专项攻坚：由工程团队负责高复杂度集成",
      "周节奏迭代：需求-验证-复盘-迭代闭环推进",
    ],
    triangle: [
      "集团信息化部（主导）：统筹架构与推进节奏",
      "业务牵头部门（牵头）：定义场景并验收效果",
      "技术支持团队（配合）：私有化部署与调优",
    ],
    governance: ["统一 API 接入标准", "零信任数据权限管控", "数据清洗与标注规范"],
  } as const;

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-[#111827] md:text-4xl">{boardData.header.title}</h3>
          <p className="mt-2 text-sm tracking-[0.08em] text-[#6b7280]">{boardData.header.subtitle}</p>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {boardData.milestones.map((item) => (
            <div key={item} className="rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-medium text-[#374151]">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {boardData.tracks.map((track, idx) => {
            const style = trackStyles[track.theme];
            const Icon = style.icon;
            return (
              <motion.section
                key={track.id}
                initial={{ opacity: 0, x: idx === 0 ? -44 : 44 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + idx * 0.12 }}
                className="rounded-2xl border border-[#e5e7eb] bg-white/80 p-4 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon className={style.accent} size={18} />
                  <h4 className="text-lg font-semibold text-[#111827]">{track.title}</h4>
                </div>
                <div className={`mt-3 h-px w-full bg-gradient-to-r ${style.line}`} />

                <div className="mt-4 space-y-3">
                  {track.tasks.map((task) => (
                    <article
                      key={task.name}
                      className={`rounded-xl border border-[#eef2f7] bg-white p-4 shadow-sm transition-all duration-300 ${style.hover}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h5 className="text-base font-semibold text-[#111827]">{task.name}</h5>
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${style.tag}`}>{task.tag}</span>
                      </div>
                      <div className="mt-2 flex items-start gap-2">
                        <CheckCircle size={14} className={style.accent} />
                        <p className="text-sm leading-6 text-[#6b7280]">{task.desc}</p>
                      </div>
                      <div className="mt-3 grid gap-2 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2 text-xs text-[#4b5563]">
                        <p><span className="font-semibold text-[#374151]">责任人：</span>{task.owner}</p>
                        <p><span className="font-semibold text-[#374151]">时间节点：</span>{task.deadline}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        <section className="mt-6 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-lg font-semibold text-[#111827]">{executionGuardrails.title}</h4>
              <p className="mt-1 text-xs text-[#64748b]">{executionGuardrails.subtitle}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <article className="rounded-xl border border-sky-200 bg-sky-50/40 p-3">
              <p className="text-sm font-semibold text-sky-700">敏捷开发方法</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-700">
                {executionGuardrails.method.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-xl border border-violet-200 bg-violet-50/40 p-3">
              <p className="text-sm font-semibold text-violet-700">协同铁三角（责任到人）</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-700">
                {executionGuardrails.triangle.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
              <p className="text-sm font-semibold text-emerald-700">数据治理底线</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-700">
                {executionGuardrails.governance.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </div>
    </SlideWrap>
  );
}
function SlideIcebergWhy() {
  const { title, subtitle } = icebergSlideHeader;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fcfcfd] px-2 py-4 md:px-4 md:py-5">
      <header className="iceberg-fade-in-up mx-auto max-w-4xl text-center" style={{ animationDelay: "0.05s" }}>
        <h2 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl lg:text-[2.5rem]">{title}</h2>
        <p className="mt-3 text-sm font-medium tracking-[0.18em] text-[#6b7280] md:text-base">{subtitle}</p>
      </header>

      <div className="iceberg-fade-in-up mx-auto mt-6 w-full max-w-6xl flex-1 md:mt-8" style={{ animationDelay: "0.12s" }}>
        <IcebergFlatIllustration />
      </div>
    </div>
  );
}

function SlideGovernanceBoundary() {
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const boundaryData = {
    header: {
      title: "集团搭平台，业务做场景，分工要一次说清",
      subtitle: "统一平台和标准接口，业务专注场景价值，避免重复造轮子",
    },
    architecture: [
      {
        id: "layer4",
        level: "场景应用层",
        responsibility: "鼓励业务探索",
        desc: "充分发挥业务侧创新力，结合实际痛点自由探索",
        colorTheme: "red",
        items: ["问药", "问数", "问策"],
      },
      {
        id: "layer3",
        level: "数据层",
        responsibility: "集团提供容器，业务各自维护",
        desc: "集团提供统一知识库工具，各单位独立维护专属文件数据，条件具备后融合互通",
        colorTheme: "purple",
        items: ["统一知识库容器 (RAG)", "重点业务系统数据直连", "股份公司成药数据", "跨域数据融合引擎"],
      },
      {
        id: "boundary",
        isBoundary: true,
        label: "集团统一管控与能力赋能分界线",
      },
      {
        id: "layer2",
        level: "大模型与中台层",
        responsibility: "集团统筹建设",
        desc: "汇聚前沿 AI 能力，屏蔽底层复杂度，向全集团提供标准接口",
        colorTheme: "blue",
        items: ["AI PaaS 弹性调度平台", "外部市场数据流接入，联网搜索", "DeepSeek / Qwen 等开源模型群", "OCR / 意图识别等原子能力"],
      },
      {
        id: "layer1",
        level: "算力与安全层",
        responsibility: "集团统筹建设",
        desc: "筑牢物理基石，确保核心数据不出域及算力资源集约化",
        colorTheme: "slate",
        items: ["本地化算力资源池", "异构算力统一纳管", "集团网络与数据安全底座"],
      },
    ],
    keySplitSummary: {
      left: {
        title: "集团信息化管理部统筹",
        points: ["统一服务门户：AI中台 / 资源调度平台", "统一技术底座：大模型 / 认知中台 / 开箱即用的编排流", "统一算力"],
      },
      center: "标准 API 与容器切分界面",
      right: {
        title: "业务实施（数据与场景）",
        points: ["各场景负责人员维护", "SaaS 场景研发：基于集团底座孵化智能体场景", "边缘存量纳管：业务侧存量集群按需接入统一体系"],
      },
    },
  } as const;

  const stackOrder = [
    boundaryData.architecture.find((item) => item.id === "layer1"),
    boundaryData.architecture.find((item) => item.id === "layer2"),
    boundaryData.architecture.find((item) => item.id === "boundary"),
    boundaryData.architecture.find((item) => item.id === "layer3"),
    boundaryData.architecture.find((item) => item.id === "layer4"),
  ].filter(Boolean);

  const themeStyle: Record<string, { shell: string; side: string; pill: string; icon: LucideIcon }> = {
    slate: {
      shell: "border-slate-300 bg-gradient-to-r from-slate-100/85 via-slate-50 to-white shadow-[0_14px_30px_rgba(15,23,42,0.12)]",
      side: "bg-slate-800 text-white",
      pill: "border-slate-300 bg-white text-slate-700",
      icon: Shield,
    },
    blue: {
      shell: "border-blue-300 bg-gradient-to-r from-blue-100/85 via-blue-50 to-white shadow-[0_16px_34px_rgba(30,64,175,0.15)]",
      side: "bg-blue-700 text-white",
      pill: "border-blue-200 bg-white text-blue-800",
      icon: Cpu,
    },
    purple: {
      shell: "border-purple-300 bg-gradient-to-r from-purple-100/75 via-fuchsia-50/60 to-white shadow-[0_12px_28px_rgba(126,34,206,0.12)]",
      side: "bg-purple-600 text-white",
      pill: "border-purple-200 bg-white text-purple-700",
      icon: Database,
    },
    red: {
      shell: "border-rose-200 bg-white shadow-[0_10px_24px_rgba(225,29,72,0.08)]",
      side: "bg-rose-500 text-white",
      pill: "border-rose-200 bg-rose-50/40 text-rose-700",
      icon: Sparkles,
    },
  };

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto">
        <div className="border-b border-[#e5e7eb] pb-4">
          <h3 className="text-center text-2xl font-bold text-[#111827] md:text-3xl">{boundaryData.header.title}</h3>
        </div>

        <section className="mt-4 grid gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
            <p className="text-base font-semibold text-blue-700">{boundaryData.keySplitSummary.left.title}</p>
            <div className="mt-2 space-y-1.5">
              {boundaryData.keySplitSummary.left.points.map((point) => (
                <p key={point} className="text-sm leading-6 text-[#374151]">
                  - {point}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <span className="rounded-full bg-gradient-to-r from-blue-600 via-violet-500 to-rose-500 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_14px_rgba(139,92,246,0.35)]">
              {boundaryData.keySplitSummary.center}
            </span>
          </div>

          <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
            <p className="text-base font-semibold text-rose-700">{boundaryData.keySplitSummary.right.title}</p>
            <div className="mt-2 space-y-1.5">
              {boundaryData.keySplitSummary.right.points.map((point) => (
                <p key={point} className="text-sm leading-6 text-[#374151]">
                  - {point}
                </p>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-5 space-y-4">
          {stackOrder.map((node, idx) => {
            if (!node) return null;
            if ("isBoundary" in node && node.isBoundary) {
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.12 }}
                  className="relative py-2"
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-[#fda4af] bg-gradient-to-r from-blue-600 to-rose-500 px-4 py-1 text-xs font-semibold tracking-[0.08em] text-white shadow-[0_0_16px_rgba(59,130,246,0.35)]">
                      管控与赋能分界线
                    </span>
                  </div>
                </motion.div>
              );
            }

            if (!("colorTheme" in node)) return null;
            const style = themeStyle[node.colorTheme];
            const Icon = style.icon;
            const focused = activeLayerId === null || activeLayerId === node.id;
            const isBaseLayer = node.id === "layer1" || node.id === "layer2";

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: focused ? 1 : 0.4, y: 0, scale: activeLayerId === node.id ? 1.02 : 1 }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                onHoverStart={() => setActiveLayerId(node.id)}
                onHoverEnd={() => setActiveLayerId(null)}
                className={[
                  "grid gap-3 rounded-2xl border p-5 md:grid-cols-[240px_1fr_1.15fr] md:items-center",
                  style.shell,
                  isBaseLayer ? "ring-1 ring-blue-200/70" : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "rounded-xl px-4 py-3 transition-all",
                    style.side,
                    activeLayerId === node.id ? "shadow-[0_0_18px_rgba(255,255,255,0.45)]" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 text-base font-semibold">
                    <Icon size={16} />
                    <span>{node.level}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium tracking-[0.04em] opacity-95">{node.responsibility}</p>
                </div>

                <div className="rounded-xl border border-white/70 bg-white/80 px-4 py-3">
                  <p className="text-lg font-semibold text-[#111827]">{node.level}</p>
                  <p className="mt-2 text-base leading-7 text-[#4b5563]">{node.desc}</p>
                </div>

                <div className={node.id === "layer4" ? "grid grid-cols-2 gap-2 lg:grid-cols-3" : "grid grid-cols-2 gap-2"}>
                  {node.items.map((item) => (
                    <div
                      key={item}
                      className={[
                        "rounded-full border px-3 py-2 text-center text-sm font-medium",
                        style.pill,
                        node.id === "layer4" ? "shadow-[0_6px_18px_rgba(225,29,72,0.08)]" : "",
                      ].join(" ")}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </SlideWrap>
  );
}

function SlideDivisionAndInterfaceSplit() {
  const [boundaryHover, setBoundaryHover] = useState(false);
  const cardData = {
    header: {
      title: "01 | 规划设计的分工与界面切分",
      subtitle: "依托“云网一体”顶层设计，明确集团筑基与业务创新的权责边界",
    },
    layout: {
      leftPanel: {
        role: "集团信息化管理部统筹",
        motto: "资源集约化运营，保障业务稳定运行",
        layers: [
          { name: "统一服务门户", desc: "AI算力平台 / 资源调度平台", icon: LayoutDashboard },
          { name: "统一技术底座", desc: "同仁堂大模型 / 深层认知中台 / 开箱即用的编排流", icon: BrainCircuit },
          { name: "统一资源调度与安全", desc: "信创AI算力池 / 数据全生命周期安全管控", icon: ShieldCheck },
        ],
      },
      boundary: {
        label: "标准 API 与容器切分界面",
      },
      rightPanel: {
        role: "业务实施（数据与场景）",
        motto: "发挥业务创新能力，沉淀高质量私域资产",
        subsidiaries: ["股份公司", "科技公司", "商业公司", "医养公司", "研究院", "生产基地"],
        actions: [
          { name: "管理私域数据", desc: "各单位基于业务维护自身专属文件与知识库", icon: Database },
          { name: "SaaS 场景研发", desc: "基于集团底座孵化各类智能体（如：培训、问药、安防）", icon: Blocks },
          { name: "边缘存量纳管", desc: "业务侧边缘计算与存量集群按需接入", icon: Network },
        ],
      },
    },
  } as const;

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto">
        <div className="border-b border-[#e5e7eb] pb-4">
          <h3 className="text-2xl font-bold text-[#111827] md:text-3xl">{cardData.header.title}</h3>
          <p className="mt-2 text-sm tracking-[0.06em] text-[#6b7280]">{cardData.header.subtitle}</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <motion.section
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl border border-blue-100 bg-blue-50/40 p-4 backdrop-blur ${boundaryHover ? "ring-1 ring-cyan-300/70" : ""}`}
          >
            <h4 className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-lg font-bold text-transparent">
              {cardData.layout.leftPanel.role}
            </h4>
            <p className="mt-1 text-xs text-[#4b5563]">{cardData.layout.leftPanel.motto}</p>
            <div className="mt-4 space-y-3">
              {cardData.layout.leftPanel.layers.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="rounded-xl border border-blue-100 bg-white p-3 shadow-sm transition-all duration-300 hover:translate-x-0.5 hover:shadow-[0_0_20px_rgba(37,99,235,0.18)]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Icon size={16} />
                      </span>
                      <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
                    </div>
                    <p className="mt-2 text-xs text-[#6b7280]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, scaleY: 0.6 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="relative mx-auto hidden w-16 md:flex md:flex-col md:items-center md:justify-center"
          >
            <div className={`h-full w-px border-l border-dashed border-violet-400 ${boundaryHover ? "animate-pulse" : ""}`} />
            <button
              type="button"
              onMouseEnter={() => setBoundaryHover(true)}
              onMouseLeave={() => setBoundaryHover(false)}
              className="absolute rounded-full bg-gradient-to-r from-blue-600 via-violet-500 to-rose-500 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(139,92,246,0.4)]"
            >
              {cardData.layout.boundary.label}
            </button>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className={`rounded-2xl border border-rose-100 bg-rose-50/40 p-4 backdrop-blur ${boundaryHover ? "ring-1 ring-rose-300/70" : ""}`}
          >
            <h4 className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-lg font-bold text-transparent">
              {cardData.layout.rightPanel.role}
            </h4>
            <p className="mt-1 text-xs text-[#4b5563]">{cardData.layout.rightPanel.motto}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {cardData.layout.rightPanel.subsidiaries.map((name) => (
                <span key={name} className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-xs text-rose-700">
                  {name}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {cardData.layout.rightPanel.actions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: 0.42 + idx * 0.1 }}
                    className="rounded-xl border border-rose-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                        <Icon size={16} />
                      </span>
                      <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
                    </div>
                    <p className="mt-2 text-xs text-[#6b7280]">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </SlideWrap>
  );
}

function SlidePainBridgeBoard() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const iconMap: Record<string, LucideIcon> = {
    ServerOff,
    Unplug,
    Network,
    LayoutDashboard,
    BookX,
    Target,
  };
  const icebergKeyInsights = [
    "中医药知识触达慢，经验复用效率低",
    "二级单位数据联动弱，跨系统分析成本高",
    "系统数据库智能分析能力不足，洞察产出慢",
  ] as const;

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[#fcfcfd]">
        <header className="text-center">
          <h3 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">
            {painBridgeData.header.title}
            <span className="ml-2 text-red-700 [text-shadow:0_1px_8px_rgba(185,28,28,0.22)]">{painBridgeData.header.highlight}</span>
          </h3>
          <p className="mx-auto mt-3 max-w-4xl text-sm text-[#6b7280] md:text-base">{painBridgeData.header.subtitle}</p>
        </header>

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {painBridgeData.symptoms.map((item) => {
            const Icon = iconMap[item.icon] ?? Sparkles;
            const active = activeId === item.id;
            return (
              <motion.article
                key={item.id}
                onHoverStart={() => setActiveId(item.id)}
                onHoverEnd={() => setActiveId(null)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`rounded-2xl border bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-colors ${active ? "border-red-200" : "border-[#e5e7eb]"}`}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    animate={{ scale: active ? 1.07 : 1, rotate: active ? -8 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600"
                  >
                    <Icon size={18} />
                  </motion.span>
                  <h4 className="text-lg font-semibold text-[#111827]">{item.title}</h4>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4b5563]">
                  <span className="font-semibold text-[#9f1239]">表现：</span>
                  {item.desc}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {painBridgeData.rootCauses.map((item) => {
            const Icon = iconMap[item.icon] ?? Sparkles;
            const active = activeId === item.id;
            return (
              <motion.article
                key={item.id}
                onHoverStart={() => setActiveId(item.id)}
                onHoverEnd={() => setActiveId(null)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${active ? "border-red-200 bg-rose-50/40" : "border-[#edf0f3] bg-slate-50/80"}`}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    animate={{ scale: active ? 1.07 : 1, rotate: active ? -8 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white"
                  >
                    <Icon size={18} />
                  </motion.span>
                  <h4 className="text-lg font-semibold text-[#111827]">{item.title}</h4>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4b5563]">{item.desc}</p>
              </motion.article>
            );
          })}
        </div>

        <section className="mt-6 rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h4 className="text-xl font-semibold text-[#111827]">核心问题归纳</h4>
            </div>
            <span className="rounded-full border border-[#fecaca] bg-[#fff1f2] px-3 py-1 text-xs font-semibold text-[#b91c1c]">
              关键洞察
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-3">
              <div className="flex min-h-[280px] items-center justify-center md:min-h-[320px]">
                <IcebergFlatIllustration />
              </div>
            </div>
            <div className="space-y-2">
              {icebergKeyInsights.map((item) => (
                <div key={item} className="rounded-xl border border-[#e5e7eb] bg-[#fcfcfd] p-3 text-sm leading-6 text-[#374151]">
                  <span className="font-semibold text-[#9f1239]">- </span>
                  {item}
                </div>
              ))}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-sm text-emerald-800">
                结论：先以推荐方案约50.8万跑通三场景试用，达标后再评估是否进入155万私有化重投入。
              </div>
            </div>
          </div>
        </section>
      </div>
    </SlideWrap>
  );
}

function SlideBuildMethodAndOrg() {
  const [hubActive, setHubActive] = useState(false);
  const iconMap: Record<string, LucideIcon> = {
    Zap,
    Users,
    Waypoints,
    ShieldCheck,
    DatabaseZap,
  };

  const leftBorderGlow = hubActive ? "border-red-200 shadow-[0_0_0_2px_rgba(244,63,94,0.18),0_14px_28px_rgba(15,23,42,0.08)]" : "border-[#e5e7eb]";

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[#fcfcfd]">
        <header className="text-center">
          <h3 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">{buildMethodData.header.title}</h3>
          <p className="mt-2 text-sm text-[#6b7280] md:text-base">{buildMethodData.header.subtitle}</p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <section className="rounded-3xl bg-gray-50/50 p-5 md:p-6">
            <h4 className="text-lg font-semibold text-[#111827]">{buildMethodData.columns.left.title}</h4>
            <div className="mt-4 space-y-3">
              <article className={`rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${leftBorderGlow}`}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <Zap size={18} />
                  </span>
                  <p className="text-base font-semibold text-[#111827]">{buildMethodData.columns.left.items[0].title}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4b5563]">{buildMethodData.columns.left.items[0].desc}</p>
              </article>

              <article className={`rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${leftBorderGlow}`}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Users size={18} />
                  </span>
                  <p className="text-base font-semibold text-[#111827]">{buildMethodData.columns.left.items[1].title}</p>
                </div>
                <div className="mt-3 space-y-2">
                  {buildMethodData.columns.left.items[1].details.map((row, idx) => (
                    <div key={row.label} className="flex items-start gap-2 text-sm text-[#4b5563]">
                      <span
                        className={`mt-1.5 h-2 w-2 rounded-full ${
                          idx === 0 ? "bg-emerald-500" : idx === 1 ? "bg-amber-500" : "bg-rose-500"
                        }`}
                      />
                      <p>
                        <span className="font-semibold text-[#111827]">{row.label}：</span>
                        {row.text}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="rounded-3xl bg-gray-50/50 p-5 md:p-6">
            <h4 className="text-lg font-semibold text-[#111827]">{buildMethodData.columns.center.title}</h4>
            <div className="mt-4 flex flex-col items-center">
              <div className="w-full max-w-[270px] rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-emerald-700">{buildMethodData.columns.center.nodes[0].title}</p>
                <p className="mt-1 text-xs text-emerald-700/80">{buildMethodData.columns.center.nodes[0].desc}</p>
              </div>
              <div className="my-2 h-8 border-l border-dashed border-[#d1d5db]" />

              <button
                type="button"
                onMouseEnter={() => setHubActive(true)}
                onMouseLeave={() => setHubActive(false)}
                className="relative inline-flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-rose-700 text-center text-white shadow-lg shadow-red-500/30 outline-none"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full animate-pulse border border-red-300/70" />
                <span className="relative px-5">
                  <p className="text-base font-bold">{buildMethodData.columns.center.nodes[1].title}</p>
                  <p className="mt-1 text-xs text-red-50">{buildMethodData.columns.center.nodes[1].desc}</p>
                </span>
              </button>

              <div className="my-2 h-8 border-l border-dashed border-[#d1d5db]" />
              <div className="grid w-full max-w-[320px] gap-3 md:grid-cols-2">
                {buildMethodData.columns.center.nodes.slice(2).map((node) => (
                  <div key={node.id} className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-center">
                    <p className="text-sm font-semibold text-teal-700">{node.title}</p>
                    <p className="mt-1 text-xs text-teal-700/80">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-gray-50/50 p-5 md:p-6">
            <h4 className="text-lg font-semibold text-[#111827]">{buildMethodData.columns.right.title}</h4>
            <div className="mt-4 space-y-3">
              {buildMethodData.columns.right.items.map((item) => {
                const Icon = iconMap[item.icon] ?? Sparkles;
                return (
                  <article
                    key={item.id}
                    className={`rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${leftBorderGlow}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                        <Icon size={18} />
                      </span>
                      <p className="text-base font-semibold text-[#111827]">{item.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#4b5563]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </SlideWrap>
  );
}

function SlideLocalModelHybridDeployment() {
  const [hoveredModel, setHoveredModel] = useState<"general" | "professional" | null>(null);
  const iconMap: Record<string, LucideIcon> = {
    Brain,
    Microscope,
    Network,
    ShieldCheck,
    Scale,
    Zap,
    Layers,
  };

  const themeStyles: Record<string, { card: string; chip: string; glow: string; mappingChip: string; mappingPill: string }> = {
    blue: {
      card: "from-red-700 to-rose-800",
      chip: "bg-white/20 text-rose-50",
      glow: "shadow-[0_18px_34px_rgba(185,28,28,0.35)]",
      mappingChip: "bg-rose-100 text-rose-700",
      mappingPill: "border-rose-200 bg-rose-50 text-rose-700",
    },
    emerald: {
      card: "from-emerald-500 to-emerald-700",
      chip: "bg-white/20 text-emerald-50",
      glow: "shadow-[0_18px_34px_rgba(16,185,129,0.35)]",
      mappingChip: "bg-emerald-100 text-emerald-700",
      mappingPill: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    amber: {
      card: "from-amber-500 to-orange-500",
      chip: "bg-white/20 text-amber-50",
      glow: "shadow-[0_18px_34px_rgba(245,158,11,0.3)]",
      mappingChip: "bg-amber-100 text-amber-700",
      mappingPill: "border-amber-200 bg-amber-50 text-amber-700",
    },
    slate: {
      card: "from-slate-800 to-gray-900",
      chip: "bg-white/20 text-slate-100",
      glow: "shadow-[0_18px_34px_rgba(15,23,42,0.35)]",
      mappingChip: "bg-slate-200 text-slate-700",
      mappingPill: "border-slate-300 bg-slate-100 text-slate-700",
    },
  };

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[#fcfcfd]">
        <header className="text-center">
          <h3 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">{localModelHybridData.header.title}</h3>
          <p className="mx-auto mt-2 max-w-4xl text-sm text-[#6b7280] md:text-base">{localModelHybridData.header.subtitle}</p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {localModelHybridData.models.map((model, idx) => {
            const Icon = iconMap[model.icon] ?? Sparkles;
            const style = themeStyles[model.theme];
            return (
              <motion.article
                key={model.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: idx * 0.1 }}
                onHoverStart={() =>
                  setHoveredModel(model.id === "general" || model.id === "professional" ? (model.id as "general" | "professional") : null)
                }
                onHoverEnd={() => setHoveredModel(null)}
                className={`rounded-3xl bg-gradient-to-br p-5 text-white ${style.card} ${style.glow}`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                  <Icon className="h-5 w-5" />
                  <span>{model.type}</span>
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight">{model.name}</p>
                <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style.chip}`}>{model.version}</span>
                <ul className="mt-4 space-y-2 text-sm">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-white/95">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.45 }} className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[inset_0_0_0_1px_rgba(226,232,240,0.4)] lg:col-span-5">
            <h4 className="text-lg font-semibold text-[#111827]">{localModelHybridData.bottomSection.mapping.title}</h4>
            <div className="mt-4 space-y-3">
              {localModelHybridData.bottomSection.mapping.items.map((row) => {
                const style = themeStyles[row.theme];
                const focused = !hoveredModel || hoveredModel === row.modelId;
                return (
                  <div key={row.model} className={`rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] p-3 transition-all ${focused ? "opacity-100" : "opacity-35"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.mappingChip}`}>
                        {row.model} · {row.version}
                      </span>
                      <span className="text-xs text-[#9ca3af]">··· ··· ···</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {row.scenarios.map((scene) => (
                        <span key={scene} className={`rounded-full border px-2.5 py-1 text-xs font-medium ${style.mappingPill}`}>
                          {scene}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)] lg:col-span-7">
            <h4 className="text-lg font-semibold text-[#111827]">{localModelHybridData.bottomSection.advantages.title}</h4>
            <div className="mt-4 space-y-3">
              {localModelHybridData.bottomSection.advantages.items.map((item, idx) => {
                const Icon = iconMap[item.icon] ?? Sparkles;
                return (
                  <div key={item.title} className="rounded-2xl border border-[#e5e7eb] bg-[#fcfcfd] p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                          idx === 0 ? "bg-rose-50 text-rose-600" : idx === 1 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-semibold text-[#111827]">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#4b5563]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </motion.div>

        <div className="mt-6 rounded-2xl border border-[#e5e7eb] bg-slate-50 px-4 py-3 text-sm text-[#334155]">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-slate-600" />
            <span>{localModelHybridData.footer}</span>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

function SlideById({
  slide,
  onOpenKnowledgeMatrix,
  showFullVersion,
}: {
  slide: LayoutSlide;
  onOpenKnowledgeMatrix?: (item: ExecutiveScenarioItem) => void;
  showFullVersion?: boolean;
}) {
  if (slide.slide_id === 1400) return <AgentOneMedicineDeepDiveSlide showFullVersion={showFullVersion} />;
  if (slide.slide_id === 1401) return <AgentTwoDataDeepDiveSlide showFullVersion={showFullVersion} />;
  if (slide.slide_id === 1402) return <AgentThreeStrategyDeepDiveSlide showFullVersion={showFullVersion} />;
  if (slide.slide_id === 1403) return <AIArchitecturePanoramaSlide />;
  if (slide.slide_id === 1404) return <LowCodeAgileAndCollabSlide />;
  if (slide.slide_id === 1405) return <LocalComputeCenterPhysicalArchSlide />;
  if (slide.slide_id === 1406) return <OverallBudgetAndCostPlanSlide />;
  if (slide.slide_id === 1416) return <FeishuVsDifyStrategySlide />;
  if (slide.slide_id === 1517) return <TokenRouteSecuritySlide />;
  if (slide.slide_id === 1407) return <ImplementationRoadmapAndRoiSlide />;
  if (slide.slide_id === 1) return <SlideCover />;
  if (slide.slide_id === 2) return <SlideCatalog />;
  if (slide.slide_id === 2001) return <SlideChapter index="01" title="现状盘点分析" desc="章节目标：形成场景现状、问题与治理边界的统一认知。" />;
  if (slide.slide_id === 2003) return <SlideChapter index="02" title="专题深化与建设方案" desc="章节目标：围绕问药、问数、问策形成可执行方案与验收指标。" />;
  if (slide.slide_id === 401) return <SlideDivisionAndInterfaceSplit />;
  if (slide.slide_id === 5) return <SlideFiveExecutive onOpenKnowledgeMatrix={onOpenKnowledgeMatrix} />;
  if (slide.slide_id === 701) return <SlidePainBridgeBoard />;
  if (slide.slide_id === 702) return <SlideIcebergWhy />;
  if (slide.slide_id === 703) return <AIVisionSlide />;
  if (slide.slide_id === 704) return <SlideGovernanceBoundary />;
  if (slide.slide_id === 1501) return <DifyThreeScenariosDemoSlide />;
  if (slide.slide_id === 8) return <SlideOpenClawVibeFusion />;
  if (slide.slide_id === 9) return <div />;
  if (slide.slide_id === 8001) return <SlideOpenClawStory />;
  if (slide.slide_id === 9001) return <SlideVibeCodingProject />;
  if (slide.slide_id === 10) return <SlideMarketingBadgePanorama />;
  if (slide.slide_id === 1099) return <SlideLocalComputeInvestmentPlan />;
  if (slide.slide_id === 1100) return <SlideNextStepTaskBoard />;
  if (slide.slide_id === 1101) return <SlideComputeFoundationDashboard />;
  if (slide.slide_id === 12) return <SlideDistillationPanorama />;
  if (slide.slide_id === 1298) return <SlideLocalModelHybridDeployment />;
  if (slide.slide_id === 13) return <SlideAIBlueprint />;
  if (slide.slide_id === 1299) return <SlideBuildMethodAndOrg />;
  if (slide.slide_id === 1301) return <AIRoadmapSlide />;
  if (slide.slide_id === 1399) return <ThankYouSlide />;
  return <SlideWrap><div /></SlideWrap>;
}

const subscribeNoop = () => () => {};
const snapshotTrue = () => true;
const snapshotFalse = () => false;

/** 与外壳同底色，去掉内边距让整页内容贴齐单层大卡片 */
const slideShellBleedIds = new Set([703, 704, 1301, 1399]);
const slideShellWhiteIds = new Set([13]);

export default function Home() {
  const [data, setData] = useState<LayoutPayload>(defaultLayoutData);
  const [activeScenario, setActiveScenario] = useState<ExecutiveScenarioItem | null>(null);
  const [showFullVersion, setShowFullVersion] = useState(false);
  const strategicSliderRef = useRef<HTMLDivElement | null>(null);
  const strategicDragRef = useRef<{ active: boolean; startX: number; startScrollLeft: number }>({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [isStrategicDragging, setIsStrategicDragging] = useState(false);
  const [strategicPage, setStrategicPage] = useState(0);
  const isBrowser = useSyncExternalStore(subscribeNoop, snapshotTrue, snapshotFalse);
  const version1OnlySlideIds = new Set([8001]);
  const version2OnlySlideIds = new Set([8, 1405]);
  const emptyScenarioDraft: ScenarioDraft = {
    background: "",
    strengths: "",
    weaknesses: "",
    opportunities: "",
    risks: "",
    matrixNotes: "",
  };
  const scenarioDraftTemplates: Record<number, ScenarioDraft> = {
    1: {
      background: "已搭建初步 Demo（牛黄清心丸、大山楂丸），当前尚未完成业务论证。",
      strengths: "可一键完成初步检验；可快速形成标准化报告模板。",
      weaknesses: "图像识别能力依赖高；内存需求较大（约 200G）；识别精度仍需持续提升。",
      opportunities: "若识别稳定，可沉淀为质检与研发通用能力；可扩展到更多品类与工艺环节。",
      risks: "在未充分论证前推广可能出现误判风险；高资源消耗会带来部署和运维成本压力。",
      matrixNotes: "图像识别；一键检验；报告模板；人工复核；历史样本对比；阈值告警。",
    },
    2: {
      background: "以标准SOP动作实时监测预警为目标，优先从重点产线开展视频动作识别试点。",
      strengths: "主流方案成熟；对大模型依赖低；可快速形成“识别-告警-处置”闭环。",
      weaknesses: "受现场光照和遮挡影响较大；前期需完成SOP标签标准化与样本校准。",
      opportunities: "可复制到多车间场景；可接入集团中台形成统一安全看板和事件复盘机制。",
      risks: "若网络与摄像头稳定性不足会影响连续识别；若处置机制不联动则预警价值会打折。",
      matrixNotes: "多路视频接入；SOP动作识别；违规行为检测；告警分级；联动工单；事件回放。",
    },
    4: {
      background: "研究院已完成实机部署，同仁堂品种融合信息库 AI 智能助手可稳定运行，已支持问答、文档解析与结构化结果输出。",
      strengths: "实机效果可展示；知识问答与表格输出能力已跑通；能直接服务研发资料检索与归纳。",
      weaknesses: "跨系统数据联动不足；自动结论仍需人工复核；规模化口径治理机制待完善。",
      opportunities: "可打通问药药品数据与问数经营数据；可扩展到药材研究与说明书生成；可沉淀研究院标准知识资产。",
      risks: "数据更新不及时会影响回答质量；缺少统一质控会造成口径不一致；若不进入业务流程则难形成可量化收益。",
      matrixNotes: "实机问答；文档上传解析；结构化表格输出；知识资产沉淀；人工复核质控；与问药问数联动。",
    },
  };
  const [scenarioDrafts, setScenarioDrafts] = useState<Record<number, ScenarioDraft>>(scenarioDraftTemplates);

  const handleOpenScenarioDetail = (item: ExecutiveScenarioItem) => {
    setActiveScenario(item);
    setScenarioDrafts((prev) =>
      prev[item.id]
        ? prev
        : {
            ...prev,
            [item.id]: scenarioDraftTemplates[item.id] ?? emptyScenarioDraft,
          },
    );
  };

  useEffect(() => {
    const controller = new AbortController();
    const fallback: LayoutPayload = defaultLayoutData;

    const timer = window.setTimeout(() => {
      controller.abort();
      setData(fallback);
    }, 6000);

    fetch("/ppt-layout/layout.json", { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<LayoutPayload>) : fallback))
      .then((json) => setData(json))
      .catch(() => setData(fallback))
      .finally(() => window.clearTimeout(timer));

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      const saved = window.localStorage.getItem("ai-report-show-full-version");
      if (saved === "1") queueMicrotask(() => setShowFullVersion(true));
      else if (saved === "0") queueMicrotask(() => setShowFullVersion(false));
    } catch {
      // ignore localStorage read errors in restricted environments
    }
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem("ai-report-show-full-version", showFullVersion ? "1" : "0");
    } catch {
      // ignore localStorage write errors in restricted environments
    }
  }, [showFullVersion, isBrowser]);

  const baseExcludedSlideIds = new Set([4, 6, 9]);
  const removedFromMainlineSlideIds = new Set([3, 7, 10, 11, 1298]);
  const strategicFlowOrder = [1099, 12, 1100, 1101] as const;
  const painVisionOrder = [701, 703] as const;
  const tailSlideIds = [1400, 1401, 1402, 1403, 1501, 1416] as const;
  const endingSlideIds = [1517] as const;
  const slideExpansionRules: Record<number, (slide: LayoutSlide) => LayoutSlide[]> = {
    5: (slide) => [slide, { slide_id: 1101, elements: [] }],
    7: () => [{ slide_id: 701, elements: [] }, { slide_id: 703, elements: [] }, { slide_id: 704, elements: [] }],
    11: () => [{ slide_id: 1099, elements: [] }, { slide_id: 1100, elements: [] }],
    13: (slide) => [slide, { slide_id: 1299, elements: [] }, { slide_id: 1399, elements: [] }],
  };

  const visibleSlidesRaw = data.slides
    .filter((slide) => !baseExcludedSlideIds.has(slide.slide_id))
    .flatMap((slide) => (slideExpansionRules[slide.slide_id] ? slideExpansionRules[slide.slide_id](slide) : [slide]))
    .filter((slide) =>
      showFullVersion ? !version1OnlySlideIds.has(slide.slide_id) : !version2OnlySlideIds.has(slide.slide_id),
    )
    .filter((slide) => !removedFromMainlineSlideIds.has(slide.slide_id));

  const strategicFlowSet = new Set<number>(strategicFlowOrder);
  const strategicFlowSlides = strategicFlowOrder
    .map((id) => visibleSlidesRaw.find((slide) => slide.slide_id === id))
    .filter((slide): slide is LayoutSlide => Boolean(slide));
  const painVisionSlides = painVisionOrder
    .map((id) => visibleSlidesRaw.find((slide) => slide.slide_id === id))
    .filter((slide): slide is LayoutSlide => Boolean(slide));
  const nonStrategicSlides = visibleSlidesRaw.filter((slide) => !strategicFlowSet.has(slide.slide_id));
  const closingSlide = nonStrategicSlides.find((slide) => slide.slide_id === 1399);
  const nonStrategicWithoutClosing = nonStrategicSlides.filter((slide) => slide.slide_id !== 1399);
  const roadmapWithStrategicSlides: LayoutSlide[] = [{ slide_id: 1407, elements: [] }, ...strategicFlowSlides];
  const strategicTotalPages = roadmapWithStrategicSlides.length;

  const goToStrategicPage = (page: number) => {
    const target = strategicSliderRef.current;
    if (!target || strategicTotalPages === 0) return;
    const nextPage = Math.max(0, Math.min(strategicTotalPages - 1, page));
    target.scrollTo({ left: nextPage * target.clientWidth, behavior: "smooth" });
    setStrategicPage(nextPage);
  };

  const handleStrategicPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = strategicSliderRef.current;
    if (!target) return;
    target.focus();
    strategicDragRef.current = {
      active: true,
      startX: e.clientX,
      startScrollLeft: target.scrollLeft,
    };
    setIsStrategicDragging(true);
    target.setPointerCapture(e.pointerId);
  };

  const handleStrategicPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = strategicSliderRef.current;
    if (!target || !strategicDragRef.current.active) return;
    const delta = e.clientX - strategicDragRef.current.startX;
    target.scrollLeft = strategicDragRef.current.startScrollLeft - delta;
  };

  const endStrategicPointerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = strategicSliderRef.current;
    if (!target || !strategicDragRef.current.active) return;
    strategicDragRef.current.active = false;
    setIsStrategicDragging(false);
    if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
  };

  const handleStrategicSliderScroll = () => {
    const target = strategicSliderRef.current;
    if (!target || target.clientWidth === 0) return;
    const page = Math.round(target.scrollLeft / target.clientWidth);
    if (page !== strategicPage) setStrategicPage(page);
  };

  const handleStrategicSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToStrategicPage(strategicPage + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToStrategicPage(strategicPage - 1);
    }
  };

  const renderSlideContent = (slide: LayoutSlide, pageNo: number, totalPages: number) => {
    const shellBleed = slideShellBleedIds.has(slide.slide_id);
    const shellWhite = slideShellWhiteIds.has(slide.slide_id);
    return (
      <div
        className={[
          "relative flex min-h-0 flex-1 flex-col overflow-y-auto [min-height:max(560px,calc(100vh-9.5rem))]",
          shellBleed ? "p-0" : "p-4 md:p-6",
          shellWhite ? "bg-white" : "bg-[#fcfcfd]",
        ].join(" ")}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <SlideById
            slide={slide}
            showFullVersion={showFullVersion}
            onOpenKnowledgeMatrix={handleOpenScenarioDetail}
          />
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full border border-[#e5e7eb] bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#6b7280] shadow-sm md:bottom-4 md:right-4 md:text-xs">
          第 {pageNo} / {totalPages} 页
        </div>
      </div>
    );
  };

  const renderSingleSlideSection = (slide: LayoutSlide, pageNo: number, totalPages: number) => {
    const shellWhite = slideShellWhiteIds.has(slide.slide_id);
    return (
      <section
        key={slide.slide_id}
        data-report-slide={slide.slide_id}
        className={[
          "relative mx-auto mb-5 flex max-w-7xl snap-start flex-col overflow-hidden rounded-[1.6rem] border border-[#e8eaed] shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] md:mb-6",
          "min-h-[calc(100vh-6.5rem)]",
          shellWhite ? "bg-white" : "bg-[#fcfcfd]",
        ].join(" ")}
      >
        <div className="report-corner-logo pointer-events-none absolute right-3 top-3 z-20 h-16 w-16 md:h-20 md:w-20">
          <Image src="/brand/trt-logo.png" alt="" fill unoptimized className="object-contain" aria-hidden />
        </div>
        {renderSlideContent(slide, pageNo, totalPages)}
      </section>
    );
  };

  const renderStrategicFlowSection = (pageIndexById: Map<number, number>, totalPages: number) => {
    if (roadmapWithStrategicSlides.length === 0) return null;
    return (
      <section
        key="strategic-flow-slider"
        className="relative mx-auto mb-5 flex max-w-7xl snap-start flex-col overflow-hidden rounded-[1.6rem] border border-[#e8eaed] bg-[#fcfcfd] shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] md:mb-6 min-h-[calc(100vh-6.5rem)]"
      >
        <div className="report-corner-logo pointer-events-none absolute right-3 top-3 z-20 h-16 w-16 md:h-20 md:w-20">
          <Image src="/brand/trt-logo.png" alt="" fill unoptimized className="object-contain" aria-hidden />
        </div>

        <div
          ref={strategicSliderRef}
          tabIndex={0}
          onPointerDown={handleStrategicPointerDown}
          onPointerMove={handleStrategicPointerMove}
          onPointerUp={endStrategicPointerDrag}
          onPointerCancel={endStrategicPointerDrag}
          onScroll={handleStrategicSliderScroll}
          onKeyDown={handleStrategicSliderKeyDown}
          className={`flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isStrategicDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ touchAction: "pan-x" }}
        >
          {roadmapWithStrategicSlides.map((slide) => {
            return (
              <article key={slide.slide_id} data-report-slide={slide.slide_id} className="flex min-h-0 min-w-full snap-start flex-col overflow-y-auto">
                {renderSlideContent(slide, pageIndexById.get(slide.slide_id) ?? 0, totalPages)}
              </article>
            );
          })}
        </div>
      </section>
    );
  };

  const renderPainVisionSection = (pageIndexById: Map<number, number>, totalPages: number) => {
    if (painVisionSlides.length === 0) return null;
    return (
      <section
        key="pain-vision-slider"
        className="relative mx-auto mb-5 flex max-w-7xl snap-start flex-col overflow-hidden rounded-[1.6rem] border border-[#e8eaed] bg-[#fcfcfd] shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03] md:mb-6 min-h-[calc(100vh-6.5rem)]"
      >
        <div className="report-corner-logo pointer-events-none absolute right-3 top-3 z-20 h-16 w-16 md:h-20 md:w-20">
          <Image src="/brand/trt-logo.png" alt="" fill unoptimized className="object-contain" aria-hidden />
        </div>
        <div
          className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: "pan-x" }}
        >
          {painVisionSlides.map((slide) => (
            <article key={slide.slide_id} data-report-slide={slide.slide_id} className="flex min-h-0 min-w-full snap-start flex-col overflow-y-auto">
              {renderSlideContent(slide, pageIndexById.get(slide.slide_id) ?? 0, totalPages)}
            </article>
          ))}
        </div>
      </section>
    );
  };

  const tailSlides: LayoutSlide[] = tailSlideIds
    .filter((id) => (showFullVersion ? !version1OnlySlideIds.has(id) : !version2OnlySlideIds.has(id)))
    .map((id) => ({ slide_id: id, elements: [] }));
  const endingSlides: LayoutSlide[] = endingSlideIds
    .filter((id) => (showFullVersion ? !version1OnlySlideIds.has(id) : !version2OnlySlideIds.has(id)))
    .map((id) => ({ slide_id: id, elements: [] }));
  const nonStrategicSlideMap = new Map<number, LayoutSlide>(nonStrategicWithoutClosing.map((slide) => [slide.slide_id, slide]));
  const orderedSlides: LayoutSlide[] = [];
  const addOrderedSlide = (slide: LayoutSlide | undefined) => {
    if (slide) orderedSlides.push(slide);
  };
  addOrderedSlide(nonStrategicSlideMap.get(1));
  addOrderedSlide(nonStrategicSlideMap.get(2));
  addOrderedSlide({ slide_id: 2001, elements: [] });
  addOrderedSlide(nonStrategicSlideMap.get(5));
  painVisionSlides.forEach((slide) => addOrderedSlide(slide));
  addOrderedSlide(nonStrategicSlideMap.get(704));
  addOrderedSlide(nonStrategicSlideMap.get(8));
  addOrderedSlide({ slide_id: 2003, elements: [] });
  tailSlides.forEach((slide) => addOrderedSlide(slide));
  roadmapWithStrategicSlides.forEach((slide) => addOrderedSlide(slide));
  endingSlides.forEach((slide) => addOrderedSlide(slide));
  addOrderedSlide(closingSlide);

  const totalPages = orderedSlides.length;
  const pageIndexById = new Map<number, number>(orderedSlides.map((slide, idx) => [slide.slide_id, idx + 1]));

  const renderedSections: React.ReactNode[] = [];
  const pushNonStrategicSlide = (id: number) => {
    const slide = nonStrategicSlideMap.get(id);
    if (slide) {
      renderedSections.push(renderSingleSlideSection(slide, pageIndexById.get(slide.slide_id) ?? 0, totalPages));
    }
  };

  pushNonStrategicSlide(1);
  pushNonStrategicSlide(2);
  renderedSections.push(renderSingleSlideSection({ slide_id: 2001, elements: [] }, pageIndexById.get(2001) ?? 0, totalPages));
  pushNonStrategicSlide(5);
  if (painVisionSlides.length > 0) renderedSections.push(renderPainVisionSection(pageIndexById, totalPages));

  pushNonStrategicSlide(704);
  pushNonStrategicSlide(8);

  renderedSections.push(renderSingleSlideSection({ slide_id: 2003, elements: [] }, pageIndexById.get(2003) ?? 0, totalPages));
  for (let i = 0; i < tailSlides.length; i += 1) {
    renderedSections.push(renderSingleSlideSection(tailSlides[i], pageIndexById.get(tailSlides[i].slide_id) ?? 0, totalPages));
  }
  if (roadmapWithStrategicSlides.length > 0) renderedSections.push(renderStrategicFlowSection(pageIndexById, totalPages));
  for (let i = 0; i < endingSlides.length; i += 1) {
    renderedSections.push(renderSingleSlideSection(endingSlides[i], pageIndexById.get(endingSlides[i].slide_id) ?? 0, totalPages));
  }
  if (closingSlide) renderedSections.push(renderSingleSlideSection(closingSlide, pageIndexById.get(closingSlide.slide_id) ?? 0, totalPages));

  return (
    <main className="report-root min-h-screen bg-[#f5f6f8] text-[#111827]">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-[#fee2e2] blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-5%] h-[34rem] w-[34rem] rounded-full bg-[#e0e7ff] blur-3xl" />
      </div>

      <div className="sticky top-0 z-20 border-b border-[#e8eaed] bg-white/90 px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#fecaca] bg-white shadow-sm md:h-12 md:w-12">
              <Image src="/brand/trt-logo.png" alt="同仁堂" fill unoptimized className="object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-semibold leading-snug tracking-tight text-[#111827] md:text-lg lg:text-xl">
                {REPORT_TITLE_FULL}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={() => setShowFullVersion((prev) => !prev)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors duration-200 md:px-4 md:py-2 md:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                showFullVersion
                  ? "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8] hover:bg-[#dbeafe]"
                  : "border-[#fecaca] bg-[#fff1f2] text-[#b91c1c] hover:bg-rose-50"
              }`}
            >
              {showFullVersion ? "当前：Version2｜可切换Version1" : "当前：Version1｜可切换Version2"}
            </button>
          </div>
        </div>
      </div>

      <div className="report-scroll h-[calc(100vh-4.25rem)] snap-y snap-mandatory overflow-y-auto overscroll-y-contain px-3 py-4 md:px-6 md:py-5">
        {renderedSections}
      </div>

      {isBrowser && activeScenario
        ? createPortal(
            <div
              className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-slate-900/40 px-4 py-8 backdrop-blur-[2px]"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeScenario.title}详情页`}
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveScenario(null);
              }}
            >
              <div
                className="pointer-events-auto h-[min(90vh,900px)] w-full max-w-7xl overflow-hidden rounded-[1.6rem] border border-[#e8eaed] bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.04] md:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveScenario(null)}
                    className="shrink-0 rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1 text-xs text-[#374151] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    返回主汇报
                  </button>
                </div>
                <div className="h-[calc(100%-3rem)] overflow-auto">
                  <SlideKnowledgeMatrix
                    scenario={activeScenario}
                    draft={scenarioDrafts[activeScenario.id] ?? emptyScenarioDraft}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </main>
  );
}
