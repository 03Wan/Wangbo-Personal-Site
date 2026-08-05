import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProjectFilter } from "@/components/ProjectFilter";
import { isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { siteCopy } from "@/lib/site-copy";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "projects", "projects") : {}; }

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = siteCopy[locale].projects;
  return <div className="section-shell page-shell"><PageIntro eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} /><ProjectFilter projects={projects} locale={locale} /><section className="future-note"><span className="section-index">NOTE</span><div><h2>{copy.noteTitle}</h2><p>{copy.note}</p></div></section></div>;
}
