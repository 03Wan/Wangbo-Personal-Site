import { cache } from "react";
import { groq } from "next-sanity";
import { portfolioDefaults } from "@/lib/default-data";
import { getSanityClient } from "@/sanity/lib/client";
import type { DisplaySettings, PortfolioData, Project, ProjectStatus } from "@/lib/types";

export type SiteData = PortfolioData;

const siteDataQuery = groq`{
  "profile": *[_type == "profile"][0] { ..., "resumePath": resumeFile.asset->url, "heroIllustrationUrl": heroIllustration->image.asset->url },
  "displaySettings": *[_type == "displaySettings"][0]{showHome, showProjects, showResume, showAbout, showContact, showFooter, showGithub, showResumeDownload},
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
type RawData = Partial<PortfolioData> & { projects?: RawProject[]; displaySettings?: Partial<DisplaySettings> | null };
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
function displaySettings(raw: Partial<DisplaySettings> | null | undefined): DisplaySettings {
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
  return { profile, displaySettings: displaySettings(raw.displaySettings), education: choose(raw.education, portfolioDefaults.education), experiences: choose(raw.experiences, portfolioDefaults.experiences), awards: choose(raw.awards, portfolioDefaults.awards), skills: choose(raw.skills, portfolioDefaults.skills), certificates: choose(raw.certificates, portfolioDefaults.certificates), projects: choose(raw.projects?.map(normalizeProject).filter((project) => project.slug), portfolioDefaults.projects) };
});
