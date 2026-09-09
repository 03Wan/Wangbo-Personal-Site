export type ProjectStatus = "completed" | "ongoing" | "archived";
export type ProjectCategory =
  | "cross-border"
  | "aigc"
  | "digital-trade"
  | "product"
  | "data-research"
  | "rural-research";

type ProjectLink = {
  label: string;
  href: string;
  type: "website" | "github" | "document" | "demo";
};

type ProjectProcessStep = {
  title: string;
  text: string;
};

type ProjectContent = {
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
  content: ProjectContent;
  category: ProjectCategory[];
  year: string;
  period: string;
  level?: string;
  status: ProjectStatus;
  role: string[];
  tags: string[];
  featured: boolean;
  links?: ProjectLink[];
};

type WorkStatus = "public" | "organizing" | "summary-only" | "private";
type WorkType =
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
  type: WorkType;
  year: string;
  description: string;
  relatedProjectSlug?: string;
  status: WorkStatus;
  href?: string;
  downloadHref?: string;
  isPublic: boolean;
  featured?: boolean;
};
