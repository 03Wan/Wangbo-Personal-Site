import assert from "node:assert/strict";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";
import { portfolioDefaults } from "../src/lib/default-data";

loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const client = projectId && token ? createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: false, token }) : null;

type Document = { _id: string; _type: string; [key: string]: unknown };
function document(type: string, id: string, value: Record<string, unknown>): Document { return { _id: id, _type: type, ...value }; }
function withoutFrontendId(item: Record<string, unknown>): Record<string, unknown> { return Object.fromEntries(Object.entries(item).filter(([key]) => key !== "id")); }
function withKeys<T extends Record<string, unknown>>(items: T[], prefix: string): Array<T & { _key: string }> { return items.map((item, index) => ({ ...item, _key: typeof item._key === "string" ? item._key : `${prefix}-${index + 1}` })); }
function projectDocument(project: (typeof portfolioDefaults.projects)[number]): Document {
  const { slug, gallery, attachments, links, ...fields } = project;
  return document("project", `project-${slug}`, {
    ...fields, slug: { _type: "slug", current: slug },
    gallery: withKeys(gallery, `${slug}-gallery`),
    attachments: withKeys(attachments, `${slug}-attachment`),
    links: withKeys(links, `${slug}-link`),
  });
}
const documents: Document[] = [
  document("profile", "profile-wangbo", portfolioDefaults.profile),
  document("displaySettings", "displaySettings", portfolioDefaults.displaySettings),
  ...portfolioDefaults.education.map((item) => document("education", `education-${item.id}`, withoutFrontendId(item))),
  ...portfolioDefaults.experiences.map((item) => document("experience", `experience-${item.id}`, withoutFrontendId(item))),
  ...portfolioDefaults.awards.map((item) => document("award", `award-${item.id}`, withoutFrontendId(item))),
  ...portfolioDefaults.skills.map((item) => document("skill", `skill-${item.id}`, withoutFrontendId(item))),
  ...portfolioDefaults.certificates.map((item) => document("certificate", `certificate-${item.id}`, withoutFrontendId(item))),
  ...portfolioDefaults.projects.map(projectDocument),
];

function validateManifest() { assert(portfolioDefaults.projects.length > 0, "项目清单不能为空。"); assert(portfolioDefaults.education.length > 0, "教育经历不能为空。"); assert.equal(new Set(documents.map((item) => item._id)).size, documents.length, "Sanity 文档 ID 存在重复。"); }
async function main() {
  validateManifest();
  if (process.argv.includes("--check-only")) { console.log(`结构化内容校验通过：${documents.length} 个文档。`); return; }
  if (!client) throw new Error("请先设置 NEXT_PUBLIC_SANITY_PROJECT_ID 和 SANITY_API_WRITE_TOKEN。");
  let transaction = client.transaction();
  for (const item of documents) {
    if (item._type === "profile" || item._type === "displaySettings") {
      transaction = transaction.createIfNotExists(item);
      continue;
    }
    if (item._type === "project") {
      const fields = Object.fromEntries(Object.entries(item).filter(([key]) => key !== "_id" && key !== "_type"));
      transaction = transaction.createIfNotExists(item).patch(item._id, { set: fields });
    }
    else transaction = transaction.createOrReplace(item);
  }
  await transaction.commit({ visibility: "sync" });
  const ids = await client.fetch<string[]>("*[_id in $ids]._id", { ids: documents.map((item) => item._id) });
  assert.equal(ids.length, documents.length, "部分结构化文档未成功写入 Sanity。");
  console.log(`已写入并校验 ${documents.length} 个结构化文档（${dataset}）。`);
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
