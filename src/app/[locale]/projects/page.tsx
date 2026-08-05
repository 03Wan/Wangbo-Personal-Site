import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { getContent, isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "projects", "projects") : {}; }

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const data = getContent(locale);
  return <div className="section-shell page-shell"><PageIntro eyebrow={data.projects.eyebrow} title={data.projects.title} lead={data.projects.lead} /><section className="project-stack project-stack-full">{data.projects.items.map((project) => <ProjectCard key={project.number} project={project} />)}</section><section className="future-note"><span className="pulse-dot" /><div><h2>{data.projects.noteTitle}</h2><p>{data.projects.note}</p></div></section></div>;
}
