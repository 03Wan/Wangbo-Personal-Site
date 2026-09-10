import type { Metadata } from "next";
import type { Locale } from "./content";

const descriptions = {
  zh: {
    home: "王波的个人品牌与求职作品集，展示跨境业务、数据分析、AI 工具应用和联系方式。",
    about: "了解王波的教育背景、核心能力与荣誉。",
    projects: "王波在跨境业务、市场研究、数据分析与 AIGC 应用方向的项目案例。",
    resume: "王波的公开个人简历：教育、项目、经历、技能与荣誉。",
    contact: "通过邮箱或 GitHub 联系王波。",
  },
} as const;

const titles = {
  zh: { home: "个人官网", about: "关于", projects: "项目案例", resume: "个人简历", contact: "联系" },
} as const;

export function pageMetadata(locale: Locale, page: keyof typeof titles.zh, pathname = ""): Metadata {
  const suffix = pathname ? `/${pathname}` : "";
  return {
    title: page === "home" ? { absolute: "个人官网|王波" } : titles[locale][page],
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
