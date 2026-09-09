export const locales = ["zh"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const shared = {
  email: "wangbo030127@gmail.com",
  github: "https://github.com/03Wan",
  site: "https://www.myboverse.com",
  migrationSite: "https://zhixuanyoufa.myboverse.com/",
  resumePath: "/resume-wangbo-public.pdf",
};

export const content = {
  zh: {
    brand: "WANG BO",
    nav: { home: "首页", about: "关于", projects: "项目", works: "作品", resume: "简历", contact: "联系" },
    common: {
      viewProjects: "查看项目",
      contactMe: "联系我",
      downloadResume: "下载公开简历",
    },
    home: {
      eyebrow: "个人官网 · 南京 / Nanjing",
      title: "在商业问题与 AI 工具之间，寻找可落地的连接。",
      intro: "我是王波，2026 届国际经济与贸易本科毕业生。我关注跨境电商、数字营销与 AIGC 的实际应用，也重视把复杂问题转化为清晰、可执行的方案。",
      status: "开放交流与合作",
      focuses: [
        { index: "01", title: "跨境电商", text: "从市场、用户与转化链路出发，理解品牌出海中的真实业务问题。" },
        { index: "02", title: "AI 应用", text: "探索生成式 AI 在内容生产、营销优化和工作流程中的实用价值。" },
        { index: "03", title: "组织与表达", text: "通过项目统筹、活动执行和结构化写作，让团队协作更高效。" },
      ],
    },
    about: {
      eyebrow: "ABOUT / 关于",
      title: "从经贸学习出发，持续向技术与真实业务靠近。",
      lead: "我喜欢理解一件事为什么发生，也愿意把答案落实成清晰的研究、方案或协作过程。",
      storyTitle: "本人介绍",
      story: [
        "我本科就读于三江学院国际经济与贸易专业，系统学习微观经济学、宏观经济学、基础会计学、国际贸易实务、国际货运代理实务、金融学、统计学、计量经济学、国际结算与国际商务谈判等课程，专业排名前 15%。",
        "项目实践让我开始关注数字营销、市场调研与 AI 工具如何共同服务跨境业务。学生干部经历则训练了我的统筹、沟通和执行能力：把信息说清楚，把流程接起来，把事情推进到完成。",
        "我不把 AI 当作替代思考的捷径，而把它视作拓展研究与表达能力的工具。未来也希望继续在商业理解、内容表达和技术应用的交叉处积累作品。",
      ],
      principlesTitle: "做事方式",
      principles: [
        { title: "先理解问题", text: "在行动前厘清目标、对象和约束，避免只处理表面任务。" },
        { title: "结构化表达", text: "让信息有层级、有依据，也让合作方容易理解和继续行动。" },
        { title: "推进到落地", text: "关注执行细节、沟通节奏和最终交付，而不止停留在想法。" },
      ],
      educationTitle: "教育背景",
      education: "三江学院 · 国际经济与贸易（本科）",
      educationMeta: "2022.09 — 2026.06 · 专业排名前 15%",
    },
    resume: {
      eyebrow: "RESUME / 简历",
      title: "一页了解我的教育、能力与实践经历。",
      lead: "网页版本已隐藏手机号、出生年月和政治面貌。需要完整联系方式时，请通过邮箱联系。",
      educationTitle: "教育背景",
      experienceTitle: "校园经历",
      projectsTitle: "项目经历",
      skillsTitle: "技能与证书",
      awardsTitle: "获奖情况",
      profileTitle: "个人概述",
      profile: "具备国际经济与贸易专业基础，关注跨境电商、数字营销与 AI 技术应用。学生干部与项目主持经历培养了统筹规划、沟通协调、正式表达和持续推进能力。",
      education: { school: "三江学院", major: "国际经济与贸易（本科）", period: "2022.09 — 2026.06", detail: "专业排名前 15%" },
      experiences: [
        { role: "班长", period: "2022.09 — 2026.06", bullets: ["统筹 30+ 人班级日常事务，对接辅导员与学院，确保通知准确传达。", "主导班级团建、志愿活动与学风建设等活动 10+ 场。", "协助奖学金评定、考勤和心理健康等信息收集与整理。"] },
        { role: "校团委组织部干事", period: "2024.05 — 2026.05", bullets: ["协助策划和执行主题团日、入团仪式等校级活动 10+ 场。", "负责策划方案和总结材料，积累正式写作与结构化表达经验。", "参与团员发展流程、档案整理和系统录入，确保数据准确、流程合规。"] },
      ],
      skills: ["CET-4 / CET-6", "全国初级会计证书", "普通话二级甲等", "跨境电商 B2B 数据运营职业技能高级等级证书", "全国计算机一级考试证书（优秀）", "WPS / Microsoft Office", "ChatGPT / Gemini 等 AI 工具"],
      awards: ["2022—2023 年度三好学生", "2022—2023 年度优秀学生干部", "2024 年度优秀共青团员", "2023 年第九届 OCALE 全国跨境电商创新创业大赛团队三等奖", "2023 年全国高校商业精英挑战赛创新创业竞赛创业模拟赛道三等奖", "2023 年全国高校商业精英挑战赛国际贸易竞赛三等奖"],
    },
    contact: {
      eyebrow: "CONTACT / 联系",
      title: "如果你也对商业、内容与 AI 的交叉感兴趣，欢迎联系。",
      lead: "无论是项目交流、学习讨论还是合作想法，都可以通过邮箱找到我。",
      emailTitle: "发送邮件",
      emailText: "欢迎联系，我会在看到后尽快回复。",
      githubTitle: "查看 GitHub",
      githubText: "浏览我的公开仓库、网站源码和后续项目更新。",
      privacy: "为保护个人隐私，本网站不公开手机号、出生日期和政治面貌，也不收集访客表单数据。",
    },
    footer: { line: "在商业理解、内容表达与 AI 应用之间持续探索。", rights: "保留所有权利。" },
    shared,
  },
} as const;

export type SiteContent = (typeof content)[Locale];
