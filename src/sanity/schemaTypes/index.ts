import { defineArrayMember, defineField, defineType } from 'sanity';

const stringArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  });

const text = (name: string, title: string) =>
  defineField({ name, title, type: 'text', rows: 4 });

const processStep = defineType({
  name: 'processStep',
  title: '过程步骤',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: '步骤名称', type: 'string' }),
    text('text', '步骤说明'),
  ],
});

const projectContent = defineType({
  name: 'projectContent',
  title: '项目语言版本',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: '标题', type: 'string' }),
    defineField({ name: 'subtitle', title: '副标题', type: 'string' }),
    text('summary', '摘要'),
    text('background', '项目背景'),
    stringArray('problem', '核心问题'),
    stringArray('responsibilities', '我的职责'),
    defineField({ name: 'process', title: '工作过程', type: 'array', of: [defineArrayMember({ type: 'processStep' })] }),
    stringArray('outcomes', '项目成果'),
    text('reflection', '限制与反思'),
    text('evidenceNote', '证据说明'),
  ],
});

const nav = defineType({
  name: 'navCopy',
  title: '导航文案',
  type: 'object',
  fields: ['home', 'about', 'projects', 'works', 'resume', 'contact'].map((name) =>
    defineField({ name, title: name, type: 'string' }),
  ),
});

const common = defineType({
  name: 'commonCopy',
  title: '通用文案',
  type: 'object',
  fields: [
    ['viewProjects', '查看项目'], ['contactMe', '联系我'], ['downloadResume', '下载公开简历'],
  ].map(([name, title]) => defineField({ name, title, type: 'string' })),
});

const homeContent = defineType({
  name: 'homeContent',
  title: '首页内容',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: '眉题', type: 'string' }),
    defineField({ name: 'title', title: '主标题', type: 'string' }),
    text('intro', '个人简介'),
    defineField({ name: 'status', title: '状态', type: 'string' }),
    defineField({
      name: 'focuses', title: '关注方向', type: 'array',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'index', title: '编号', type: 'string' }),
        defineField({ name: 'title', title: '标题', type: 'string' }),
        text('text', '说明'),
      ] })],
    }),
  ],
});

const aboutContent = defineType({
  name: 'aboutContent',
  title: '关于页内容',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: '眉题', type: 'string' }),
    defineField({ name: 'title', title: '标题', type: 'string' }),
    text('lead', '引导文字'),
    defineField({ name: 'storyTitle', title: '个人介绍标题', type: 'string' }),
    stringArray('story', '个人故事'),
    defineField({ name: 'principlesTitle', title: '做事方式标题', type: 'string' }),
    defineField({
      name: 'principles', title: '做事方式', type: 'array',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'title', title: '标题', type: 'string' }),
        text('text', '说明'),
      ] })],
    }),
    defineField({ name: 'educationTitle', title: '教育背景标题', type: 'string' }),
    defineField({ name: 'education', title: '教育背景', type: 'string' }),
    defineField({ name: 'educationMeta', title: '教育背景补充', type: 'string' }),
  ],
});

const resumeContent = defineType({
  name: 'resumeContent',
  title: '简历页内容',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: '眉题', type: 'string' }),
    defineField({ name: 'title', title: '标题', type: 'string' }),
    text('lead', '引导文字'),
    ...['educationTitle', 'experienceTitle', 'projectsTitle', 'skillsTitle', 'awardsTitle', 'profileTitle'].map((name) => defineField({ name, title: name, type: 'string' })),
    text('profile', '个人概述'),
    defineField({
      name: 'education', title: '教育经历', type: 'object', fields: [
        defineField({ name: 'school', title: '学校', type: 'string' }),
        defineField({ name: 'major', title: '专业', type: 'string' }),
        defineField({ name: 'period', title: '时间', type: 'string' }),
        defineField({ name: 'detail', title: '补充信息', type: 'string' }),
      ],
    }),
    defineField({
      name: 'experiences', title: '校园经历', type: 'array',
      of: [defineArrayMember({ type: 'object', fields: [
        defineField({ name: 'role', title: '角色', type: 'string' }),
        defineField({ name: 'period', title: '时间', type: 'string' }),
        stringArray('bullets', '经历要点'),
      ] })],
    }),
    stringArray('skills', '技能与证书'),
    stringArray('awards', '获奖情况'),
  ],
});

const contactContent = defineType({
  name: 'contactContent',
  title: '联系页内容',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: '眉题', type: 'string' }),
    defineField({ name: 'title', title: '标题', type: 'string' }),
    text('lead', '引导文字'),
    defineField({ name: 'emailTitle', title: '邮箱标题', type: 'string' }),
    text('emailText', '邮箱说明'),
    defineField({ name: 'githubTitle', title: 'GitHub 标题', type: 'string' }),
    text('githubText', 'GitHub 说明'),
    text('privacy', '隐私说明'),
  ],
});

const siteLocaleContent = defineType({
  name: 'siteLocaleContent',
  title: '网站语言内容',
  type: 'object',
  fields: [
    defineField({ name: 'brand', title: '网站名称', type: 'string' }),
    defineField({ name: 'nav', title: '导航', type: 'navCopy' }),
    defineField({ name: 'common', title: '通用按钮', type: 'commonCopy' }),
    defineField({ name: 'home', title: '首页', type: 'homeContent' }),
    defineField({ name: 'about', title: '关于我', type: 'aboutContent' }),
    defineField({ name: 'resume', title: '简历', type: 'resumeContent' }),
    defineField({ name: 'contact', title: '联系', type: 'contactContent' }),
    defineField({
      name: 'footer', title: '页脚', type: 'object', fields: [
        defineField({ name: 'line', title: '页脚说明', type: 'string' }),
        defineField({ name: 'rights', title: '版权说明', type: 'string' }),
      ],
    }),
  ],
});

const toolGroup = defineType({
  name: 'toolGroup',
  title: '工具分组',
  type: 'object',
  fields: [defineField({ name: 'title', title: '分组名称', type: 'string' }), stringArray('items', '工具列表')],
});

const siteCopy = defineType({
  name: 'siteCopy',
  title: '网站辅助文案',
  type: 'object',
  fields: [
    defineField({
      name: 'ui', title: '通用界面文案', type: 'object', fields: [
        'personName', 'latinName', 'monogram', 'homeAria', 'menuOpen', 'menuClose', 'primaryNavAria', 'footerGithub',
        'profileIndexLabel', 'focusIndexLabel', 'projectLabel', 'evidenceNoteLabel', 'projectPaginationAria',
        'projectFilterAria', 'emailLabel', 'githubLabel', 'githubDisplay', 'privacyLabel', 'resumeOpenInNewTab', 'emailSubject',
      ].map((name) => defineField({ name, title: name, type: 'string' })),
    }),
    defineField({
      name: 'migration', title: '域名迁移提示', type: 'object', fields: [
        'eyebrow', 'close', 'title', 'description', 'visit', 'stay', 'displayDomain',
      ].map((name) => defineField({ name, title: name, type: 'string' })),
    }),
    defineField({
      name: 'home', title: '首页辅助文案', type: 'object', fields: [
        ...['projectsKicker', 'projectsTitle', 'worksKicker', 'worksTitle', 'worksIntro', 'currentKicker', 'currentTitle', 'viewAllProjects', 'viewWorks'].map((name) => defineField({ name, title: name, type: 'string' })),
        stringArray('currentItems', '当前事项'), stringArray('identity', '个人信息'),
      ],
    }),
    defineField({
      name: 'projects', title: '项目页辅助文案', type: 'object', fields: [
        ...['eyebrow', 'title', 'lead', 'noteTitle', 'note', 'roleLabel', 'viewCase', 'empty'].map((name) => defineField({ name, title: name, type: 'string' })),
        defineField({ name: 'categories', title: '项目分类名称', type: 'object', fields: ['all', 'crossBorder', 'aigc', 'digitalTrade', 'product', 'dataResearch', 'ruralResearch'].map((name) => defineField({ name, title: name, type: 'string' })) }),
        defineField({ name: 'statuses', title: '项目状态名称', type: 'object', fields: ['completed', 'ongoing', 'archived'].map((name) => defineField({ name, title: name, type: 'string' })) }),
      ],
    }),
    defineField({
      name: 'works', title: '作品页辅助文案', type: 'object', fields: [
        ...['eyebrow', 'title', 'lead', 'note', 'relatedProject', 'view'].map((name) => defineField({ name, title: name, type: 'string' })),
        defineField({ name: 'types', title: '作品类型名称', type: 'object', fields: ['productSystem', 'researchReport', 'dataAnalysis', 'prototype', 'presentation', 'visualDesign', 'video'].map((name) => defineField({ name, title: name, type: 'string' })) }),
        defineField({ name: 'statuses', title: '作品状态名称', type: 'object', fields: ['public', 'organizing', 'summaryOnly', 'private'].map((name) => defineField({ name, title: name, type: 'string' })) }),
      ],
    }),
    defineField({
      name: 'detail', title: '项目详情辅助文案', type: 'object', fields: ['overview', 'background', 'questions', 'responsibilities', 'process', 'outcomes', 'evidence', 'reflection', 'previous', 'next', 'all', 'period', 'status', 'level', 'role'].map((name) => defineField({ name, title: name, type: 'string' })),
    }),
    defineField({
      name: 'about', title: '关于页辅助文案', type: 'object', fields: [
        stringArray('profileIndex', '个人索引'),
        defineField({ name: 'focusTitle', title: '关注方向标题', type: 'string' }), stringArray('focuses', '关注方向'),
        defineField({ name: 'toolsTitle', title: '工具与方法标题', type: 'string' }),
        defineField({ name: 'tools', title: '工具与方法', type: 'array', of: [defineArrayMember({ type: 'toolGroup' })] }),
      ],
    }),
    defineField({
      name: 'contact', title: '联系页辅助文案', type: 'object', fields: [
        defineField({ name: 'topicsTitle', title: '联系主题标题', type: 'string' }), stringArray('topics', '联系主题'),
      ],
    }),
    defineField({ name: 'resume', title: '简历辅助文案', type: 'object', fields: [text('privacy', '隐私说明')] }),
  ],
});

const siteSettings = defineType({
  name: 'siteSettings',
  title: '网站设置',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '文档名称', type: 'string', initialValue: 'Wang Bo Personal Site' }),
    defineField({
      name: 'shared', title: '全站联系方式', type: 'object', fields: [
        defineField({ name: 'email', title: '邮箱', type: 'string' }),
        defineField({ name: 'github', title: 'GitHub 地址', type: 'url' }),
        defineField({ name: 'site', title: '网站地址', type: 'url' }),
        defineField({ name: 'migrationSite', title: '迁移目标网站', type: 'url' }),
        defineField({ name: 'resumePath', title: '公开简历路径', type: 'string' }),
      ],
    }),
    defineField({ name: 'content', title: '网站内容', type: 'siteLocaleContent' }),
    defineField({ name: 'copy', title: '界面辅助文案', type: 'siteCopy' }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: title || '网站设置' }) },
});

const project = defineType({
  name: 'project',
  title: '项目',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '管理标题', type: 'string' }),
    defineField({ name: 'slug', title: '项目网址标识', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: '排序', type: 'number', initialValue: 0 }),
    defineField({ name: 'category', title: '分类', type: 'array', of: [defineArrayMember({ type: 'string' })], options: { list: ['cross-border', 'aigc', 'digital-trade', 'product', 'data-research', 'rural-research'] } }),
    defineField({ name: 'year', title: '年份', type: 'string' }),
    defineField({ name: 'period', title: '时间', type: 'string' }),
    defineField({ name: 'level', title: '项目性质', type: 'string' }),
    defineField({ name: 'status', title: '状态', type: 'string', options: { list: [{ title: '已完成', value: 'completed' }, { title: '进行中', value: 'ongoing' }, { title: '已归档', value: 'archived' }] } }),
    stringArray('role', '角色'), stringArray('tags', '标签'),
    defineField({ name: 'featured', title: '首页精选', type: 'boolean', initialValue: false }),
    defineField({ name: 'links', title: '外部链接', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'label', title: '链接名称', type: 'string' }),
      defineField({ name: 'href', title: '地址', type: 'url' }), defineField({ name: 'type', title: '链接类型', type: 'string', options: { list: ['website', 'github', 'document', 'demo'] } }),
    ] })] }),
    defineField({ name: 'content', title: '项目详情', type: 'projectContent' }),
  ],
  preview: { select: { title: 'content.title', subtitle: 'year' } },
});

const work = defineType({
  name: 'work',
  title: '作品',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: '作品标识', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: '排序', type: 'number', initialValue: 0 }),
    defineField({ name: 'title', title: '标题', type: 'string' }),
    defineField({ name: 'type', title: '作品类型', type: 'string', options: { list: ['product-system', 'research-report', 'data-analysis', 'prototype', 'presentation', 'visual-design', 'video'] } }),
    defineField({ name: 'year', title: '年份', type: 'string' }), text('description', '说明'),
    defineField({ name: 'relatedProjectSlug', title: '关联项目标识', type: 'string' }),
    defineField({ name: 'status', title: '状态', type: 'string', options: { list: ['public', 'organizing', 'summary-only', 'private'] } }),
    defineField({ name: 'href', title: '公开链接', type: 'url' }), defineField({ name: 'downloadHref', title: '下载链接', type: 'string' }),
    defineField({ name: 'isPublic', title: '是否公开', type: 'boolean', initialValue: false }), defineField({ name: 'featured', title: '首页精选', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'title', subtitle: 'year' } },
});

export const schemaTypes = [
  processStep, projectContent, nav, common, homeContent, aboutContent, resumeContent,
  contactContent, siteLocaleContent, toolGroup, siteCopy, siteSettings, project, work,
];
