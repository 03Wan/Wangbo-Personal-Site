import { cache } from "react";
import { groq } from "next-sanity";
import { portfolioDefaults } from "@/lib/default-data";
import { getSanityClient } from "@/sanity/lib/client";
import type { PortfolioData, Project, ProjectStatus } from "@/lib/types";

export type SiteData = PortfolioData;

const siteDataQuery = groq`{
  "profile": *[_type == "profile"][0] { ..., "heroIllustrationUrl": heroIllustration->image.asset->url },
  "legacySettings": *[_type == "siteSettings" && _id == "siteSettings"][0]{shared, content},
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
    featured, resumeVisible, order, content, year, level, tags
  }
}`;

type LegacyContent = { title?: string; summary?: string; background?: string; responsibilities?: string[]; process?: Array<{ title?: string; text?: string }>; outcomes?: string[]; problem?: string[] };
type RawProject = Partial<Project> & { content?: LegacyContent; year?: string; level?: string; tags?: string[] };
type LegacyResume = {
  profile?: string;
  education?: { school?: string; major?: string; period?: string; detail?: string };
  experiences?: Array<{ role?: string; period?: string; bullets?: string[] }>;
  awards?: string[];
  skills?: string[];
};
type LegacySettings = { shared?: Partial<Pick<PortfolioData["profile"], "email" | "github" | "site" | "resumePath">>; content?: { home?: { intro?: string; status?: string }; about?: { story?: string[] }; resume?: LegacyResume } };
type RawData = Partial<PortfolioData> & { projects?: RawProject[]; legacySettings?: LegacySettings | null };
const projectStatuses: ProjectStatus[] = ["completed", "ongoing", "archived"];

function list(value: unknown): string[] { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : []; }

function normalizeProject(raw: RawProject, index: number): Project {
  const legacy = raw.content;
  const hasStructuredContent = Boolean(raw.summary || raw.actions?.length || raw.results?.length);
  const status = projectStatuses.includes(raw.status as ProjectStatus) ? raw.status as ProjectStatus : "completed";
  return {
    slug: typeof raw.slug === "string" ? raw.slug : "", title: raw.title || legacy?.title || "未命名项目", category: Array.isArray(raw.category) ? raw.category : [],
    status: !hasStructuredContent && status === "ongoing" ? "completed" : status, period: raw.period || raw.year || "", role: list(raw.role), summary: raw.summary || legacy?.summary || "", background: raw.background || legacy?.background || "",
    responsibilities: list(raw.responsibilities?.length ? raw.responsibilities : legacy?.responsibilities), actions: list(raw.actions?.length ? raw.actions : legacy?.process?.map((step) => [step.title, step.text].filter(Boolean).join("：")) || legacy?.problem), results: list(raw.results?.length ? raw.results : legacy?.outcomes), skills: list(raw.skills?.length ? raw.skills : raw.tags),
    gallery: Array.isArray(raw.gallery) ? raw.gallery.filter((item) => item && typeof item.alt === "string") : [], attachments: Array.isArray(raw.attachments) ? raw.attachments.filter((item) => item && typeof item.title === "string") : [], links: Array.isArray(raw.links) ? raw.links.filter((item) => item && typeof item.label === "string" && typeof item.href === "string") : [],
    featured: Boolean(raw.featured), resumeVisible: raw.resumeVisible ?? true, order: typeof raw.order === "number" ? raw.order : index,
  };
}
function choose<T>(items: T[] | undefined, fallback: T[]): T[] { return Array.isArray(items) && items.length > 0 ? items : fallback; }
function legacyProfile(settings: LegacySettings | null | undefined): PortfolioData["profile"] {
  const shared = settings?.shared;
  const content = settings?.content;
  return {
    ...portfolioDefaults.profile,
    email: shared?.email || portfolioDefaults.profile.email,
    github: shared?.github || portfolioDefaults.profile.github,
    site: shared?.site || portfolioDefaults.profile.site,
    resumePath: shared?.resumePath || portfolioDefaults.profile.resumePath,
    intro: content?.home?.intro || portfolioDefaults.profile.intro,
    availability: content?.home?.status || portfolioDefaults.profile.availability,
    about: list(content?.about?.story).length > 0 ? list(content?.about?.story) : portfolioDefaults.profile.about,
  };
}
function legacyData(settings: LegacySettings | null | undefined) {
  const resume = settings?.content?.resume;
  const legacyEducation = resume?.education;
  const education = legacyEducation?.school ? [{ id: "legacy-education", school: legacyEducation.school, degree: legacyEducation.major?.includes("本科") ? "本科" : portfolioDefaults.education[0].degree, major: legacyEducation.major || portfolioDefaults.education[0].major, period: legacyEducation.period || portfolioDefaults.education[0].period, status: "graduated" as const, rank: legacyEducation.detail, summary: "已毕业", order: 1 }] : portfolioDefaults.education;
  const experiences = Array.isArray(resume?.experiences) && resume.experiences.length > 0 ? resume.experiences.map((item, index) => ({ id: `legacy-experience-${index}`, organization: item.role?.includes("校团委") ? "三江学院校团委" : "三江学院", role: item.role || "校园经历", period: item.period || "", bullets: list(item.bullets), order: index + 1 })) : portfolioDefaults.experiences;
  const awards = list(resume?.awards).length > 0 ? list(resume?.awards).map((title, index) => ({ id: `legacy-award-${index}`, title, featured: index < 4 || title.includes("优秀毕业"), order: index + 1 })) : portfolioDefaults.awards;
  const legacyCertificates = list(resume?.skills);
  const certificates = legacyCertificates.length > 0 ? legacyCertificates.map((name, index) => ({ id: `legacy-certificate-${index}`, name, order: index + 1 })) : portfolioDefaults.certificates;
  return { education, experiences, awards, certificates };
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
  const legacy = legacyData(raw.legacySettings);
  const profile = raw.profile ? { ...legacyProfile(raw.legacySettings), ...raw.profile, heroIllustrationUrl: raw.profile.heroIllustrationUrl || portfolioDefaults.profile.heroIllustrationUrl } : legacyProfile(raw.legacySettings);
  return { profile, education: choose(raw.education, legacy.education), experiences: choose(raw.experiences, legacy.experiences), awards: choose(raw.awards, legacy.awards), skills: choose(raw.skills, portfolioDefaults.skills), certificates: choose(raw.certificates, legacy.certificates), projects: choose(raw.projects?.map(normalizeProject).filter((project) => project.slug), portfolioDefaults.projects) };
});
