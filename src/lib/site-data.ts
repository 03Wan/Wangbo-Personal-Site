import { cache } from "react";
import { groq } from "next-sanity";
import { portfolioDefaults } from "@/lib/default-data";
import { getSanityClient } from "@/sanity/lib/client";
import type { DisplaySettings, DomainNotice, PortfolioData, Project, ProjectStatus, SiteAppearance } from "@/lib/types";

export type SiteData = PortfolioData;

const siteDataQuery = groq`{
  "profile": *[_type == "profile"][0] { ..., "resumePath": resumeFile.asset->url, "heroIllustrationUrl": heroIllustration->image.asset->url },
  "displaySettings": *[_type == "displaySettings"][0]{showHome, showProjects, showResume, showAbout, showContact, showFooter, showGithub, showResumeDownload, zhixuanNotice{enabled, title, description, url}},
  "siteAppearance": *[_type == "siteAppearance"][0]{themePreset, accentColor, backgroundColor, textColor, fontStyle, contentWidth, spacing, headingScale, bodyScale},
  "education": *[_type == "education"] | order(order asc),
  "experiences": *[_type == "experience"] | order(order asc),
  "awards": *[_type == "award"] | order(order asc),
  "skills": *[_type == "skill"] | order(order asc),
  "certificates": *[_type == "certificate"] | order(order asc),
  "projects": *[_type == "project"] | order(order asc) {
    "slug": slug.current, title, category, status, period, role, summary, background,
    responsibilities, actions, results, skills,
    "gallery": gallery[]{"url": asset->url, alt, caption},
    attachments[]{title, kind, description, href}, links[]{label, href, type},
    featured, resumeVisible, order
  }
}`;

type RawProject = Partial<Project>;
type RawDisplaySettings = Omit<Partial<DisplaySettings>, "zhixuanNotice"> & { zhixuanNotice?: Partial<DomainNotice> };
type RawData = Partial<PortfolioData> & { projects?: RawProject[]; displaySettings?: RawDisplaySettings | null; siteAppearance?: Partial<SiteAppearance> | null };
const projectStatuses: ProjectStatus[] = ["completed", "ongoing", "archived"];

function list(value: unknown): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : []; }

function normalizeProject(raw: RawProject, index: number): Project {
  const status = projectStatuses.includes(raw.status as ProjectStatus) ? raw.status as ProjectStatus : "completed";
  return {
    slug: typeof raw.slug === "string" ? raw.slug : "", title: raw.title || "未命名项目", category: Array.isArray(raw.category) ? raw.category : [],
    status, period: raw.period || "", role: list(raw.role), summary: raw.summary || "", background: raw.background || "",
    responsibilities: list(raw.responsibilities), actions: list(raw.actions), results: list(raw.results), skills: list(raw.skills),
    gallery: Array.isArray(raw.gallery) ? raw.gallery.filter((item) => item && typeof item.alt === "string") : [], attachments: Array.isArray(raw.attachments) ? raw.attachments.filter((item) => item && typeof item.title === "string") : [], links: Array.isArray(raw.links) ? raw.links.filter((item) => item && typeof item.label === "string" && typeof item.href === "string") : [],
    featured: Boolean(raw.featured), resumeVisible: raw.resumeVisible ?? true, order: typeof raw.order === "number" ? raw.order : index,
  };
}
function choose<T>(items: T[] | undefined, fallback: T[]): T[] { return Array.isArray(items) && items.length > 0 ? items : fallback; }
function displaySettings(raw: RawDisplaySettings | null | undefined): DisplaySettings {
  const defaults = portfolioDefaults.displaySettings;
  return {
    showHome: raw?.showHome ?? defaults.showHome,
    showProjects: raw?.showProjects ?? defaults.showProjects,
    showResume: raw?.showResume ?? defaults.showResume,
    showAbout: raw?.showAbout ?? defaults.showAbout,
    showContact: raw?.showContact ?? defaults.showContact,
    showFooter: raw?.showFooter ?? defaults.showFooter,
    showGithub: raw?.showGithub ?? defaults.showGithub,
    showResumeDownload: raw?.showResumeDownload ?? defaults.showResumeDownload,
    zhixuanNotice: {
      enabled: raw?.zhixuanNotice?.enabled ?? defaults.zhixuanNotice.enabled,
      title: raw?.zhixuanNotice?.title || defaults.zhixuanNotice.title,
      description: raw?.zhixuanNotice?.description || defaults.zhixuanNotice.description,
      url: raw?.zhixuanNotice?.url || defaults.zhixuanNotice.url,
    },
  };
}
function color(value: string | undefined, fallback: string): string { return /^#[0-9a-f]{6}$/i.test(value || "") ? value! : fallback; }
function choice<T extends string>(value: string | undefined, options: readonly T[], fallback: T): T { return options.includes(value as T) ? value as T : fallback; }
const themeColors = {
  professionalBlue: { accentColor: "#0d55b8", backgroundColor: "#f4f5f7", textColor: "#111317" },
  forest: { accentColor: "#1f6b4f", backgroundColor: "#f4f7f4", textColor: "#16251f" },
  graphite: { accentColor: "#3f4650", backgroundColor: "#f5f5f4", textColor: "#171717" },
} as const;
function siteAppearance(raw: Partial<SiteAppearance> | null | undefined): SiteAppearance {
  const defaults = portfolioDefaults.siteAppearance;
  const themePreset = choice(raw?.themePreset, ["professionalBlue", "forest", "graphite", "custom"], defaults.themePreset);
  const palette = themePreset === "custom" ? defaults : themeColors[themePreset];
  return {
    themePreset,
    accentColor: themePreset === "custom" ? color(raw?.accentColor, defaults.accentColor) : palette.accentColor,
    backgroundColor: themePreset === "custom" ? color(raw?.backgroundColor, defaults.backgroundColor) : palette.backgroundColor,
    textColor: themePreset === "custom" ? color(raw?.textColor, defaults.textColor) : palette.textColor,
    fontStyle: choice(raw?.fontStyle, ["sans", "serif"], defaults.fontStyle),
    contentWidth: choice(raw?.contentWidth, ["standard", "wide"], defaults.contentWidth),
    spacing: choice(raw?.spacing, ["compact", "comfortable"], defaults.spacing),
    headingScale: choice(raw?.headingScale, ["standard", "large"], defaults.headingScale),
    bodyScale: choice(raw?.bodyScale, ["standard", "large"], defaults.bodyScale),
  };
}
export const getSiteData = cache(async (): Promise<SiteData> => {
  const client = getSanityClient();
  if (!client) return portfolioDefaults;
  let raw: RawData;
  try {
    raw = await client.fetch<RawData>(siteDataQuery, {}, { cache: "no-store" });
  } catch (error) {
    console.error("Unable to load Sanity content; using local fallback data.", error);
    return portfolioDefaults;
  }
  const profile = raw.profile ? { ...portfolioDefaults.profile, ...raw.profile, resumePath: raw.profile.resumePath || undefined, heroIllustrationUrl: raw.profile.heroIllustrationUrl || portfolioDefaults.profile.heroIllustrationUrl } : portfolioDefaults.profile;
  return { profile, displaySettings: displaySettings(raw.displaySettings), siteAppearance: siteAppearance(raw.siteAppearance), education: choose(raw.education, portfolioDefaults.education), experiences: choose(raw.experiences, portfolioDefaults.experiences), awards: choose(raw.awards, portfolioDefaults.awards), skills: choose(raw.skills, portfolioDefaults.skills), certificates: choose(raw.certificates, portfolioDefaults.certificates), projects: choose(raw.projects?.map(normalizeProject).filter((project) => project.slug), portfolioDefaults.projects) };
});
