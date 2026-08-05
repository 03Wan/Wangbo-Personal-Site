import type { Locale } from "./content";

export type ProjectStatus = "completed" | "ongoing" | "archived";
export type ProjectCategory =
  | "cross-border"
  | "aigc"
  | "digital-trade"
  | "product"
  | "data-research"
  | "rural-research";

export type ProjectLink = {
  label: { zh: string; en: string };
  href: string;
  type: "website" | "github" | "document" | "demo";
};

export type ProjectProcessStep = {
  title: string;
  text: string;
};

export type ProjectContent = {
  title: string;
  subtitle: string;
  summary: string;
  background: string;
  problem: string[];
  responsibilities: string[];
  process: ProjectProcessStep[];
  outcomes: string[];
  reflection: string;
  evidenceNote: string;
};

export type Project = {
  slug: string;
  localeContent: Record<Locale, ProjectContent>;
  category: ProjectCategory[];
  year: string;
  period: string;
  periodEn: string;
  level?: string;
  levelEn?: string;
  status: ProjectStatus;
  role: string[];
  roleEn: string[];
  tags: string[];
  tagsEn: string[];
  featured: boolean;
  cover?: string;
  links?: ProjectLink[];
  gallery?: string[];
};

export type WorkStatus = "public" | "organizing" | "summary-only" | "private";
export type WorkType =
  | "product-system"
  | "research-report"
  | "data-analysis"
  | "prototype"
  | "presentation"
  | "visual-design"
  | "video";

export type Work = {
  id: string;
  title: string;
  titleEn: string;
  type: WorkType;
  year: string;
  description: string;
  descriptionEn: string;
  relatedProjectSlug?: string;
  cover?: string;
  status: WorkStatus;
  href?: string;
  downloadHref?: string;
  isPublic: boolean;
  featured?: boolean;
};
