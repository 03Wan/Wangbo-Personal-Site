import type { Locale } from "./content";
import type { Work, WorkStatus, WorkType } from "./types";

export const workTypeLabels: Record<Locale, Record<WorkType, string>> = {
  zh: { "product-system": "产品与系统", "research-report": "研究报告", "data-analysis": "数据分析", prototype: "产品原型", presentation: "演示材料", "visual-design": "视觉设计", video: "视频内容" },
  en: { "product-system": "Products & systems", "research-report": "Research reports", "data-analysis": "Data analysis", prototype: "Product prototypes", presentation: "Presentation materials", "visual-design": "Visual design", video: "Video content" },
};

export const workStatusLabels: Record<Locale, Record<WorkStatus, string>> = {
  zh: { public: "已公开", organizing: "正在整理", "summary-only": "仅展示摘要", private: "暂未公开" },
  en: { public: "Public", organizing: "Being organized", "summary-only": "Summary only", private: "Not public" },
};

export const works: Work[] = [
  { id: "zhixuan-youfa-system", title: "智选优发系统", titleEn: "Zhixuan Youfa System", type: "product-system", year: "2026", description: "跨境商品素材检测、风险识别与发布决策辅助系统。", descriptionEn: "A system for reviewing cross-border product assets, identifying risks and supporting publishing decisions.", relatedProjectSlug: "zhixuan-youfa", status: "summary-only", isPublic: false, featured: true },
  { id: "paper-format-review", title: "论文格式审查与辅助规范化系统", titleEn: "Academic Format Review and Normalization Assistant", type: "product-system", year: "2026", description: "用于梳理论文格式检查项与辅助规范化流程的工具实践。", descriptionEn: "A tool practice for structuring academic-format checks and assisted normalization workflows.", status: "private", isPublic: false },
  { id: "autosorter", title: "Autosorter 文件整理工具", titleEn: "Autosorter File Organization Tool", type: "product-system", year: "2026", description: "面向日常文件归类与整理流程的轻量工具。", descriptionEn: "A lightweight tool for everyday file classification and organization workflows.", status: "private", isPublic: false },
  { id: "aigc-project-materials", title: "AIGC 跨境电商项目材料", titleEn: "AIGC Cross-border Commerce Project Materials", type: "presentation", year: "2026", description: "研究框架、阶段性分析与项目展示材料的整理摘要。", descriptionEn: "An organized summary of the research framework, staged analysis and project presentation materials.", relatedProjectSlug: "aigc-cross-border-research", status: "organizing", isPublic: false, featured: true },
  { id: "digital-trade-framework", title: "数字贸易壁垒研究框架", titleEn: "Digital Trade Barriers Research Framework", type: "data-analysis", year: "2026", description: "涵盖数据来源、变量设计与双向固定效应模型规划的阶段性框架。", descriptionEn: "A staged framework covering data sources, variable design and a planned two-way fixed-effects model.", relatedProjectSlug: "digital-trade-barriers", status: "summary-only", isPublic: false },
  { id: "rural-fieldwork-report", title: "乡村振兴调研报告", titleEn: "Rural Revitalization Fieldwork Report", type: "research-report", year: "2025", description: "由实地走访、访谈、问卷与资料整理形成的调研成果。", descriptionEn: "A fieldwork output developed from site visits, interviews, questionnaires and source organization.", relatedProjectSlug: "jiangsu-rural-fieldwork", status: "organizing", isPublic: false, featured: true },
  { id: "public-presentation-materials", title: "项目计划书与公开演示材料", titleEn: "Project Plans and Public Presentation Materials", type: "presentation", year: "2025—2026", description: "用于项目沟通与展示的结构化材料集合。", descriptionEn: "A collection of structured materials used for project communication and presentations.", status: "organizing", isPublic: false },
  { id: "public-resume", title: "公开简历", titleEn: "Public Resume", type: "presentation", year: "2026", description: "已移除手机号、出生年月、政治面貌等敏感信息的公开版本。", descriptionEn: "A public version with sensitive details such as phone number, date of birth and political affiliation removed.", status: "public", downloadHref: "/resume-wangbo-public.pdf", isPublic: true },
];

export function getFeaturedWorks() {
  return works.filter((work) => work.featured).slice(0, 3);
}
