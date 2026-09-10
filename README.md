# Wang Bo Personal Website

王波的中文个人品牌与求职作品集，展示跨境业务、市场研究、数据分析与 AI 工具应用。

## 页面

- `/zh`：个人主页
- `/[locale]/projects`：项目案例
- `/[locale]/projects/[slug]`：项目详情
- `/[locale]/resume`：公开简历
- `/[locale]/about`：关于
- `/[locale]/contact`：联系方式

`/[locale]/works` 仍会永久跳转到项目案例，保障旧链接可访问；作品、截图、报告与演示材料归入对应项目详情页。

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

项目为标准 Next.js App Router 应用，生产环境通过 Vercel 部署，主域名为 `www.myboverse.com`。推送 `main` 分支后会触发生产部署。

## 隐私

网站与公开下载简历不展示手机号、出生年月或政治面貌。完整投递版简历仅保存在本地交付目录中，不提交到本仓库。

## 内容维护

网站提供 `/studio` 内容后台（`/admin` 会自动跳转过去）。配置完成后，可在 Sanity Studio 维护 `profile`、`project`、`education`、`experience`、`award`、`skill` 和 `certificate` 等结构化内容；首页、简历与关于页复用这些资料。

### 首次配置

1. 在 [Sanity Manage](https://www.sanity.io/manage) 创建项目和 `production` 数据集，并把自己的账号加入项目成员。
2. 复制 `.env.example` 为 `.env.local`，填入 `NEXT_PUBLIC_SANITY_PROJECT_ID` 和 `NEXT_PUBLIC_SANITY_DATASET`。
3. 在 Sanity 项目中创建一个具有写入权限的 API token，只在本地临时填入 `SANITY_API_WRITE_TOKEN`，运行 `npm run seed:sanity`，写入新的结构化内容。已有 `siteSettings`、`work` 和旧项目详情字段不会被删除。
4. 启动网站后打开 `http://localhost:3000/studio`；生产环境打开 `https://www.myboverse.com/studio`。登录 Sanity 账号即可编辑和发布。
5. 在 Vercel 项目中添加前两个 `NEXT_PUBLIC_*` 环境变量并重新部署一次。`SANITY_API_WRITE_TOKEN` 不需要配置到 Vercel。

未配置 Sanity 时，网站使用仓库中的结构化默认数据。配置 Sanity 后，网站优先读取已发布的结构化资料；旧版项目字段仍会被兼容读取，便于分批迁移。

项目 slug 必须保持语言无关；只有真实存在的外部地址才加入 `links` 或附件链接。没有公开文件时保留附件说明即可，不要填写空链接。Sanity Studio 中的 `order` 字段控制资料排序。
