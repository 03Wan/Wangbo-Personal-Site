import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, locales } from "@/lib/content";
import { getSiteData } from "@/lib/site-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const { projects } = await getSiteData();
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const { projects } = await getSiteData();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const content = project.content;
  const path = `/${locale}/projects/${slug}`;
  return { title: content.title, description: content.summary, alternates: { canonical: path }, openGraph: { title: content.title, description: content.summary, url: path, locale: "zh_CN", type: "article" } };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const { projects, siteCopy } = await getSiteData();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const content = project.content;
  const copy = siteCopy[locale].detail;
  const projectCopy = siteCopy[locale].projects;
  const ui = siteCopy[locale].ui;
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const roles = project.role;
  const tags = project.tags;

  return <article className="section-shell case-page">
    <header className="case-hero"><div className="case-title"><span className="eyebrow">{ui.projectLabel} / {String(index + 1).padStart(2, "0")}</span><h1>{content.title}</h1><p>{content.subtitle}</p><div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><dl className="case-facts"><div><dt>{copy.period}</dt><dd>{project.period}</dd></div><div><dt>{copy.status}</dt><dd className="status-text">{projectCopy.statuses[project.status]}</dd></div><div><dt>{copy.level}</dt><dd>{project.level}</dd></div><div><dt>{copy.role}</dt><dd>{roles.join(" · ")}</dd></div></dl></header>
    {project.links?.length ? <div className="case-links">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div> : null}
    <section className="case-section case-overview"><span className="section-index">01</span><div><h2>{copy.overview}</h2><p className="case-lead">{content.summary}</p></div></section>
    <section className="case-section"><span className="section-index">02</span><div><h2>{copy.background}</h2><p>{content.background}</p></div></section>
    <section className="case-section"><span className="section-index">03</span><div><h2>{copy.questions}</h2><ol className="question-list">{content.problem.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</li>)}</ol></div></section>
    <section className="case-section"><span className="section-index">04</span><div><h2>{copy.responsibilities}</h2><ul className="action-list">{content.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="case-section"><span className="section-index">05</span><div><h2>{copy.process}</h2><div className="process-grid">{content.process.map((step, stepIndex) => <article key={step.title}><span>{String(stepIndex + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>
    <section className="case-section"><span className="section-index">06</span><div><h2>{copy.outcomes}</h2><ul className="outcome-list">{content.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="case-section evidence-section"><span className="section-index">07</span><div><h2>{copy.evidence}</h2><div className="evidence-placeholder"><span>{ui.evidenceNoteLabel}</span><p>{content.evidenceNote}</p></div></div></section>
    <section className="case-section"><span className="section-index">08</span><div><h2>{copy.reflection}</h2><p>{content.reflection}</p></div></section>
    <nav className="case-pagination" aria-label={ui.projectPaginationAria}><Link href={`/${locale}/projects/${previous.slug}`}><span>← {copy.previous}</span><strong>{previous.content.title}</strong></Link><Link href={`/${locale}/projects`}>{copy.all}</Link><Link href={`/${locale}/projects/${next.slug}`}><span>{copy.next} →</span><strong>{next.content.title}</strong></Link></nav>
  </article>;
}
