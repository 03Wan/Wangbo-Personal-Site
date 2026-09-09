import type { Work } from "./types";

export const works: Work[] = [
  { id: "zhixuan-youfa-system", title: "智选优发系统", type: "product-system", year: "2026", description: "跨境商品素材检测、风险识别与发布决策辅助系统。", relatedProjectSlug: "zhixuan-youfa", status: "summary-only", isPublic: false, featured: true },
  { id: "paper-format-review", title: "论文格式审查与辅助规范化系统", type: "product-system", year: "2026", description: "用于梳理论文格式检查项与辅助规范化流程的工具实践。", status: "private", isPublic: false },
  { id: "autosorter", title: "Autosorter 文件整理工具", type: "product-system", year: "2026", description: "面向日常文件归类与整理流程的轻量工具。", status: "private", isPublic: false },
  { id: "aigc-project-materials", title: "AIGC 跨境电商项目材料", type: "presentation", year: "2026", description: "研究框架、阶段性分析与项目展示材料的整理摘要。", relatedProjectSlug: "aigc-cross-border-research", status: "organizing", isPublic: false, featured: true },
  { id: "digital-trade-framework", title: "数字贸易壁垒研究框架", type: "data-analysis", year: "2026", description: "涵盖数据来源、变量设计与双向固定效应模型规划的阶段性框架。", relatedProjectSlug: "digital-trade-barriers", status: "summary-only", isPublic: false },
  { id: "rural-fieldwork-report", title: "乡村振兴调研报告", type: "research-report", year: "2025", description: "由实地走访、访谈、问卷与资料整理形成的调研成果。", relatedProjectSlug: "jiangsu-rural-fieldwork", status: "organizing", isPublic: false, featured: true },
  { id: "public-presentation-materials", title: "项目计划书与公开演示材料", type: "presentation", year: "2025—2026", description: "用于项目沟通与展示的结构化材料集合。", status: "organizing", isPublic: false },
  { id: "public-resume", title: "公开简历", type: "presentation", year: "2026", description: "已移除手机号、出生年月、政治面貌等敏感信息的公开版本。", status: "public", downloadHref: "/resume-wangbo-public.pdf", isPublic: true },
];
