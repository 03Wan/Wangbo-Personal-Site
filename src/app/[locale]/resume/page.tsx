import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getContent, isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "resume", "resume") : {}; }

export default async function ResumePage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const data = getContent(locale); const r = data.resume;
  return <div className="section-shell page-shell"><PageIntro eyebrow={r.eyebrow} title={r.title} lead={r.lead} /><div className="resume-actions"><a className="button button-primary" href="/resume-wangbo-public.pdf" download>{data.common.downloadResume}<span>↓</span></a><Link className="button button-ghost" href={`/${locale}/contact`}>{data.common.contactMe}<span>→</span></Link></div><div className="resume-layout">
    <aside className="resume-sidebar"><section><span className="section-index">01</span><h2>{r.profileTitle}</h2><p>{r.profile}</p></section><section><span className="section-index">02</span><h2>{r.skillsTitle}</h2><div className="skill-cloud">{r.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section></aside>
    <div className="resume-main"><section className="resume-section"><span className="section-index">03</span><h2>{r.educationTitle}</h2><article className="resume-entry"><div><h3>{r.education.school}</h3><p>{r.education.major} · {r.education.detail}</p></div><time>{r.education.period}</time></article></section>
    <section className="resume-section"><span className="section-index">04</span><h2>{r.projectsTitle}</h2>{data.projects.items.map((project) => <article className="resume-entry" key={project.number}><div><h3>{project.title}</h3><p>{project.level} · {project.role}</p><p>{project.summary}</p></div><time>{project.period}</time></article>)}</section>
    <section className="resume-section"><span className="section-index">05</span><h2>{r.experienceTitle}</h2>{r.experiences.map((entry) => <article className="resume-entry" key={entry.role}><div><h3>{entry.role}</h3><ul className="clean-list">{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div><time>{entry.period}</time></article>)}</section>
    <section className="resume-section"><span className="section-index">06</span><h2>{r.awardsTitle}</h2><ul className="award-grid">{r.awards.map((award) => <li key={award}>{award}</li>)}</ul></section></div>
  </div></div>;
}
