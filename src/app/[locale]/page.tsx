import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { WorkCard } from "@/components/WorkCard";
import { DomainMigrationNotice } from "@/components/DomainMigrationNotice";
import { getContent, isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getFeaturedProjects } from "@/lib/projects";
import { siteCopy } from "@/lib/site-copy";
import { getFeaturedWorks } from "@/lib/works";
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
  const copy = siteCopy[locale].home;
  const featuredProjects = getFeaturedProjects().slice(0, 3);
  const featuredWorks = getFeaturedWorks();

  return (
    <>
      <DomainMigrationNotice locale={locale} />
      <section className="hero section-shell">
        <div className="hero-copy reveal">
          <div className="status-row"><span className="eyebrow">{data.home.eyebrow}</span><span className="status"><i />{data.home.status}</span></div>
          <h1>{locale === "zh" ? <><span>在商业问题与 AI 工具之间，</span><span>寻找可落地的连接。</span></> : <><span>Connecting business questions</span><span>with practical AI tools.</span></>}</h1>
          <span className="title-rule" aria-hidden="true" />
          <p className="hero-lead">{data.home.intro}</p>
          <div className="action-row">
            <Link className="button button-primary" href={`/${locale}/projects`}>{data.common.viewProjects}<span>→</span></Link>
            <Link className="button button-link" href={`/${locale}/works`}>{copy.viewWorks}<span>→</span></Link>
          </div>
        </div>
        <aside className="identity-panel reveal reveal-delay">
          <div className="identity-copy"><h2>{locale === "zh" ? "王波" : "Wang Bo"}</h2><span>WANG BO</span><i aria-hidden="true" />
            <dl>{copy.identity.map((item, index) => <div key={item}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{item}</dd></div>)}</dl>
          </div>
          <Image className="identity-portrait" src="/profile-wangbo.webp" alt={locale === "zh" ? "王波职业头像" : "Professional portrait of Wang Bo"} width={418} height={624} priority sizes="(max-width: 860px) 82vw, 330px" />
        </aside>
      </section>

      <section className="section-shell selected-projects">
        <div className="section-heading split-heading"><div><span className="eyebrow">{copy.projectsKicker}</span><h2>{copy.projectsTitle}</h2></div><Link className="text-link" href={`/${locale}/projects`}>{copy.viewAllProjects}<span>→</span></Link></div>
        <div className="project-stack">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} compact />)}</div>
      </section>

      <section className="section-shell selected-works">
        <div className="section-heading split-heading"><div><span className="eyebrow">{copy.worksKicker}</span><h2>{copy.worksTitle}</h2><p>{copy.worksIntro}</p></div><Link className="text-link" href={`/${locale}/works`}>{copy.viewWorks}<span>→</span></Link></div>
        <div className="work-list work-list-home">{featuredWorks.map((work, index) => <WorkCard key={work.id} work={work} locale={locale} index={index} />)}</div>
      </section>

      <section className="section-shell now-section">
        <div><span className="eyebrow">{copy.currentKicker}</span><h2>{copy.currentTitle}</h2></div>
        <ol>{copy.currentItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </section>
    </>
  );
}
