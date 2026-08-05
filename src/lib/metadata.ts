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
  en: {
    home: "Wang Bo’s personal website: profile, selected projects, resume and contact.",
    about: "Learn about Wang Bo’s education, path and working principles.",
    projects: "Selected projects in cross-border commerce, DTC and applied AIGC.",
    works: "Wang Bo’s archive of product, research, data and presentation outputs.",
    resume: "Wang Bo’s public resume: education, projects, campus experience, skills and awards.",
    contact: "Contact Wang Bo by email or GitHub.",
  },
} as const;

const titles = {
  zh: { home: "个人官网", about: "关于我", projects: "项目", works: "作品", resume: "个人简历", contact: "联系我" },
  en: { home: "Personal website", about: "About", projects: "Projects", works: "Works", resume: "Resume", contact: "Contact" },
} as const;

export function pageMetadata(locale: Locale, page: keyof typeof titles.zh, pathname = ""): Metadata {
  const suffix = pathname ? `/${pathname}` : "";
  return {
    title: titles[locale][page],
    description: descriptions[locale][page],
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: { "zh-CN": `/zh${suffix}`, "en-US": `/en${suffix}` },
    },
    openGraph: {
      title: `${titles[locale][page]} | ${locale === "zh" ? "王波" : "Wang Bo"}`,
      description: descriptions[locale][page],
      url: `/${locale}${suffix}`,
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
  };
}
