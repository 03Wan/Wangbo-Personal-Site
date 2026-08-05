import type { Locale } from "./content";

export const siteCopy: Record<Locale, {
  home: { projectsKicker: string; projectsTitle: string; worksKicker: string; worksTitle: string; worksIntro: string; currentKicker: string; currentTitle: string; currentItems: string[]; viewAllProjects: string; viewWorks: string; identity: string[] };
  projects: { eyebrow: string; title: string; lead: string; noteTitle: string; note: string };
  works: { eyebrow: string; title: string; lead: string; note: string };
  detail: Record<string, string>;
  about: { focusTitle: string; focuses: string[]; toolsTitle: string; tools: Array<{ title: string; items: string[] }> };
  contact: { topicsTitle: string; topics: string[] };
  resume: { privacy: string };
}> = {
  zh: {
    home: {
      projectsKicker: "SELECTED PROJECTS / 精选项目", projectsTitle: "从问题出发，用过程与证据说明实践。", worksKicker: "SELECTED WORKS / 精选作品", worksTitle: "把研究、系统与材料整理为可查看的产出。", worksIntro: "作品页只展示真实产出；未公开内容会明确标注状态。", currentKicker: "NOW / 当前正在做", currentTitle: "正在推进的四件事", currentItems: ["完善智选优发系统", "推进数字贸易壁垒相关研究", "整理乡村调研成果", "建设个人作品档案"], viewAllProjects: "查看全部项目", viewWorks: "浏览作品", identity: ["南京", "2026 届本科毕业生", "国际经济与贸易", "更新于 2026-08-05"],
    },
    projects: { eyebrow: "PROJECTS / 项目", title: "项目不是标题清单，而是问题、职责与证据。", lead: "这里记录跨境电商、AIGC、数字贸易、产品实践与实地调研。每个项目均说明个人角色、工作过程、当前状态与可公开材料。", noteTitle: "证据边界", note: "进行中的研究仅展示设计与阶段性成果；没有公开文件或真实链接时，不提供下载入口。" },
    works: { eyebrow: "WORKS / 作品", title: "真实产出，与项目经历分开呈现。", lead: "系统、研究框架、调研报告、演示材料和公开简历在这里按产出形式归档。", note: "未公开条目用于说明产出范围，不提供空链接。" },
    detail: { overview: "项目概述", background: "项目背景", questions: "核心问题", responsibilities: "我的职责", process: "工作过程", outcomes: "项目成果", evidence: "证据与材料", reflection: "限制与反思", previous: "上一个项目", next: "下一个项目", all: "全部项目", period: "时间", status: "状态", level: "性质", role: "我的角色" },
    about: { focusTitle: "关注方向", focuses: ["跨境电商", "AIGC 实际应用", "数字贸易", "数据研究", "产品实践"], toolsTitle: "工具与方法", tools: [{ title: "研究与分析", items: ["SPSS", "Stata", "Excel", "Python"] }, { title: "AI 与工作流", items: ["ChatGPT", "Claude", "Codex", "Gemini"] }, { title: "产品与部署", items: ["Next.js", "Vercel", "Cloudflare", "Supabase 基础应用"] }, { title: "表达与交付", items: ["项目计划书", "调研报告", "演示材料", "产品原型"] }] },
    contact: { topicsTitle: "适合联系我的主题", topics: ["项目交流", "AIGC 与跨境电商讨论", "产品合作", "研究资料交流", "网站与工具反馈"] },
    resume: { privacy: "公开版本已对手机号、出生年月、政治面貌等敏感信息进行处理。" },
  },
  en: {
    home: {
      projectsKicker: "SELECTED PROJECTS", projectsTitle: "Starting with the question, showing the work through process and evidence.", worksKicker: "SELECTED WORKS", worksTitle: "Research, systems and materials organized as tangible outputs.", worksIntro: "The Works page presents real outputs and labels anything that is not yet public.", currentKicker: "NOW", currentTitle: "Four things in progress", currentItems: ["Refining the Zhixuan Youfa system", "Advancing research on digital trade barriers", "Organizing rural fieldwork outputs", "Building a personal works archive"], viewAllProjects: "View all projects", viewWorks: "Browse works", identity: ["Nanjing", "Class of 2026", "International Economics and Trade", "Updated Aug 5, 2026"],
    },
    projects: { eyebrow: "PROJECTS", title: "Projects as questions, responsibilities and evidence—not a title list.", lead: "Work across cross-border commerce, AIGC, digital trade, product practice and rural fieldwork, with clear roles, process, status and public evidence.", noteTitle: "Evidence boundaries", note: "Ongoing research shows only its design and staged outputs. No download is offered without a real public file or URL." },
    works: { eyebrow: "WORKS", title: "Tangible outputs, separate from project experience.", lead: "Systems, research frameworks, field reports, presentation materials and the public resume are archived by output type.", note: "Non-public entries describe the output scope without presenting empty links." },
    detail: { overview: "Overview", background: "Background", questions: "Core questions", responsibilities: "My responsibilities", process: "Process", outcomes: "Outcomes", evidence: "Evidence & materials", reflection: "Limitations & reflection", previous: "Previous project", next: "Next project", all: "All projects", period: "Period", status: "Status", level: "Type", role: "My role" },
    about: { focusTitle: "Areas of focus", focuses: ["Cross-border commerce", "Applied AIGC", "Digital trade", "Data research", "Product practice"], toolsTitle: "Tools & methods", tools: [{ title: "Research & analysis", items: ["SPSS", "Stata", "Excel", "Python"] }, { title: "AI & workflow", items: ["ChatGPT", "Claude", "Codex", "Gemini"] }, { title: "Product & deployment", items: ["Next.js", "Vercel", "Cloudflare", "Basic Supabase"] }, { title: "Communication & delivery", items: ["Project plans", "Research reports", "Presentation materials", "Product prototypes"] }] },
    contact: { topicsTitle: "Good reasons to get in touch", topics: ["Project exchange", "AIGC and cross-border commerce", "Product collaboration", "Research material exchange", "Website and tool feedback"] },
    resume: { privacy: "The public version removes sensitive details including phone number, date of birth and political affiliation." },
  },
};
