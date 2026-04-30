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
  ChevronLeft,
  ChevronRight,
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
  title: "统一底座后推进应用复制",
  layers: [
    {
      id: "saas",
      name: "SaaS (场景层)",
      type: "grid",
      items: [
        "文档处理智能体",
        "经营分析智能体",
        "产品培训智能体",
        "创新研发智能体",
        "TrtCoding智能体",
        "系统推流窗口",
        "智能选址",
        "说清楚，讲明白",
        "中药大分子预测分析",
        "智能会议",
      ],
    },
    {
      id: "paas",
      name: "PaaS (AI能力中台)",
      type: "nested",
      subLayers: [
        {
          name: "工具层",
          items: ["智能体开发平台", "集团通用能力服务", "工程级能力", "音视频引擎(api)"],
        },
        {
          name: "模型层",
          items: ["同仁堂大模型", "deepseek、qwen系列模型", "Qcoder、GLM、Llama", "seedance、nanobanana"],
        },
        {
          name: "原子能力层",
          items: [
            "文档解析/文档拆分/意图识别/中医语言/古籍理解",
            "OCR/ASR/人脸核身/医疗报告结构化/医疗数据标准化",
          ],
        },
      ],
    },
    {
      id: "data",
      name: "数据层",
      type: "flex",
      items: ["数据中台", "非结构化数据", "股份智小谱", "分散的私域知识", "商业AI辅助诊疗", "智能文档云", "......"],
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
    title: "单兵作战模式已无法支撑集团战略",
    highlight: "（“散、弱、孤”）",
    subtitle: "缺乏集团级统筹规划，导致资源浪费与系统孤岛，转型亟待破局",
  },
  symptoms: [
    { id: "s1", icon: "ServerOff", title: "基础弱 · 资源孤岛", desc: "算力、模型各自采购或使用免费版，缺乏统一管理与规划。" },
    { id: "s2", icon: "Unplug", title: "规划弱 · 应用孤岛", desc: "智能体无统一技术标准、数据接口，导致系统间无法互联互通。" },
    { id: "s3", icon: "Network", title: "协同弱 · 效应缺失", desc: "智小谱与辅助诊疗系统知识库未打通，无法发挥“产品+服务”合力。" },
  ],
  rootCauses: [
    { id: "r1", icon: "LayoutDashboard", title: "缺统筹", desc: "无集团级AI算力平台、模型基座与统一数据治理体系，各自为战。" },
    { id: "r2", icon: "BookX", title: "缺标准", desc: "各业务线智能体开发技术栈不统一，缺乏通用接口标准，重复造轮子。" },
    { id: "r3", icon: "Target", title: "缺抓手", desc: "缺少能快速验证价值、同时又能牵引长期架构规划的标杆示范项目。" },
  ],
} as const;

const distillationData = {
  core_process: {
    title: "基于统一底座推进自研模型",
    base_model: "通用大模型",
    target_model: "同仁堂大模型",
    action: "DeepSeek 蒸馏",
    enhancements: ["高质量数据构建", "场景指令增强", "深度思考增强", "动态分流响应"],
  },
  modules: [
    {
      id: "knowledge",
      title: "知识库构建",
      themeColor: "blue",
      items: ["1 结构化知识", "2 非结构化知识", "3 向量表达", "4 重交互的UI"],
    },
    {
      id: "top_design",
      title: "深度配合顶层设计",
      themeColor: "purple",
      items: ["管控域一体化系统数据", "产业域的核心数据", "日常办公中产生的文档数据"],
    },
    {
      id: "reasoning",
      title: "智慧推理",
      themeColor: "red",
      items: ["营销辅助决策", "审核业务嵌入承接", "反思迭代优化，持续学习"],
    },
    {
      id: "generation",
      title: "内容生成 (医生效率 ⬆)",
      themeColor: "green",
      items: ["天然产物发现", "音视频生成", "药物报告生成"],
    },
  ],
} as const;

const computeComparisonData = {
  pageTitle: "统建底座方案对比与投入分析",
  planA: {
    title: "方案A：分散异构建设（现状）",
    architecture: "烟囱式建设，包含 NVIDIA、华为、海光等多种底层栈。",
    capex: 4500000,
    utilization: 25,
    opexComplexity: "极高（需维护3种以上环境）",
    scenes: ["工业CV（RTX卡）", "财务大数据（海光）", "大模型研发（A100/L20）", "知识库（昇腾）"],
  },
  planB: {
    title: "方案B：集团统建同构算力底座（推荐）",
    architecture: "基于高性能同构服务器（如昇腾或H20集群）+ AI PaaS 调度平台。",
    capex: 3000000,
    utilization: 80,
    opexComplexity: "低（单一底座，统一监控）",
    scenes: ["统一AI训练与推理池", "多业务线按需弹性申请", "vGPU切片与多机多卡训练", "潮汐调度（削峰填谷）"],
  },
} as const;

const localComputePlanningData = {
  header: {
    title: "第一步：建设统一算力与模型底座",
    subtitle: "先把 AI 的“水电煤”打通，通过统建统管减少重复采购与重复建设",
  },
  investment: {
    total: "300 万",
    desc: "首期统建核心投入预估，用于减少各单位分散采购带来的重复投入",
    breakdown: [
      { name: "国产算力集群", amount: "约 200万", share: "67%", detail: "部署千问 72B/32B 大模型，保障核心数据自主可控", color: "bg-emerald-500", theme: "emerald" },
      { name: "通用算力集群", amount: "约 80万", share: "26%", detail: "支撑传统多元化业务平滑迁移及特殊渲染需求", color: "bg-blue-500", theme: "blue" },
      { name: "机房部署与网络", amount: "约 20万", share: "7%", detail: "初期租赁 6kW 机柜，后续整体平移至通州数据中心", color: "bg-slate-400", theme: "neutral" },
    ],
  },
  strategy: {
    title: "演进路径与双擎架构",
    current: {
      status: "现状：散与弱",
      points: ["资源高度分散，无法统筹复用", "小规模盲目采购，缺乏国产化系统评估"],
    },
    future: {
      status: "未来：六大统一",
      points: ["统一调度、架构、生态、安全、信创、运维"],
    },
    architecture: {
      top: ["问数", "问药", "问策", "智小谱"],
      middle: "统一训练推理中心 (AI PaaS 调度)",
      bottom: [
        { name: "信创云算力 (主引擎)", theme: "emerald" },
        { name: "通用 GPU 算力 (辅引擎)", theme: "blue" },
      ],
    },
  },
} as const;

const buildMethodData = {
  header: {
    title: "同步推进系统建设与组织机制建设",
    subtitle: "采用低代码与专业开发协同模式，建立三方协同机制",
  },
  columns: {
    left: {
      title: "敏捷实施与协同",
      items: [
        {
          id: "l1",
          icon: "Zap",
          title: "敏捷双模开发",
          desc: "优先利用AI平台编排工具快速搭建原型，验证业务逻辑；复杂核心功能由专业研发团队攻坚，实现“快速响应+深度定制”的高效闭环。",
        },
        {
          id: "l2",
          icon: "Users",
          title: "三方协同机制",
          details: [
            { label: "集团侧", text: "1-2名AI架构师把控整体技术方向" },
            { label: "外部侧", text: "专业服务商负责模型微调与深度开发" },
            { label: "业务侧", text: "关键用户主导需求定义与最终验收" },
          ],
        },
      ],
    },
    center: {
      title: "组织架构中枢",
      nodes: [
        { id: "c1", type: "management", title: "集团信息化管理部", desc: "顶层架构设计与统筹管理" },
        { id: "core", type: "hub", title: "AI 核心平台", desc: "集团级赋能引擎" },
        { id: "c2", type: "external", title: "外部专业老师", desc: "模型调优与技术落地支持" },
        { id: "c3", type: "business", title: "业务部门关键用户", desc: "场景需求定义与效果验证" },
      ],
    },
    right: {
      title: "全域数据治理体系",
      items: [
        { id: "r1", icon: "Waypoints", title: "统一接入标准", desc: "建立标准化的数据接口与流转规范，打破数据孤岛，实现多源数据的统一汇聚。" },
        { id: "r2", icon: "ShieldCheck", title: "合规与安全管控", desc: "严格管控数据权限，确保访问链路合规，筑牢安全底线。" },
        { id: "r3", icon: "DatabaseZap", title: "高质量数据供给", desc: "清洗、标注与质检，保障喂给大模型的数据高可用性。" },
      ],
    },
  },
} as const;

const localModelHybridData = {
  header: {
    title: "第二步：72B 覆盖通用，32B 聚焦专业",
    subtitle: "兼顾能力与成本，先满足核心业务需求，再持续优化",
  },
  models: [
    {
      id: "general",
      type: "通用大模型",
      name: "千问 72B",
      version: "蒸馏版",
      features: ["广泛的语言理解与生成能力", "多领域知识覆盖", "支持复杂推理与对话"],
      theme: "blue",
      icon: "Brain",
    },
    {
      id: "professional",
      type: "专业微调模型",
      name: "千问 32B",
      version: "领域微调版",
      features: ["中医药领域知识深度优化", "财务/业务术语精准理解", "Text2SQL 等专业能力"],
      theme: "emerald",
      icon: "Microscope",
    },
    {
      id: "vector",
      type: "向量化模型",
      name: "bge-m3:latest",
      version: "向量化组件",
      features: ["将文本转化为高维向量", "支持语义搜索和相似度匹配", "结合大模型实现检索增强生成"],
      theme: "amber",
      icon: "Network",
    },
    {
      id: "security",
      type: "本地化部署",
      name: "数据安全",
      version: "不出域保障",
      features: ["企业数据完全隔离", "权限分级管控", "支持持续微调优化"],
      theme: "slate",
      icon: "ShieldCheck",
    },
  ],
  bottomSection: {
    mapping: {
      title: "模型与场景映射关系",
      items: [
        { model: "千问 72B", version: "蒸馏版", theme: "blue", modelId: "general", scenarios: ["问药助手", "问策分析", "知识图谱"] },
        { model: "千问 32B", version: "微调版", theme: "emerald", modelId: "professional", scenarios: ["问数洞察", "财务分析", "药物发现"] },
      ],
    },
    advantages: {
      title: "混合架构核心优势",
      items: [
        { title: "资源最优配置", desc: "通用模型覆盖广泛需求，专业模型精准解决核心业务问题", icon: "Scale" },
        { title: "性能与成本平衡", desc: "72B 模型提供强大能力，32B 模型降低资源消耗，实现性价比最优", icon: "Zap" },
        { title: "灵活扩展能力", desc: "支持模型微调与持续优化，适应业务发展与技术演进", icon: "Layers" },
      ],
    },
  },
  footer: "部署策略：基于集团本地化算力中心，采用容器化部署方式，支持模型的快速迭代与弹性扩缩容",
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
          算力摸排与AI前瞻规划汇报
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
      title: "各二级单位摸排情况",
      desc: "统一算力、统一数据、统一接口，先把重复建设和信息孤岛问题解决掉。",
    },
    {
      index: "02",
      title: "算力底座建设评估及集团管控边界",
      desc: "底座建设的投资回报，模型部署方式，组织配套。",
    },
    {
      index: "03",
      title: "底座实施及应用构建路线图",
      desc: "构建统一底座后集团公司AI推进路线",
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

function SlideKnowledgeMatrix({
  scenario,
  draft,
  onDraftChange,
}: {
  scenario: ExecutiveScenarioItem;
  draft: ScenarioDraft;
  onDraftChange: (field: keyof ScenarioDraft, value: string) => void;
}) {
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
      : [
          {
            key: "S",
            title: "优势",
            tone: "border-emerald-200 bg-emerald-50",
            points: toPoints(draft.strengths, "待你补充优势"),
          },
          {
            key: "W",
            title: "短板",
            tone: "border-amber-200 bg-amber-50",
            points: toPoints(draft.weaknesses, "待你补充短板"),
          },
          {
            key: "O",
            title: "机会",
            tone: "border-sky-200 bg-sky-50",
            points: toPoints(draft.opportunities, "待你补充机会"),
          },
          {
            key: "T",
            title: "风险",
            tone: "border-rose-200 bg-rose-50",
            points: toPoints(draft.risks, "待你补充风险"),
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
      : [
          {
            title: "现状补充",
            points: toPoints(draft.background, "待你补充现状"),
          },
          {
            title: "功能矩阵补充",
            points: toPoints(draft.matrixNotes, "待你补充功能矩阵"),
          },
          {
            title: "基础信息",
            points: [`计划节点：${scenario.timeline}`, `责任单位：${scenario.owner}`],
          },
        ];

  return (
    <SlideWrap>
      <h3 className="text-3xl font-semibold text-[#111827]">{scenario.title}：SWOT 与功能矩阵</h3>
      <p className="mt-2 text-sm text-[#4b5563]">场景池详情页已改为按你的输入生成，先问答采集素材，再自动整理成汇报内容。</p>
      <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="h-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-xl bg-white">
            {scenario.id === 1 ? (
              <div className="h-full w-full">
                <iframe
                  src="http://114.132.213.75:5080"
                  title="工业显微镜核心演示"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white">
                  工业显微镜核心演示窗口
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
      <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-4">
        <p className="text-base font-semibold text-[#111827]">素材输入区（你来补充）</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <textarea
            value={draft.background}
            onChange={(e) => onDraftChange("background", e.target.value)}
            placeholder="现状背景（例如：当前系统现状、业务痛点、依赖情况）"
            className="min-h-[88px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111827] outline-none transition focus:border-blue-300 focus:bg-white"
          />
          <textarea
            value={draft.strengths}
            onChange={(e) => onDraftChange("strengths", e.target.value)}
            placeholder="优势补充（你认为最有价值的2-3点）"
            className="min-h-[88px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111827] outline-none transition focus:border-blue-300 focus:bg-white"
          />
          <textarea
            value={draft.weaknesses}
            onChange={(e) => onDraftChange("weaknesses", e.target.value)}
            placeholder="短板/问题补充（当前做不到或效果不好的点）"
            className="min-h-[88px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111827] outline-none transition focus:border-blue-300 focus:bg-white"
          />
          <textarea
            value={draft.opportunities}
            onChange={(e) => onDraftChange("opportunities", e.target.value)}
            placeholder="机会补充（下一步可快速放大的方向）"
            className="min-h-[88px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111827] outline-none transition focus:border-blue-300 focus:bg-white"
          />
          <textarea
            value={draft.risks}
            onChange={(e) => onDraftChange("risks", e.target.value)}
            placeholder="风险补充（你最担心的问题）"
            className="min-h-[88px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111827] outline-none transition focus:border-blue-300 focus:bg-white"
          />
          <textarea
            value={draft.matrixNotes}
            onChange={(e) => onDraftChange("matrixNotes", e.target.value)}
            placeholder="功能矩阵补充（需要保留/删除/新增的功能点）"
            className="min-h-[88px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-3 text-sm text-[#111827] outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </div>
      </div>
    </SlideWrap>
  );
}

function SlideFiveExecutive({ onOpenKnowledgeMatrix }: { onOpenKnowledgeMatrix?: (item: ExecutiveScenarioItem) => void }) {
  const [mode, setMode] = useState<"grid" | "table">("grid");
  const sectionData: {
    secondary_units: { sectionTitle: string; sectionSubtitle: string; items: ExecutiveScenarioItem[] };
    group_company: { sectionTitle: string; sectionSubtitle: string; items: ExecutiveScenarioItem[] };
  } = {
    secondary_units: {
      sectionTitle: "场景池（单位申报，集团评审）",
      sectionSubtitle: "每个场景必须绑定责任人、里程碑和验收指标，纳入季度经营复盘",
      items: [
        { id: 1, title: "AI工业显微镜识别", timeline: "2026Q3 上线", category: "视觉AI", desc: "实验过程自动寻找有效成分，拍照 AI 形成范式报告", hardware: "NVIDIA GeForce RTX4080 32G * 8", status: "planning", owner: "股份公司工装部", metric: "识别准确率 >= 95%" },
        { id: 2, title: "AI现场生产安全预警", timeline: "2026Q4 试运行", category: "视觉AI", desc: "图像识别 + SOP 动作检测，形成实时预警闭环", hardware: "NVIDIA GeForce RTX4080 32G * 8", status: "planning", owner: "股份公司安全保障部", metric: "高风险动作漏检率 <= 5%" },
        { id: 3, title: "财务智能大数据分析", timeline: "2026Q3 交付", category: "大数据分析", desc: "海量财务数据整理、分析与预测，支撑预算与审计协同", hardware: "海光 DCU K100 AI 64G PCIe", status: "upcoming", owner: "股份公司财务部", metric: "月结周期缩短 >= 30%" },
        { id: 4, title: "药物研发发现", timeline: "2026Q4 扩容", category: "研发大模型", desc: "支撑文献分类、说明书信息抽取与政策问答等研发任务", hardware: "NVIDIA L20 48G * 8 (有拓展需求)", status: "ongoing", owner: "研究院", metric: "研发检索耗时下降 >= 40%" },
        { id: 6, title: "股份公司智小谱", timeline: "2026Q2 优化", category: "企业知识库", desc: "产品数据知识问答、党建宣传展示与门店知识触达", hardware: "华为昇腾910B 32GB * 8", status: "ongoing", owner: "股份公司", metric: "首问命中率 >= 85%" },
        { id: 7, title: "商业公司辅助诊疗系统", timeline: "2026Q4 评估", category: "医疗大模型", desc: "沉淀名老中医经验，实现同病不同证/同证不同方辅助建议", hardware: "NVIDIA A100 80G * 8", status: "core", owner: "商业公司", metric: "知识复用率 >= 70%" },
      ],
    },
    group_company: {
      sectionTitle: "集团级重点样板",
      sectionSubtitle: "围绕问药、问数、问策三大能力统一建设与分单位复用",
      items: [
        {
          id: 5,
          title: "问药智能体",
          timeline: "2026Q3 上线",
          category: "问药",
          desc: "以 Neo4J 图谱数据与文本数据为底座，提供可追溯、可审核的产品问答，当前落地难度相对可控。",
          hardware: "集团统筹算力",
          status: "core",
          owner: "集团公司、股份公司",
          metric: "首问命中率 >= 85%",
        },
        {
          id: 8,
          title: "问数智能体",
          timeline: "2026Q4 验收",
          category: "问数",
          desc: "数据来源以系统底表、数据库与 BI 数据为主，依赖 Text2SQL 做转译分析；该方向仍是业界卡点，普通 LLM 难以直接处理大规模结构化数据。",
          hardware: "集团统筹算力",
          status: "core",
          owner: "集团公司",
          metric: "取数时长下降 >= 50%",
        },
        {
          id: 9,
          title: "问策智能体",
          timeline: "2026Q4 验收",
          category: "问策",
          desc: "本质是结合“人、事、物”与问数结果，形成商业、政治与高层洞察，建设难度和复杂度均高于问药与问数。",
          hardware: "集团统筹算力",
          status: "core",
          owner: "集团公司",
          metric: "策略生成周期缩短 >= 50%",
        },
      ],
    },
  };
  const allItems = [...sectionData.secondary_units.items, ...sectionData.group_company.items];
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
    视觉AI: "bg-blue-100 text-blue-700",
    大数据分析: "bg-purple-100 text-purple-700",
    研发大模型: "bg-pink-100 text-pink-700",
    营销AI: "bg-orange-100 text-orange-700",
    企业知识库: "bg-green-100 text-green-700",
    医疗大模型: "bg-red-100 text-red-700",
    策略大模型: "bg-rose-100 text-rose-700",
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

            <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-[#fca5a5]/80 to-transparent animate-pulse" />

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-1.5 rounded-full bg-[#dc2626]" />
                <div>
                  <h4 className="text-lg font-semibold text-[#111827]">{sectionData.group_company.sectionTitle}</h4>
                  <p className="text-xs text-[#6b7280]">{sectionData.group_company.sectionSubtitle}</p>
                </div>
              </div>

              <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
                {sectionData.group_company.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#f3d5d5] bg-white p-4 transition-all hover:scale-[1.01] hover:bg-red-50/20 hover:shadow-[0_16px_36px_rgba(185,28,28,0.16)]"
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
                    </div>
                    <p className="mt-3 text-sm text-[#4b5563]">{item.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#fff1f2] px-2 py-1 text-xs text-[#9f1239]">
                      <Cpu size={12} />
                      {item.hardware}
                    </div>
                    <div className="mt-3 space-y-1 rounded-lg border border-[#fecaca] bg-[#fff7f7] px-3 py-2 text-xs text-[#7f1d1d]">
                      <p>责任单位：{item.owner}</p>
                    </div>
                  </div>
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
                      <span className={`rounded-full px-2 py-1 text-xs ${categoryStyle[item.category] ?? "bg-gray-100 text-gray-700"}`}>{item.category}</span>
                    </td>
                    <td className="px-3 py-2 text-[#3730a3]">{item.hardware}</td>
                    <td className="px-3 py-2 text-[#4b5563]">{item.owner}</td>
                  </tr>
                ))}
                <tr className="border-t border-[#f1f5f9] bg-rose-50/40">
                  <td colSpan={5} className="px-3 py-2 text-xs font-semibold tracking-[0.08em] text-rose-700">
                    {sectionData.group_company.sectionTitle}
                  </td>
                </tr>
                {sectionData.group_company.items.map((item) => (
                  <tr key={item.id} className="border-t border-[#f1f5f9]">
                    <td className="px-3 py-2 text-[#111827]">{item.title}</td>
                    <td className="px-3 py-2 text-[#4b5563]">{item.timeline}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-1 text-xs ${categoryStyle[item.category] ?? "bg-gray-100 text-gray-700"}`}>{item.category}</span>
                    </td>
                    <td className="px-3 py-2 text-[#9f1239]">{item.hardware}</td>
                    <td className="px-3 py-2 text-[#4b5563]">{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
    <div className="min-h-full w-full overflow-y-auto bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.14),transparent_36%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_55%,#e3f0ff_100%)] pb-8 text-slate-800">
      <h3 className="text-3xl font-semibold text-sky-900">{aiBlueprint.title}</h3>
      <p className="mt-2 text-sm text-slate-600">自上而下分层治理，自下而上能力支撑</p>

      <div className="mt-5 space-y-4">
        {aiBlueprint.layers.map((layer) => {
          return (
            <div key={layer.id} className="rounded-2xl border border-sky-200/80 bg-white/70 p-4 backdrop-blur-xl">
              <div className="mb-3 inline-flex rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
                {layer.name}
              </div>

              {"items" in layer && layer.type === "grid" ? (
                <div className="grid gap-3 md:grid-cols-5">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-sky-200 bg-white px-3 py-2 text-center text-xs text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.25)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}

              {"subLayers" in layer && layer.type === "nested" ? (
                <div className="rounded-xl border border-sky-200 bg-[#f5faff]/85 p-3">
                  <div className="grid gap-3 md:grid-cols-3">
                    {layer.subLayers.map((sub) => (
                      <div key={sub.name} className="rounded-xl border border-sky-200 bg-white p-3">
                        <p className="text-sm font-semibold text-sky-700">{sub.name}</p>
                        <div className="mt-2 space-y-2">
                          {sub.items.map((item) => (
                            <div
                              key={item}
                              className="rounded-lg border border-sky-100 bg-slate-50 px-2 py-1 text-xs text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)]"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                        {sub.name === "原子能力层" ? (
                          <div className="mt-2 grid gap-2">
                            <div className="rounded-lg border border-dashed border-sky-300 bg-sky-50/60 px-2 py-2 text-xs text-sky-700">
                              预留扩展框 A（待新增能力）
                            </div>
                            <div className="rounded-lg border border-dashed border-sky-300 bg-sky-50/60 px-2 py-2 text-xs text-sky-700">
                              预留扩展框 B（待新增能力）
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
                          className="group relative flex min-h-[148px] flex-col items-center justify-center gap-3 rounded-2xl border border-sky-200/90 bg-gradient-to-b from-white via-white to-sky-50/70 px-4 py-7 text-center shadow-[0_10px_40px_-12px_rgba(14,116,144,0.18)] ring-1 ring-sky-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300/90 hover:shadow-[0_24px_48px_-14px_rgba(56,189,248,0.38)] md:min-h-[168px] md:px-5 md:py-8"
                        >
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-50 text-sky-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-sky-200/70 transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16">
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
                        className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs text-slate-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)]"
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
        <p className="mt-2 text-sm text-[#4b5563]">中药知识库的游戏化重生与沉浸式学习</p>

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
            <p className="mt-1 text-xs text-[#4b5563]">中药知识库的游戏化重生与沉浸式学习</p>

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
    blue: "bg-blue-50/70 border-blue-200",
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
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dbeafe] bg-sky-50 text-sky-600 md:h-10 md:w-10">
              <Sparkles size={18} />
            </span>
          ) : (
            <Image
              src="/brand/deepseek-whale.png"
              alt="DeepSeek 小鲸鱼 Logo"
              width={40}
              height={40}
              unoptimized
              className="h-9 w-9 rounded-full border border-[#dbeafe] bg-white object-contain p-1 md:h-10 md:w-10"
              onError={() => setDeepseekLogoError(true)}
            />
          )}
        </div>
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 text-center text-sm font-semibold text-[#374151]">
            {distillationData.core_process.base_model}
          </div>
          <div className="relative h-44 w-56">
            <div className="absolute left-1/2 top-3 h-[86%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-300 via-blue-400 to-indigo-500/60" />
            {distillationData.core_process.enhancements.map((step, idx) => (
              <motion.div
                key={step}
                animate={{
                  opacity: coreHover ? 1 : 0.45,
                  scale: coreHover ? 1 : 0.96,
                  backgroundColor: coreHover ? "#eff6ff" : "#f8fafc",
                }}
                transition={{ duration: 0.25, delay: coreHover ? idx * 0.12 : 0 }}
                className="absolute left-1/2 w-44 -translate-x-1/2 rounded-full border border-[#dbeafe] px-2 py-1 text-center text-xs text-[#1e3a8a]"
                style={{ top: `${16 + idx * 36}px` }}
              >
                {step}
              </motion.div>
            ))}
            <motion.div
              animate={{ y: coreHover ? [-8, -120, -8] : -8, opacity: coreHover ? [0, 1, 0] : 0 }}
              transition={{ duration: 1.6, repeat: coreHover ? Infinity : 0, ease: "easeInOut" }}
              className="absolute left-1/2 top-[82%] -translate-x-1/2 text-sky-500"
            >
              <ArrowRight size={16} className="-rotate-90" />
            </motion.div>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-center text-sm font-semibold text-sky-700 shadow-[0_0_20px_rgba(56,189,248,0.22)]">
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
    { metric: "初期成本", A: 8, B: 7 },
    { metric: "运维成本", A: 3, B: 8 },
    { metric: "资源利用率", A: 2, B: 9 },
    { metric: "横向拓展性", A: 4, B: 9 },
    { metric: "生态兼容性", A: 7, B: 8 },
  ];

  const utilizationData = [
    { name: "分散建设", value: computeComparisonData.planA.utilization, fill: "#f59e0b" },
    { name: "统建底座", value: computeComparisonData.planB.utilization, fill: "#2563eb" },
  ];
  const utilizationLift = computeComparisonData.planB.utilization - computeComparisonData.planA.utilization;
  const capexDelta = computeComparisonData.planB.capex - computeComparisonData.planA.capex;
  const annualOpsSaving = Math.round(computeComparisonData.planA.capex * 0.18 - computeComparisonData.planB.capex * 0.08);
  const capexIsSaving = capexDelta < 0;
  const capexDeltaAbs = Math.abs(capexDelta);
  const capexLabel = capexIsSaving ? "Capex 节约" : "新增 Capex";
  const capexSign = capexIsSaving ? "-" : "+";
  const paybackYears =
    annualOpsSaving > 0 ? (capexDelta <= 0 ? "即期回正" : `${(capexDelta / annualOpsSaving).toFixed(1)} 年`) : "--";

  const summaryCards = [
    { title: "潮汐调度", desc: "训练/推理时段动态编排，提升资产利用效率", icon: <AlarmClock size={18} className="text-blue-600" /> },
    { title: "统一纳管", desc: "跨业务线统一监控、告警与审计闭环", icon: <LayoutGrid size={18} className="text-indigo-600" /> },
    { title: "数据安全", desc: "单一底座权限分层，降低跨栈泄露风险", icon: <Shield size={18} className="text-emerald-600" /> },
    { title: "无缝扩容", desc: "同构集群平滑扩展，支撑持续业务增长", icon: <Cpu size={18} className="text-cyan-600" /> },
  ];

  return (
    <div className="min-h-full overflow-y-auto bg-gradient-to-b from-[#f9fbff] to-white pb-6">
      <h3 className="text-2xl font-semibold text-[#111827] md:text-3xl">{computeComparisonData.pageTitle}</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">利用率提升</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">+{utilizationLift}%</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">{capexLabel}</p>
          <p className={`mt-1 text-xl font-semibold ${capexIsSaving ? "text-emerald-600" : "text-[#111827]"}`}>
            {capexSign}¥{capexDeltaAbs.toLocaleString("zh-CN")}
          </p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">年化运维节约</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">¥{annualOpsSaving.toLocaleString("zh-CN")}</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
          <p className="text-xs text-[#6b7280]">预计回收期</p>
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
          className="relative rounded-2xl border border-sky-200 bg-sky-50/50 p-4 shadow-[0_6px_20px_rgba(37,99,235,0.1)]"
        >
          <span className="absolute right-4 top-4 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-sky-700">推荐方案</span>
          <p className="pr-28 text-lg font-semibold text-[#111827]">{computeComparisonData.planB.title}</p>
          <p className="mt-2 text-sm text-[#4b5563]">{computeComparisonData.planB.architecture}</p>
          <div className="mt-3 grid gap-2 text-sm text-[#374151]">
            <div className="rounded-xl border border-sky-100 bg-white/90 px-3 py-2">
              预估 Capex：<span className="font-semibold text-sky-700">¥{computeComparisonData.planB.capex.toLocaleString("zh-CN")}</span>
            </div>
            <div className="rounded-xl border border-sky-100 bg-white/90 px-3 py-2">资源平均利用率：{computeComparisonData.planB.utilization}%</div>
            <div className="rounded-xl border border-sky-100 bg-white/90 px-3 py-2">运维复杂度：{computeComparisonData.planB.opexComplexity}</div>
          </div>
          <div className="mt-3 space-y-2">
            {computeComparisonData.planB.scenes.map((scene) => (
              <div key={scene} className="rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm text-[#374151]">
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
                <Radar name="方案B" dataKey="B" stroke="#2563eb" fill="#2563eb" fillOpacity={0.28} isAnimationActive={false} />
                <Tooltip />
              </RadarChart>
            ) : (
              <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/50" style={{ width: chartW, height: chartH }} aria-hidden />
            )}
          </div>
        </div>
        <div className="min-h-[260px] min-w-0 rounded-2xl border border-[#e5e7eb] bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-[#374151]">资源利用率对比（%）</p>
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
              <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/50" style={{ width: chartW, height: chartH }} aria-hidden />
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
  const [activeTheme, setActiveTheme] = useState<"emerald" | "blue" | null>(null);
  const bars = localComputePlanningData.investment.breakdown.map((item) => ({
    ...item,
    ratio: Number(item.share.replace("%", "")) / 100,
  }));

  return (
    <SlideWrap>
      <div className="min-h-full overflow-y-auto bg-[#fcfcfd]">
        <header className="text-center">
          <h3 className="text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">{localComputePlanningData.header.title}</h3>
          <p className="mx-auto mt-2 max-w-3xl text-sm tracking-[0.06em] text-[#6b7280] md:text-base">{localComputePlanningData.header.subtitle}</p>
        </header>

        <section className="mt-6 grid gap-4 rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] md:grid-cols-[0.95fr_1.35fr] md:p-6">
          <div className="rounded-2xl border border-[#fee2e2] bg-gradient-to-br from-[#fff1f2] via-white to-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9f1239]">投资看板</p>
            <p className="mt-3 text-6xl font-bold tracking-tight text-red-700 md:text-7xl">{localComputePlanningData.investment.total}</p>
            <p className="mt-3 text-sm leading-7 text-[#4b5563]">{localComputePlanningData.investment.desc}</p>
          </div>

          <div className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f8fafc]">
              <div className="flex h-3 w-full">
                {bars.map((item) => (
                  <div key={item.name} className={item.color} style={{ width: `${Math.round(item.ratio * 100)}%` }} />
                ))}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {bars.map((item) => {
                const linkable = item.theme === "emerald" || item.theme === "blue";
                const active = linkable && activeTheme === item.theme;
                return (
                  <article
                    key={item.name}
                    onMouseEnter={() => setActiveTheme(linkable ? (item.theme as "emerald" | "blue") : null)}
                    onMouseLeave={() => setActiveTheme(null)}
                    className={[
                      "rounded-2xl border bg-white p-3 transition-all duration-200",
                      active ? "border-[#c7d2fe] shadow-[0_0_0_2px_rgba(99,102,241,0.2)]" : "border-[#e5e7eb]",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    </div>
                    <p className="mt-1 text-xl font-semibold text-[#111827]">{item.amount}</p>
                    <p className="text-xs text-[#6b7280]">占比 {item.share}</p>
                    <p className="mt-2 text-xs leading-5 text-[#4b5563]">{item.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <h4 className="text-xl font-semibold text-[#111827]">{localComputePlanningData.strategy.title}</h4>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <p className="text-sm font-semibold text-[#6b7280]">{localComputePlanningData.strategy.current.status}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#4b5563]">
                  {localComputePlanningData.strategy.current.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center text-[#9ca3af]">
                <ArrowRight size={18} />
              </div>
              <div className="rounded-2xl border border-[#bfdbfe] bg-gradient-to-br from-[#eff6ff] to-white p-4">
                <p className="text-sm font-semibold text-[#1d4ed8]">{localComputePlanningData.strategy.future.status}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#1f2937]">
                  {localComputePlanningData.strategy.future.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <h4 className="text-xl font-semibold text-[#111827]">双擎底座简图</h4>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {localComputePlanningData.strategy.architecture.top.map((item) => (
                  <div key={item} className="rounded-xl border border-[#e5e7eb] bg-white px-2 py-2 text-center text-xs font-semibold text-[#374151]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_24px_rgba(79,70,229,0.35)]">
                {localComputePlanningData.strategy.architecture.middle}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {localComputePlanningData.strategy.architecture.bottom.map((item) => {
                  const isEmerald = item.theme === "emerald";
                  const active = activeTheme === item.theme;
                  const base = isEmerald
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-blue-200 bg-blue-50 text-blue-800";
                  const glow = isEmerald
                    ? "shadow-[0_0_0_2px_rgba(16,185,129,0.35),0_12px_24px_rgba(16,185,129,0.25)]"
                    : "shadow-[0_0_0_2px_rgba(37,99,235,0.3),0_12px_24px_rgba(37,99,235,0.2)]";
                  return (
                    <div key={item.name} className={`rounded-2xl border px-3 py-4 text-center text-sm font-semibold transition-all duration-200 ${base} ${active ? glow : ""}`}>
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SlideWrap>
  );
}

function SlideNextStepTaskBoard() {
  const boardData = {
    header: {
      title: "分阶段推进计划（90/180/365）",
      subtitle: "按里程碑、责任人和验收指标推进，季度复盘、滚动扩面",
    },
    milestones: ["90 天：完成 3 个样板场景 PoC", "180 天：上线集团知识库 1.0", "365 天：形成 8-10 个可复用场景"],
    tracks: [
      {
        id: "scenario",
        title: "业务价值场景（集团牵头）",
        theme: "red",
        tasks: [
          {
            name: "深化“问药”系统 (智小谱)",
            desc: "依托知识库，打造懂药理、精业务的 AI 智能问答助手",
            tag: "优先级: 高",
            owner: "股份公司 + 信息中心",
            deadline: "2026Q2",
            metric: "首问命中率 >= 85%",
          },
          {
            name: "推进“问数”平台建设",
            desc: "打破数据壁垒，实现自然语言交互式的企业级数据查询与分析",
            tag: "规划落地",
            owner: "财务共享中心 + 数据治理专班",
            deadline: "2026Q3",
            metric: "取数时长下降 >= 50%",
          },
          {
            name: "产品营销策略规划",
            desc: "聚焦核心产品特性与竞品优劣，利用 AI 深度推演并自动生成高转化营销策略",
            tag: "重点攻坚",
            owner: "战略发展部 + 市场中心",
            deadline: "2026Q4",
            metric: "活动转化率提升 >= 15%",
          },
        ],
      },
      {
        id: "infrastructure",
        title: "底座与治理体系（集团统筹）",
        theme: "blue",
        tasks: [
          {
            name: "算力本地化部署评估",
            desc: "基于核心数据不出域的安全合规要求，全面开展本地算力集群部署方案论证",
            tag: "推进中",
            owner: "集团信息中心",
            deadline: "2026Q2",
            metric: "形成 1 套可执行部署方案",
          },
          {
            name: "算力基础架构专项评审",
            desc: "暂缓最终造价定论，评审核心转向验证 AI PaaS 平台的弹性调度与池化能力",
            tag: "关键节点",
            owner: "AI PMO + 外部顾问组",
            deadline: "2026Q3",
            metric: "利用率目标 >= 70%",
          },
          {
            name: "按需资源供给策略落地",
            desc: "建立业务分级机制：对“初期探索”敏捷供给小算力，对“成熟应用”保障高可用算力",
            tag: "机制建设",
            owner: "AI 平台运营组",
            deadline: "2026Q4",
            metric: "资源申请周期 <= 2 天",
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
    blue: {
      accent: "text-blue-600",
      line: "from-blue-500/60 to-transparent",
      tag: "bg-blue-50 text-blue-600 border-blue-100",
      hover: "hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_28px_rgba(37,99,235,0.14)]",
      icon: Server,
    },
  };

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
                        <p>责任人：{task.owner}</p>
                        <p>时间节点：{task.deadline}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
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
      title: "集团做底座，业务做场景，分工要一次说清",
      subtitle: "统一平台和标准接口，业务专注场景价值，避免重复造轮子",
    },
    architecture: [
      {
        id: "layer4",
        level: "场景应用层",
        responsibility: "鼓励业务探索",
        desc: "充分发挥业务侧创新力，结合实际痛点自由探索",
        colorTheme: "red",
        items: ["产品营销策略", "工业显微镜识别", "安全预警检测", "辅助诊疗系统", "更多创新场景..."],
      },
      {
        id: "layer3",
        level: "数据层",
        responsibility: "集团提供容器，业务各自维护",
        desc: "集团提供统一知识库工具，各单位独立维护专属文件数据，条件具备后融合互通",
        colorTheme: "purple",
        items: ["统一知识库容器 (RAG)", "大兴分厂工艺规程库", "研究院产品知识库", "跨域数据融合引擎"],
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
        items: ["AI PaaS 弹性调度平台", "同仁堂专属大模型", "DeepSeek / Qwen 等开源模型群", "OCR / 意图识别等原子能力"],
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
        title: "集团统筹（底座与中台）",
        points: ["统一服务门户：AI算力平台 / 资源调度平台", "统一技术底座：大模型 / 认知中台 / 机器视觉", "统一资源调度与安全：信创算力池 + 全生命周期安全管控"],
      },
      center: "标准 API 与容器切分界面",
      right: {
        title: "业务实施（数据与场景）",
        points: ["管理私域数据：各单位维护专属知识与数据资产", "SaaS 场景研发：基于集团底座孵化智能体场景", "边缘存量纳管：业务侧存量集群按需接入统一体系"],
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
          <p className="mt-2 text-sm text-[#6b7280]">{boundaryData.header.subtitle}</p>
        </div>

        <section className="mt-4 grid gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3">
            <p className="text-sm font-semibold text-blue-700">{boundaryData.keySplitSummary.left.title}</p>
            <div className="mt-2 space-y-1.5">
              {boundaryData.keySplitSummary.left.points.map((point) => (
                <p key={point} className="text-xs leading-5 text-[#374151]">
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

          <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3">
            <p className="text-sm font-semibold text-rose-700">{boundaryData.keySplitSummary.right.title}</p>
            <div className="mt-2 space-y-1.5">
              {boundaryData.keySplitSummary.right.points.map((point) => (
                <p key={point} className="text-xs leading-5 text-[#374151]">
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
                  "grid gap-3 rounded-2xl border p-4 md:grid-cols-[220px_1fr_1.1fr] md:items-center",
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
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icon size={16} />
                    <span>{node.level}</span>
                  </div>
                  <p className="mt-2 text-xs font-medium tracking-[0.05em] opacity-95">{node.responsibility}</p>
                </div>

                <div className="rounded-xl border border-white/70 bg-white/80 px-4 py-3">
                  <p className="text-lg font-semibold text-[#111827]">{node.level}</p>
                  <p className="mt-2 text-sm leading-6 text-[#4b5563]">{node.desc}</p>
                </div>

                <div className={node.id === "layer4" ? "grid grid-cols-2 gap-2 lg:grid-cols-3" : "grid grid-cols-2 gap-2"}>
                  {node.items.map((item) => (
                    <div
                      key={item}
                      className={[
                        "rounded-full border px-3 py-1.5 text-center text-xs font-medium",
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
        role: "集团统筹（底座与中台）",
        motto: "资源集约化运营，保障业务稳定运行",
        layers: [
          { name: "统一服务门户", desc: "AI算力平台 / 资源调度平台", icon: LayoutDashboard },
          { name: "统一技术底座", desc: "同仁堂大模型 / 深层认知中台 / 机器视觉", icon: BrainCircuit },
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
    "人效遭遇瓶颈：依赖经验驱动，标准化复制困难",
    "业财数据孤岛：跨系统口径不一致，问数效率低",
    "底层算力分散：重复采购导致成本高、利用率低",
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
              <h4 className="text-xl font-semibold text-[#111827]">认知分界线 · 数字化转型深水区</h4>
              <p className="mt-1 text-sm text-[#6b7280]">表层症状若不追溯到底层根因，投入将持续分散、难以复用</p>
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
                结论：先统一算力与数据底座，再规模化落地问药、问数、问策，才能形成可复制的集团 AI 能力。
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
                          idx === 0 ? "bg-emerald-500" : idx === 1 ? "bg-blue-500" : "bg-rose-500"
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
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
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
      card: "from-blue-600 to-blue-800",
      chip: "bg-white/20 text-blue-50",
      glow: "shadow-[0_18px_34px_rgba(37,99,235,0.35)]",
      mappingChip: "bg-blue-100 text-blue-700",
      mappingPill: "border-blue-200 bg-blue-50 text-blue-700",
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
                          idx === 0 ? "bg-blue-50 text-blue-600" : idx === 1 ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"
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
  if (slide.slide_id === 1407) return <ImplementationRoadmapAndRoiSlide />;
  if (slide.slide_id === 1) return <SlideCover />;
  if (slide.slide_id === 2) return <SlideCatalog />;
  if (slide.slide_id === 401) return <SlideDivisionAndInterfaceSplit />;
  if (slide.slide_id === 5) return <SlideFiveExecutive onOpenKnowledgeMatrix={onOpenKnowledgeMatrix} />;
  if (slide.slide_id === 701) return <SlidePainBridgeBoard />;
  if (slide.slide_id === 702) return <SlideIcebergWhy />;
  if (slide.slide_id === 703) return <AIVisionSlide />;
  if (slide.slide_id === 704) return <SlideGovernanceBoundary />;
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
  const hiddenSlideIds = new Set([8, 703]);
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
      background: "目前未开展，处于方案分析阶段。",
      strengths: "对 LLM 依赖较低（可作为辅助）；以图像识别为主，技术路径清晰。",
      weaknesses: "当前缺少实战数据验证；尚未形成完整的现场预警流程闭环。",
      opportunities: "后续可套用市面成熟软硬件；可快速接入集团中台能力，缩短建设周期。",
      risks: "若现场数据质量不稳定，会影响预警准确率；多系统接入阶段存在联调风险。",
      matrixNotes: "视频流识别；SOP动作检测；违规行为告警；告警分级；联动中台派单；事件复盘看板。",
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

  const handleDraftChange = (scenarioId: number, field: keyof ScenarioDraft, value: string) => {
    setScenarioDrafts((prev) => ({
      ...prev,
      [scenarioId]: {
        ...(prev[scenarioId] ?? emptyScenarioDraft),
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    const controller = new AbortController();
    const fallback: LayoutPayload = defaultLayoutData;

    const timer = window.setTimeout(() => {
      controller.abort();
      setData((prev) => prev ?? fallback);
    }, 6000);

    fetch("/ppt-layout/layout.json", { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<LayoutPayload>) : fallback))
      .then((json) => setData(json))
      .catch(() => setData((prev) => prev ?? fallback))
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

  const visibleSlidesRaw = data.slides
    .filter((slide) => slide.slide_id !== 4 && slide.slide_id !== 6 && slide.slide_id !== 9)
    .flatMap((slide) => {
      if (slide.slide_id === 5) return [slide, { slide_id: 1101, elements: [] }];
      if (slide.slide_id === 11) return [{ slide_id: 1099, elements: [] }, { slide_id: 1100, elements: [] }];
      if (slide.slide_id === 7)
        return [{ slide_id: 701, elements: [] }, { slide_id: 703, elements: [] }, { slide_id: 704, elements: [] }];
      if (slide.slide_id === 13)
        return [{ slide_id: 1298, elements: [] }, slide, { slide_id: 1299, elements: [] }, { slide_id: 1301, elements: [] }, { slide_id: 1399, elements: [] }];
      return [slide];
    })
    .filter((slide) => showFullVersion || !hiddenSlideIds.has(slide.slide_id))
    .filter((slide) => slide.slide_id !== 3 && slide.slide_id !== 7 && slide.slide_id !== 10 && slide.slide_id !== 11);

  const strategicFlowOrder = [1099, 1101, 1298, 13, 1299, 12, 1301, 1100] as const;
  const strategicFlowSet = new Set<number>(strategicFlowOrder);
  const strategicFlowSlides = strategicFlowOrder
    .map((id) => visibleSlidesRaw.find((slide) => slide.slide_id === id))
    .filter((slide): slide is LayoutSlide => Boolean(slide));
  const nonStrategicSlides = visibleSlidesRaw.filter((slide) => !strategicFlowSet.has(slide.slide_id));
  const closingSlide = nonStrategicSlides.find((slide) => slide.slide_id === 1399);
  const nonStrategicWithoutClosing = nonStrategicSlides.filter((slide) => slide.slide_id !== 1399);
  const strategicTotalPages = strategicFlowSlides.length;

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

  const renderSingleSlideSection = (slide: LayoutSlide) => {
    const shellBleed = slideShellBleedIds.has(slide.slide_id);
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
        <div
          className={[
            "flex min-h-0 flex-1 flex-col overflow-y-auto [min-height:max(560px,calc(100vh-9.5rem))]",
            shellBleed ? "p-0" : "p-4 md:p-6",
          ].join(" ")}
        >
          <div className="flex min-h-0 flex-1 flex-col">
            <SlideById
              slide={slide}
              showFullVersion={showFullVersion}
              onOpenKnowledgeMatrix={handleOpenScenarioDetail}
            />
          </div>
        </div>
      </section>
    );
  };

  const renderStrategicFlowSection = () => {
    if (strategicFlowSlides.length === 0) return null;
    return (
      <section
        key="strategic-flow-slider"
        data-report-slide="strategic-flow"
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
          {strategicFlowSlides.map((slide) => {
            const shellBleed = slideShellBleedIds.has(slide.slide_id);
            const shellWhite = slideShellWhiteIds.has(slide.slide_id);
            return (
              <article key={slide.slide_id} className="flex min-h-0 min-w-full snap-start flex-col overflow-y-auto">
                <div
                  className={[
                    "flex min-h-0 flex-1 flex-col overflow-y-auto [min-height:max(560px,calc(100vh-9.5rem))]",
                    shellWhite ? "bg-white" : "bg-[#fcfcfd]",
                    shellBleed ? "p-0" : "p-4 md:p-6",
                  ].join(" ")}
                >
                  <div className="flex min-h-0 flex-1 flex-col">
                    <SlideById
                      slide={slide}
                      showFullVersion={showFullVersion}
                      onOpenKnowledgeMatrix={handleOpenScenarioDetail}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  };

  const renderedSections: React.ReactNode[] = [
    renderSingleSlideSection({ slide_id: 1400, elements: [] }),
    renderSingleSlideSection({ slide_id: 1401, elements: [] }),
    renderSingleSlideSection({ slide_id: 1402, elements: [] }),
    renderSingleSlideSection({ slide_id: 1403, elements: [] }),
    renderSingleSlideSection({ slide_id: 1404, elements: [] }),
    renderSingleSlideSection({ slide_id: 1405, elements: [] }),
    renderSingleSlideSection({ slide_id: 1406, elements: [] }),
    renderSingleSlideSection({ slide_id: 1407, elements: [] }),
  ];
  if (showFullVersion) {
    for (let i = 0; i < nonStrategicWithoutClosing.length; i += 1) {
      const current = nonStrategicWithoutClosing[i];
      renderedSections.push(renderSingleSlideSection(current));
    }
    if (strategicFlowSlides.length > 0) {
      renderedSections.push(renderStrategicFlowSection());
    }
    if (closingSlide) {
      renderedSections.push(renderSingleSlideSection(closingSlide));
    }
  }

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
                同仁堂集团算力摸排与AI前瞻规划汇报
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
              {showFullVersion ? "当前：全量版（点击切换精简版）" : "当前：精简版（点击切换全量版）"}
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
                    onDraftChange={(field, value) => handleDraftChange(activeScenario.id, field, value)}
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
