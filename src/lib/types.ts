export type ProjectStatus = "completed" | "ongoing" | "archived";
export type ProjectCategory =
  | "cross-border"
  | "aigc"
  | "digital-trade"
  | "product"
  | "data-research"
  | "rural-research";

export type ProjectLink = {
  label: string;
  href: string;
  type: "website" | "github" | "document" | "demo";
};

export type ProjectAttachment = {
  title: string;
  kind: "report" | "presentation" | "system" | "research" | "other";
  description?: string;
  href?: string;
};

export type ProjectGalleryItem = { url?: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory[];
  status: ProjectStatus;
  period: string;
  role: string[];
  summary: string;
  background: string;
  responsibilities: string[];
  actions: string[];
  results: string[];
  skills: string[];
  gallery: ProjectGalleryItem[];
  attachments: ProjectAttachment[];
  links: ProjectLink[];
  featured: boolean;
  resumeVisible: boolean;
  order: number;
};

export type Profile = {
  name: string;
  latinName: string;
  monogram: string;
  professionalTitle: string;
  valueProposition: string;
  intro: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  site: string;
  resumePath?: string;
  heroIllustrationUrl: string;
  about: string[];
  highlights: string[];
};

export type Education = { id: string; school: string; degree: string; major: string; period: string; status: "graduated" | "studying"; rank?: string; summary?: string; order: number };
export type Experience = { id: string; organization: string; role: string; period: string; summary?: string; bullets: string[]; order: number };
export type Award = { id: string; title: string; issuer?: string; date?: string; description?: string; featured: boolean; order: number };
export type Skill = { id: string; name: string; category: string; description?: string; order: number };
export type CoreStrength = { id: string; title: string; description: string; skillCategory: string; order: number };
export type Certificate = { id: string; name: string; issuer?: string; date?: string; order: number };
export type BlogPost = { id: string; slug: string; title: string; excerpt: string; body?: unknown; coverImageUrl?: string; sourceType: "original" | "external"; sourceUrl?: string; sourceAuthor?: string; sourcePlatform?: string; order: number };

export type DisplaySettings = {
  showHome: boolean;
  showProjects: boolean;
  showResume: boolean;
  showAbout: boolean;
  showContact: boolean;
  showFooter: boolean;
  showGithub: boolean;
  showResumeDownload: boolean;
  showBlog: boolean;
  contactTopics: string[];
  zhixuanNotice: DomainNotice;
};

export type DomainNotice = {
  enabled: boolean;
  title: string;
  description: string;
  url: string;
};

export type SiteAppearance = {
  themePreset: "professionalBlue" | "forest" | "graphite" | "custom";
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontStyle: "sans" | "serif";
  contentWidth: "standard" | "wide";
  spacing: "compact" | "comfortable";
  headingScale: "standard" | "large";
  bodyScale: "standard" | "large";
  navStyle: "solid" | "transparent";
  navGlass: boolean;
  navSticky: boolean;
  navHeight: "compact" | "standard" | "tall";
  cornerStyle: "sharp" | "soft" | "round";
  shadowStyle: "none" | "subtle" | "elevated";
  heroLayout: "textFirst" | "photoFirst";
  heroBackground: "none" | "gradient";
  animationIntensity: "none" | "subtle" | "standard";
};

export type PortfolioData = {
  profile: Profile;
  displaySettings: DisplaySettings;
  siteAppearance: SiteAppearance;
  projects: Project[];
  education: Education[];
  experiences: Experience[];
  awards: Award[];
  skills: Skill[];
  coreStrengths: CoreStrength[];
  certificates: Certificate[];
  blogPosts: BlogPost[];
};
