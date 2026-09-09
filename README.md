# Wang Bo Personal Website

王波的中文个人官网，展示个人介绍、项目作品、公开简历与联系方式。

## 页面

- `/zh`：个人主页
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

项目为标准 Next.js App Router 应用，生产环境通过 Vercel 部署，主域名为 `www.myboverse.com`。推送 `main` 分支后会触发生产部署。

## 隐私

网站与公开下载简历不展示手机号、出生年月或政治面貌。完整投递版简历仅保存在本地交付目录中，不提交到本仓库。

## 内容维护

网站提供 `/studio` 内容后台（`/admin` 会自动跳转过去）。配置完成后，可在 Sanity Studio 编辑中文文案、项目和作品，不需要修改源码；发布内容后网站会自动读取更新。

### 首次配置

1. 在 [Sanity Manage](https://www.sanity.io/manage) 创建项目和 `production` 数据集，并把自己的账号加入项目成员。
2. 复制 `.env.example` 为 `.env.local`，填入 `NEXT_PUBLIC_SANITY_PROJECT_ID` 和 `NEXT_PUBLIC_SANITY_DATASET`。
3. 在 Sanity 项目中创建一个具有写入权限的 API token，只在本地临时填入 `SANITY_API_WRITE_TOKEN`，运行 `npm run seed:sanity`，把现有网站内容导入 Sanity。
4. 启动网站后打开 `http://localhost:3000/studio`；生产环境打开 `https://www.myboverse.com/studio`。登录 Sanity 账号即可编辑和发布。
5. 在 Vercel 项目中添加前两个 `NEXT_PUBLIC_*` 环境变量并重新部署一次。`SANITY_API_WRITE_TOKEN` 不需要配置到 Vercel。

未配置 Sanity 时，网站使用仓库中的现有内容。配置 Sanity 后，线上内容以 `production` 数据集为准；读取失败会直接暴露错误，避免用旧的本地内容掩盖漏导入问题。

项目 slug 必须保持语言无关；只有真实存在的外部地址才加入 `links`。没有公开文件的作品不要填写 `href` 或 `downloadHref`，并使用 `organizing`、`summary-only` 或 `private` 状态。Sanity Studio 中的 `order` 字段控制项目和作品的展示顺序。
