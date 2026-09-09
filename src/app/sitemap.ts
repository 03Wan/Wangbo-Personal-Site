import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.myboverse.com";
  const routes = ["", "/about", "/projects", "/works", "/resume", "/contact"];
  return ["zh", "en"].flatMap((locale) => [...routes.map((route) => ({ url: `${base}/${locale}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : 0.7 })), ...projects.map((project) => ({ url: `${base}/${locale}/projects/${project.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.65 }))]);
}
