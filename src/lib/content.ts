export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const shared = {
  email: "wangbo030127@gmail.com",
  github: "https://github.com/03Wan",
  site: "https://paperhelper.fun",
};

export const content = {
  zh: {
    localeName: "中文",
    brand: "WANG BO",
    nav: { home: "首页", about: "关于", projects: "项目", works: "作品", resume: "简历", contact: "联系" },
    common: {
      viewProjects: "查看项目",
      viewResume: "个人简历",
      contactMe: "联系我",
      downloadResume: "下载公开简历",
      period: "时间",
      role: "角色",
      firstLead: "第一主持人",
      readMore: "了解更多",
      current: "当前关注",
    },
    home: {
      eyebrow: "个人官网 · 南京 / Nanjing",
      title: "在商业问题与 AI 工具之间，寻找可落地的连接。",
      intro: "我是王波，2026 届国际经济与贸易本科毕业生。我关注跨境电商、数字营销与 AIGC 的实际应用，也重视把复杂问题转化为清晰、可执行的方案。",
      status: "开放交流与合作",
      focusTitle: "我正在关注",
      focuses: [
        { index: "01", title: "跨境电商", text: "从市场、用户与转化链路出发，理解品牌出海中的真实业务问题。" },
        { index: "02", title: "AI 应用", text: "探索生成式 AI 在内容生产、营销优化和工作流程中的实用价值。" },
        { index: "03", title: "组织与表达", text: "通过项目统筹、活动执行和结构化写作，让团队协作更高效。" },
      ],
      projectsTitle: "精选项目",
      projectsIntro: "两项围绕跨境电商与技术应用展开的研究实践。",
      numbers: [
        { value: "Top 15%", label: "专业排名" },
        { value: "2", label: "主持项目" },
        { value: "10+", label: "活动执行" },
      ],
      quote: "保持好奇，也保持把事情做完的耐心。",
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
    projects: {
      eyebrow: "PROJECTS / 项目",
      title: "把研究问题转化为有结构的项目实践。",
      lead: "以下项目均来自在校期间的真实研究实践。内容聚焦问题、方法和个人职责，不添加未经验证的商业结果。",
      items: [
        {
          number: "01",
          title: "中国鞋业 DTC 出海之路",
          level: "校级项目",
          period: "2023.05 — 2024.05",
          role: "第一主持人",
          summary: "围绕中国鞋业品牌通过 DTC 模式拓展海外市场，研究线上营销与用户转化路径。",
          details: ["组织项目调研与阶段推进，梳理品牌出海中的市场、渠道和用户问题。", "参与研究框架、方案内容与汇报材料的整合，推动团队形成一致表达。", "通过项目实践加深对国际贸易与跨境电商业务链路的理解。"],
          tags: ["DTC", "跨境电商", "市场调研", "项目统筹"],
        },
        {
          number: "02",
          title: "AIGC 应用于跨境电商出海的机制及对策研究",
          level: "国家级项目",
          period: "2025.05 — 2026.05",
          role: "第一主持人",
          summary: "研究 AIGC 如何赋能跨境电商出海流程，关注内容生成、营销优化等实际应用机制。",
          details: ["围绕 AIGC 与跨境业务的结合点搭建研究框架，梳理典型应用场景。", "组织资料分析、讨论与阶段性输出，形成针对实际问题的对策建议。", "在研究过程中提升前沿技术理解、市场分析、策略制定与跨文化沟通能力。"],
          tags: ["AIGC", "跨境出海", "内容生成", "策略研究"],
        },
      ],
      noteTitle: "持续更新",
      note: "这里会继续收录我完成的研究、工具尝试与可公开项目。每个条目都将说明问题、过程与真实产出。",
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
  en: {
    localeName: "English",
    brand: "WANG BO",
    nav: { home: "Home", about: "About", projects: "Projects", works: "Works", resume: "Resume", contact: "Contact" },
    common: { viewProjects: "View projects", viewResume: "Resume", contactMe: "Contact me", downloadResume: "Download public resume", period: "Period", role: "Role", firstLead: "Project lead", readMore: "Learn more", current: "Current focus" },
    home: {
      eyebrow: "PERSONAL WEBSITE · NANJING",
      title: "Connecting business questions with practical AI tools.",
      intro: "I’m Wang Bo, a 2026 graduate in International Economics and Trade. I explore cross-border e-commerce, digital marketing and practical AIGC applications, with a focus on turning complex questions into clear, actionable work.",
      status: "Open to conversations and collaboration",
      focusTitle: "What I’m exploring",
      focuses: [
        { index: "01", title: "Cross-border commerce", text: "Understanding real brand expansion challenges through markets, users and conversion journeys." },
        { index: "02", title: "Applied AI", text: "Exploring practical uses of generative AI in content, marketing and everyday workflows." },
        { index: "03", title: "Organization & communication", text: "Making collaboration clearer through project coordination, execution and structured writing." },
      ],
      projectsTitle: "Selected projects",
      projectsIntro: "Two research projects at the intersection of cross-border commerce and technology.",
      numbers: [{ value: "Top 15%", label: "Major ranking" }, { value: "2", label: "Projects led" }, { value: "10+", label: "Activities delivered" }],
      quote: "Stay curious, and stay patient enough to finish the work.",
    },
    about: {
      eyebrow: "ABOUT",
      title: "Starting with international trade, moving closer to technology and real business.",
      lead: "I enjoy understanding why things happen—and turning that understanding into clear research, plans and collaborative work.",
      storyTitle: "My path",
      story: [
        "I studied International Economics and Trade at Sanjiang University, ranking in the top 15% of my major. My coursework covered economics, accounting, international trade operations, freight forwarding, finance, statistics, econometrics, settlement and business negotiation.",
        "Project work drew my attention to the way digital marketing, market research and AI tools can support cross-border business. Student leadership strengthened a different set of skills: coordinating people, clarifying information and moving work from intention to completion.",
        "I see AI as a tool for extending research and communication—not a shortcut around thinking. I hope to keep building work where business understanding, clear expression and technology meet.",
      ],
      principlesTitle: "How I work",
      principles: [
        { title: "Understand first", text: "Clarify the goal, audience and constraints before acting on the surface task." },
        { title: "Communicate in structure", text: "Give information hierarchy and evidence so others can understand and act." },
        { title: "Carry work through", text: "Pay attention to execution details, communication rhythm and the final delivery." },
      ],
      educationTitle: "Education",
      education: "Sanjiang University · International Economics and Trade (B.A.)",
      educationMeta: "Sep 2022 — Jun 2026 · Top 15% in major",
    },
    projects: {
      eyebrow: "PROJECTS",
      title: "Turning research questions into structured project work.",
      lead: "These are verified academic projects. The descriptions focus on the question, process and my responsibilities without inventing commercial outcomes.",
      items: [
        { number: "01", title: "The DTC Path for Chinese Footwear Brands", level: "University-level project", period: "May 2023 — May 2024", role: "Project lead", summary: "A study of how Chinese footwear brands can use DTC models to expand overseas, focusing on online marketing and user conversion.", details: ["Coordinated research and milestones while mapping market, channel and user questions in overseas expansion.", "Integrated the research framework, proposed approach and presentation materials into a consistent team narrative.", "Developed a more practical understanding of international trade and cross-border e-commerce journeys."], tags: ["DTC", "Cross-border commerce", "Market research", "Coordination"] },
        { number: "02", title: "AIGC Mechanisms and Strategies for Cross-border E-commerce", level: "National-level project", period: "May 2025 — May 2026", role: "Project lead", summary: "A study of how AIGC can support cross-border e-commerce, including content generation and marketing optimization.", details: ["Built a research framework around the intersection of AIGC and cross-border business and mapped representative use cases.", "Coordinated source analysis, discussion and staged outputs to develop responses to practical questions.", "Strengthened my understanding of emerging technology, market analysis, strategy and cross-cultural communication."], tags: ["AIGC", "Global commerce", "Content generation", "Strategy"] },
      ],
      noteTitle: "More to come",
      note: "This space will grow with new research, tools and public projects. Each entry will explain the problem, process and real output.",
    },
    resume: {
      eyebrow: "RESUME",
      title: "A concise view of my education, skills and practical experience.",
      lead: "This web version omits my phone number, date of birth and political affiliation. Please email me if you need a complete resume.",
      educationTitle: "Education", experienceTitle: "Campus experience", projectsTitle: "Projects", skillsTitle: "Skills & certificates", awardsTitle: "Awards", profileTitle: "Profile",
      profile: "International Economics and Trade graduate interested in cross-border e-commerce, digital marketing and applied AI. Leadership and project experience strengthened my planning, coordination, formal communication and delivery skills.",
      education: { school: "Sanjiang University", major: "International Economics and Trade (B.A.)", period: "Sep 2022 — Jun 2026", detail: "Top 15% in major" },
      experiences: [
        { role: "Class President", period: "Sep 2022 — Jun 2026", bullets: ["Coordinated daily matters for a class of 30+ students and communicated with faculty and the school.", "Led 10+ class activities covering team building, volunteering and academic culture.", "Supported information collection for scholarships, attendance and student wellbeing."] },
        { role: "Officer, University Youth League Organization Department", period: "May 2024 — May 2026", bullets: ["Supported 10+ university events including themed activities and induction ceremonies.", "Prepared plans and summaries, developing formal and structured writing skills.", "Supported member development workflows, archives and system records with attention to accuracy and compliance."] },
      ],
      skills: ["CET-4 / CET-6", "Junior Accounting Certificate", "Mandarin Proficiency Test: Level 2-A", "Advanced Cross-border E-commerce B2B Data Operations Certificate", "National Computer Rank Examination Level 1 (Excellent)", "WPS / Microsoft Office", "ChatGPT / Gemini and other AI tools"],
      awards: ["Merit Student, 2022–2023", "Outstanding Student Leader, 2022–2023", "Outstanding Youth League Member, 2024", "Third Prize, 9th OCALE National Cross-border E-commerce Innovation & Entrepreneurship Competition, 2023", "Third Prize, National University Business Elite Challenge—Entrepreneurship Simulation, 2023", "Third Prize, National University Business Elite Challenge—International Trade, 2023"],
    },
    contact: {
      eyebrow: "CONTACT",
      title: "If you’re interested in the intersection of business, content and AI, let’s talk.",
      lead: "For project exchanges, learning conversations or collaboration ideas, email is the best way to reach me.",
      emailTitle: "Send an email", emailText: "The most direct way to contact me. I’ll reply as soon as I can.", githubTitle: "Visit GitHub", githubText: "Browse my public repositories, website source and future project updates.", privacy: "For privacy, this site does not publish my phone number, date of birth or political affiliation, and it collects no visitor form data.",
    },
    footer: { line: "Exploring the space between business understanding, communication and applied AI.", rights: "All rights reserved." },
    shared,
  },
} as const;

export type SiteContent = (typeof content)[Locale];

export function getContent(locale: Locale) {
  return content[locale];
}
