import type { Locale } from "./content";
import type { ProjectStatus } from "./types";

export type SiteCopy = {
  ui: { personName: string; latinName: string; monogram: string; homeAria: string; menuOpen: string; menuClose: string; primaryNavAria: string; footerGithub: string; profileIndexLabel: string; focusIndexLabel: string; projectLabel: string; evidenceNoteLabel: string; projectPaginationAria: string; projectFilterAria: string; emailLabel: string; githubLabel: string; githubDisplay: string; privacyLabel: string; resumeOpenInNewTab: string; emailSubject: string };
  migration: { eyebrow: string; close: string; title: string; description: string; visit: string; stay: string; displayDomain: string };
  home: { projectsKicker: string; projectsTitle: string; worksKicker: string; worksTitle: string; worksIntro: string; currentKicker: string; currentTitle: string; currentItems: string[]; viewAllProjects: string; viewWorks: string; identity: string[] };
  projects: { eyebrow: string; title: string; lead: string; noteTitle: string; note: string; categories: { all: string; crossBorder: string; aigc: string; digitalTrade: string; product: string; dataResearch: string; ruralResearch: string }; statuses: Record<ProjectStatus, string>; roleLabel: string; viewCase: string; empty: string };
  works: { eyebrow: string; title: string; lead: string; note: string; types: { productSystem: string; researchReport: string; dataAnalysis: string; prototype: string; presentation: string; visualDesign: string; video: string }; statuses: { public: string; organizing: string; summaryOnly: string; private: string }; relatedProject: string; view: string };
  detail: Record<string, string>;
  about: { profileIndex: string[]; focusTitle: string; focuses: string[]; toolsTitle: string; tools: Array<{ title: string; items: string[] }> };
  contact: { topicsTitle: string; topics: string[] };
  resume: { privacy: string };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  zh: {
    ui: { personName: "王波", latinName: "WANG BO", monogram: "WB", homeAria: "返回首页", menuOpen: "菜单", menuClose: "关闭", primaryNavAria: "主导航", footerGithub: "GitHub", profileIndexLabel: "PROFILE INDEX / 04", focusIndexLabel: "FOCUS INDEX / 04", projectLabel: "PROJECT", evidenceNoteLabel: "EVIDENCE NOTE", projectPaginationAria: "项目翻页", projectFilterAria: "按项目类别筛选", emailLabel: "EMAIL", githubLabel: "GITHUB", githubDisplay: "github.com/03Wan", privacyLabel: "PRIVACY", resumeOpenInNewTab: "新窗口查看", emailSubject: "来自个人网站的联系" },
    migration: { eyebrow: "DOMAIN UPDATE / 01", close: "关闭", title: "智选优发已启用新域名", description: "智选优发现已迁移至新的官方网站。后续产品介绍与更新将在新站发布，建议使用并收藏新地址。", visit: "前往智选优发新官网", stay: "暂时留在个人官网", displayDomain: "zhixuanyoufa.myboverse.com" },
    home: {
      projectsKicker: "SELECTED PROJECTS / 精选项目", projectsTitle: "从问题出发，用过程与证据说明实践。", worksKicker: "SELECTED WORKS / 精选作品", worksTitle: "把研究、系统与材料整理为可查看的产出。", worksIntro: "作品页只展示真实产出；未公开内容会明确标注状态。", currentKicker: "NOW / 当前正在做", currentTitle: "正在推进的四件事", currentItems: ["完善智选优发系统", "推进数字贸易壁垒相关研究", "整理乡村调研成果", "建设个人作品档案"], viewAllProjects: "查看全部项目", viewWorks: "浏览作品", identity: ["南京", "2026 届本科毕业生", "国际经济与贸易", "更新于 2026-08-05"],
    },
    projects: { eyebrow: "PROJECTS / 项目", title: "项目不是标题清单，而是问题、职责与证据。", lead: "这里记录跨境电商、AIGC、数字贸易、产品实践与实地调研。每个项目均说明个人角色、工作过程、当前状态与可公开材料。", noteTitle: "证据边界", note: "进行中的研究仅展示设计与阶段性成果；没有公开文件或真实链接时，不提供下载入口。", categories: { all: "全部", crossBorder: "跨境电商", aigc: "AIGC", digitalTrade: "数字贸易", product: "产品实践", dataResearch: "数据研究", ruralResearch: "乡村调研" }, statuses: { completed: "已完成", ongoing: "进行中", archived: "已归档" }, roleLabel: "角色", viewCase: "查看详情", empty: "该分类暂无项目。" },
    works: { eyebrow: "WORKS / 作品", title: "真实产出，与项目经历分开呈现。", lead: "系统、研究框架、调研报告、演示材料和公开简历在这里按产出形式归档。", note: "未公开条目用于说明产出范围，不提供空链接。", types: { productSystem: "产品与系统", researchReport: "研究报告", dataAnalysis: "数据分析", prototype: "产品原型", presentation: "演示材料", visualDesign: "视觉设计", video: "视频内容" }, statuses: { public: "已公开", organizing: "正在整理", summaryOnly: "仅展示摘要", private: "暂未公开" }, relatedProject: "关联项目", view: "查看" },
    detail: { overview: "项目概述", background: "项目背景", questions: "核心问题", responsibilities: "我的职责", process: "工作过程", outcomes: "项目成果", evidence: "证据与材料", reflection: "限制与反思", previous: "上一个项目", next: "下一个项目", all: "全部项目", period: "时间", status: "状态", level: "性质", role: "我的角色" },
    about: { profileIndex: ["经贸专业基础", "研究与内容表达", "AI 工具应用", "项目组织推进"], focusTitle: "关注方向", focuses: ["跨境电商", "AIGC 实际应用", "数字贸易", "数据研究", "产品实践"], toolsTitle: "工具与方法", tools: [{ title: "研究与分析", items: ["SPSS", "Stata", "Excel", "Python"] }, { title: "AI 与工作流", items: ["ChatGPT", "Claude", "Codex", "Gemini"] }, { title: "产品与部署", items: ["Next.js", "Sanity", "Vercel", "Cloudflare"] }, { title: "表达与交付", items: ["项目计划书", "调研报告", "演示材料", "产品原型"] }] },
    contact: { topicsTitle: "适合联系我的主题", topics: ["项目交流", "AIGC 与跨境电商讨论", "产品合作", "研究资料交流", "网站与工具反馈"] },
    resume: { privacy: "公开版本已对手机号、出生年月、政治面貌等敏感信息进行处理。" },
  },
};
