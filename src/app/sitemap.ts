import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://paperhelper.fun";
  const routes = ["", "/about", "/projects", "/resume", "/contact"];
  return ["zh", "en"].flatMap((locale) => routes.map((route) => ({ url: `${base}/${locale}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : 0.7 })));
}
