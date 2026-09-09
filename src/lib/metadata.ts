import type { Metadata } from "next";
import type { Locale } from "./content";

const descriptions = {
  zh: {
    home: "王波的个人官网，记录个人介绍、项目作品、简历与联系方式。",
    about: "了解王波的教育背景、个人路径和做事方式。",
    projects: "王波在跨境电商、DTC 与 AIGC 应用方向的项目作品。",
    works: "王波的产品、研究、数据与展示成果档案。",
    resume: "王波的公开个人简历：教育、项目、校园经历、技能与荣誉。",
    contact: "通过邮箱或 GitHub 联系王波。",
  },
} as const;

const titles = {
  zh: { home: "个人官网", about: "关于我", projects: "项目", works: "作品", resume: "个人简历", contact: "联系我" },
} as const;

export function pageMetadata(locale: Locale, page: keyof typeof titles.zh, pathname = ""): Metadata {
  const suffix = pathname ? `/${pathname}` : "";
  return {
    title: titles[locale][page],
    description: descriptions[locale][page],
    alternates: {
      canonical: `/${locale}${suffix}`,
    },
    openGraph: {
      title: `${titles[locale][page]} | 王波`,
      description: descriptions[locale][page],
      url: `/${locale}${suffix}`,
      locale: "zh_CN",
    },
  };
}
