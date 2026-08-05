# Wang Bo Personal Website

王波的中英双语个人官网，展示个人介绍、项目作品、公开简历与联系方式。

## 页面

- `/zh`、`/en`：个人主页
- `/[locale]/about`：关于我
- `/[locale]/projects`：项目作品
- `/[locale]/projects/[slug]`：项目详情
- `/[locale]/works`：作品档案
- `/[locale]/resume`：公开简历
- `/[locale]/contact`：联系方式

## 本地运行

```bash
npm install
npm run dev
```

生产检查：

```bash
npm run lint
npm run typecheck
npm run build
```

## 部署

项目为标准 Next.js App Router 应用，生产环境通过 Vercel 部署，主域名为 `paperhelper.fun`。推送 `main` 分支后会触发生产部署。

## 隐私

网站与公开下载简历不展示手机号、出生年月或政治面貌。完整投递版简历仅保存在本地交付目录中，不提交到本仓库。

## 内容维护

- 新增项目：在 `src/lib/projects.ts` 的 `projects` 数组中添加一项，同时填写 `zh` / `en` 两套 `localeContent`。项目 slug 必须保持语言无关；只有真实存在的外部地址才加入 `links`。
- 新增作品：在 `src/lib/works.ts` 的 `works` 数组中添加一项。没有公开文件时不要填写 `href` 或 `downloadHref`，并使用 `organizing`、`summary-only` 或 `private` 状态。
- 公共页面文字：导航与既有个人信息在 `src/lib/content.ts`，新增页面与案例界面文案在 `src/lib/site-copy.ts`。
