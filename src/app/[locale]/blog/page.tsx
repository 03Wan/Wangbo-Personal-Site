import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/content";
import { getSiteData } from "@/lib/site-data";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { blogPosts } = await getSiteData();
  return <div className="section-shell page-shell"><div className="page-intro"><span className="eyebrow">BLOG / 博客</span><h1>记录思考，也分享值得阅读的内容。</h1></div><div className="project-stack">{blogPosts.length ? blogPosts.map((post, index) => <article className="project-card" key={post.id}><span className="project-number">{String(index + 1).padStart(2, "0")}</span><div className="project-card-body"><div className="project-meta"><span>{post.sourceType === "external" ? "外部分享" : "原创文章"}</span><span>{post.sourcePlatform || "个人博客"}{post.sourceAuthor ? ` · ${post.sourceAuthor}` : ""}</span></div><h2>{post.sourceType === "external" ? <a href={post.sourceUrl} target="_blank" rel="noreferrer">{post.title}</a> : <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>}</h2><p className="project-summary">{post.excerpt}</p></div></article>) : <p className="empty-state">博客内容正在整理中。</p>}</div></div>;
}
