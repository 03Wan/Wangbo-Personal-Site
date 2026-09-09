import type { MetadataRoute } from "next";
import { locales } from "@/lib/content";
import { getSiteData } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { content, projects } = await getSiteData();
  const base = content.zh.shared.site;
  const routes = ["", "/about", "/projects", "/works", "/resume", "/contact"];
  return locales.flatMap((locale) => [...routes.map((route) => ({ url: `${base}/${locale}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : 0.7 })), ...projects.map((project) => ({ url: `${base}/${locale}/projects/${project.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.65 }))]);
}
