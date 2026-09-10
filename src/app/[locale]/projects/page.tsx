import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProjectFilter } from "@/components/ProjectFilter";
import { isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getSiteData } from "@/lib/site-data";
import { notFound } from "next/navigation";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "projects", "projects") : {}; }
export default async function ProjectsPage({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) notFound(); const { projects } = await getSiteData(); return <div className="section-shell page-shell"><PageIntro eyebrow="PROJECTS / 项目案例" title="用项目说明我如何发现问题、推进工作并完成交付。" lead="每个案例聚焦项目背景、我的角色、核心任务、具体行动、成果与可公开证据；附件、报告和演示材料均收纳在对应案例中。" /><ProjectFilter projects={projects} locale={locale} /><section className="future-note"><span className="section-index">NOTE</span><div><h2>关于证据与结论</h2><p>仅展示可公开的项目材料和经整理的过程信息；没有公开地址的材料会保留说明，不提供空链接。</p></div></section></div>; }
