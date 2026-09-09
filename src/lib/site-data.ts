import { groq } from 'next-sanity';
import { cache } from 'react';
import { content } from '@/lib/content';
import { projects as defaultProjects } from '@/lib/projects';
import { siteCopy as defaultSiteCopy } from '@/lib/site-copy';
import { works as defaultWorks } from '@/lib/works';
import { getSanityClient } from '@/sanity/lib/client';
import type { Project, Work } from "@/lib/types";

export type SiteData = {
  content: typeof content;
  siteCopy: typeof defaultSiteCopy;
  projects: Project[];
  works: Work[];
};

const defaults: SiteData = { content, siteCopy: defaultSiteCopy, projects: defaultProjects, works: defaultWorks };

const siteDataQuery = groq`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0],
  "projects": *[_type == "project"] | order(order asc, year desc) {
    "slug": slug.current,
    category, year, period, level, status, role, tags, featured,
    links[]{ label, href, type },
    content
  },
  "works": *[_type == "work"] | order(order asc, year desc) {
    id, title, type, year, description,
    relatedProjectSlug, status, href, downloadHref, isPublic, featured
  }
}`;

type RawSiteData = {
  settings?: {
    shared?: SiteData['content']['zh']['shared'];
    content?: Record<string, unknown>;
    copy?: Record<string, unknown>;
  } | null;
  projects?: Project[];
  works?: Work[];
};

function mergeDefaults<T>(fallback: T, incoming: unknown): T {
  if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) return fallback;
  if (!fallback || typeof fallback !== 'object' || Array.isArray(fallback)) return incoming as T;

  const result = { ...(fallback as Record<string, unknown>) };
  for (const [key, value] of Object.entries(incoming as Record<string, unknown>)) {
    const fallbackValue = result[key];
    result[key] = value && typeof value === 'object' && !Array.isArray(value)
      ? mergeDefaults(fallbackValue, value)
      : value;
  }
  return result as T;
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    slug: typeof project.slug === 'string' ? project.slug : '',
    category: project.category ?? [],
    role: project.role ?? [],
    tags: project.tags ?? [],
    content: project.content,
  };
}

function normalizeWork(work: Work): Work {
  return {
    ...work,
    id: work.id ?? '',
    title: work.title ?? '',
    description: work.description ?? '',
  };
}

export const getSiteData = cache(async (): Promise<SiteData> => {
  const client = getSanityClient();
  if (!client) return defaults;

  const raw = await client.fetch<RawSiteData>(siteDataQuery, {}, {
    cache: 'no-store',
  });
  const settings = raw?.settings;
  if (!settings) throw new Error('Sanity 中缺少 siteSettings 文档。');

  const shared = mergeDefaults(content.zh.shared, settings.shared);
  return {
    content: {
      zh: mergeDefaults({ ...content.zh, shared }, settings.content),
    } as SiteData['content'],
    siteCopy: {
      zh: mergeDefaults(defaultSiteCopy.zh, settings.copy),
    } as SiteData['siteCopy'],
    projects: (raw.projects ?? []).map(normalizeProject),
    works: (raw.works ?? []).map(normalizeWork),
  };
});
