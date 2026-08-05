import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { getContent, isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "home") : {};
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const data = getContent(locale);

  return (
    <>
      <section className="hero section-shell">
        <div className="hero-copy reveal">
          <div className="status-row"><span className="eyebrow">{data.home.eyebrow}</span><span className="status"><i />{data.home.status}</span></div>
          <h1>{data.home.title}</h1>
          <p className="hero-lead">{data.home.intro}</p>
          <div className="action-row">
            <Link className="button button-primary" href={`/${locale}/projects`}>{data.common.viewProjects}<span>↗</span></Link>
            <Link className="button button-ghost" href={`/${locale}/about`}>{data.nav.about}<span>→</span></Link>
          </div>
        </div>
        <div className="portrait-panel reveal reveal-delay">
          <div className="portrait-orbit" aria-hidden="true" />
          <div className="portrait-frame">
            <Image src="/profile-wangbo.webp" alt={locale === "zh" ? "王波职业头像" : "Professional portrait of Wang Bo"} width={418} height={624} priority sizes="(max-width: 860px) 70vw, 360px" />
          </div>
          <span className="portrait-label">WANG BO / 2026</span>
        </div>
        <div className="metric-strip">
          {data.home.numbers.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
        </div>
      </section>

      <section className="section-shell focus-section">
        <div className="section-heading"><span className="eyebrow">{data.common.current}</span><h2>{data.home.focusTitle}</h2></div>
        <div className="focus-grid">
          {data.home.focuses.map((item) => <article key={item.index} className="focus-card"><span>{item.index}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
      </section>

      <section className="section-shell selected-projects">
        <div className="section-heading split-heading"><div><span className="eyebrow">PROJECTS / 02</span><h2>{data.home.projectsTitle}</h2></div><p>{data.home.projectsIntro}</p></div>
        <div className="project-stack">{data.projects.items.map((project) => <ProjectCard key={project.number} project={project} compact />)}</div>
        <Link className="text-link" href={`/${locale}/projects`}>{data.common.viewProjects}<span>↗</span></Link>
      </section>

      <section className="section-shell manifesto">
        <span className="quote-mark">“</span><blockquote>{data.home.quote}</blockquote><span className="signal-line" aria-hidden="true" />
      </section>
    </>
  );
}
