import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { WorkCard } from "@/components/WorkCard";
import { isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteCopy } from "@/lib/site-copy";
import { works } from "@/lib/works";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "works", "works") : {}; }

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = siteCopy[locale].works;
  return <div className="section-shell page-shell"><PageIntro eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} /><div className="works-note">{copy.note}</div><section className="work-list">{works.map((work, index) => <WorkCard key={work.id} work={work} locale={locale} index={index} />)}</section></div>;
}
