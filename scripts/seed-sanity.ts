import assert from 'node:assert/strict';
import { loadEnvConfig } from '@next/env';
import { createClient } from '@sanity/client';
import { content } from '../src/lib/content';
import { projects } from '../src/lib/projects';
import { siteCopy } from '../src/lib/site-copy';
import { works } from '../src/lib/works';

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error('请先设置 NEXT_PUBLIC_SANITY_PROJECT_ID 和 SANITY_API_WRITE_TOKEN。');
}

const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false, token });

type SanityDocument = { _id: string; _type: string; [key: string]: unknown };

function withoutUndefined<T>(value: T): T {
  if (Array.isArray(value)) return value.map(withoutUndefined) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).flatMap(([key, child]) => child === undefined ? [] : [[key, withoutUndefined(child)]])
    ) as T;
  }
  return value;
}

function validateComplete(value: unknown, path = 'document'): void {
  if (value === null || value === undefined) throw new Error(`${path} 不能为空。`);
  if (typeof value === 'string' && !value.trim()) throw new Error(`${path} 不能为空字符串。`);
  if (Array.isArray(value)) {
    if (value.length === 0) throw new Error(`${path} 不能为空数组。`);
    value.forEach((item, index) => validateComplete(item, `${path}[${index}]`));
    return;
  }
  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, child]) => validateComplete(child, `${path}.${key}`));
  }
}

const pageContent = Object.fromEntries(Object.entries(content.zh).filter(([key]) => key !== 'shared'));

const settings: SanityDocument = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Wang Bo Personal Site',
  shared: content.zh.shared,
  content: pageContent,
  copy: siteCopy.zh,
};

const projectDocuments: SanityDocument[] = projects.map((project, index) => withoutUndefined({
  _id: `project-${project.slug}`,
  _type: 'project',
  title: project.content.title,
  slug: { _type: 'slug', current: project.slug },
  order: index,
  category: project.category,
  year: project.year,
  period: project.period,
  level: project.level,
  status: project.status,
  role: project.role,
  tags: project.tags,
  featured: project.featured,
  links: project.links?.map((link) => ({ label: link.label, href: link.href, type: link.type })),
  content: project.content,
}));

const workDocuments: SanityDocument[] = works.map((work, index) => withoutUndefined({
  _id: `work-${work.id}`,
  _type: 'work',
  id: work.id,
  order: index,
  title: work.title,
  type: work.type,
  year: work.year,
  description: work.description,
  relatedProjectSlug: work.relatedProjectSlug,
  status: work.status,
  href: work.href,
  downloadHref: work.downloadHref,
  isPublic: work.isPublic,
  featured: work.featured,
}));

const documents = [withoutUndefined(settings), ...projectDocuments, ...workDocuments];

function validateManifest() {
  assert(projects.length > 0, '项目清单不能为空。');
  assert(works.length > 0, '作品清单不能为空。');
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, projects.length, '项目 slug 存在重复。');
  assert.equal(new Set(works.map(({ id }) => id)).size, works.length, '作品 id 存在重复。');
  assert.equal(new Set(documents.map(({ _id }) => _id)).size, documents.length, 'Sanity 文档 ID 存在重复。');
  documents.forEach((document) => validateComplete(document, document._id));
}

async function verifyImport() {
  const actual = await client.fetch<Array<{ _id: string; _type: string }>>(
    `*[_type in ["siteSettings", "project", "work"]]{_id, _type}`,
    {},
    { perspective: 'published' },
  );
  const expectedIds = documents.map(({ _id }) => _id).sort();
  const actualIds = actual.map(({ _id }) => _id).sort();
  assert.deepEqual(actualIds, expectedIds, 'Sanity 中的文档 ID 与完整内容清单不一致。');
  assert.equal(actual.filter(({ _type }) => _type === 'siteSettings').length, 1);
  assert.equal(actual.filter(({ _type }) => _type === 'project').length, projects.length);
  assert.equal(actual.filter(({ _type }) => _type === 'work').length, works.length);
}

async function main() {
  validateManifest();
  if (process.argv.includes('--check-only')) {
    console.log(`完整内容清单校验通过：1 个网站设置、${projects.length} 个项目、${works.length} 个作品，共 ${documents.length} 个文档。`);
    return;
  }
  let transaction = client.transaction();
  documents.forEach((document) => {
    transaction = transaction.createOrReplace(document);
  });
  await transaction.commit({ visibility: 'sync' });
  await verifyImport();
  console.log(`已完整导入并核验 ${documents.length} 个文档：1 个网站设置、${projects.length} 个项目、${works.length} 个作品（${dataset}）。`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
