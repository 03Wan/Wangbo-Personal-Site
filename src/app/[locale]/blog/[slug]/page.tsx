import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/content";
import { getSiteData } from "@/lib/site-data";

export default async function BlogDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const { blogPosts } = await getSiteData();
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  if (post.sourceType === "external" && post.sourceUrl) return <div className="section-shell page-shell"><p className="eyebrow">EXTERNAL SHARE</p><h1>{post.title}</h1><p>{post.excerpt}</p><a className="button button-primary" href={post.sourceUrl} target="_blank" rel="noreferrer">查看原文<span>↗</span></a></div>;
  return <article className="section-shell page-shell"><header className="page-intro"><span className="eyebrow">BLOG / 原创文章</span><h1>{post.title}</h1><p>{post.excerpt}</p><p className="blog-meta">作者：{post.sourceAuthor || "王波"}{post.sourcePlatform ? ` · 发布于 ${post.sourcePlatform}` : ""}</p></header><div className="blog-body">{(post.body || "正文尚未填写。").split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><Link className="text-link" href={`/${locale}/blog`}>返回博客<span>←</span></Link></article>;
}
