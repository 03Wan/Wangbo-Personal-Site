import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { DomainMigrationNotice } from "@/components/DomainMigrationNotice";
import { EntryExperience } from "@/components/EntryExperience";
import { isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getSiteData } from "@/lib/site-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "home") : {}; }

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { profile, displaySettings, projects, experiences, awards, skills, coreStrengths } = await getSiteData();
  const resumePath = profile.resumePath;
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const featuredAwards = awards.filter((award) => award.featured).slice(0, 3);
  return <>
    <EntryExperience />
    <DomainMigrationNotice notice={displaySettings.zhixuanNotice} />
    <section className="hero section-shell">
      <div className="hero-copy"><div className="status-row"><span className="eyebrow">{profile.professionalTitle}</span><span className="status"><i />{profile.availability}</span></div><h1><span className="hero-title-break">{profile.valueProposition}</span></h1><span className="title-rule" aria-hidden="true" /><p className="hero-lead">{profile.intro}</p>{(displaySettings.showProjects || (displaySettings.showResumeDownload && resumePath) || displaySettings.showContact) && <div className="action-row">{displaySettings.showProjects && <Link className="button button-primary" href={`/${locale}/projects`}>查看项目案例<span>→</span></Link>}{displaySettings.showResumeDownload && resumePath && <a className="button button-ghost" href={resumePath} download>下载公开简历<span>↓</span></a>}{displaySettings.showContact && <Link className="button button-link" href={`/${locale}/contact`}>联系我<span>→</span></Link>}</div>}</div>
      <aside className="identity-panel"><div className="identity-copy"><div className="identity-heading"><div><h2>{profile.latinName}</h2><span>{profile.location}</span><i aria-hidden="true" /></div><div className="hero-character-frame"><Image className="hero-character" src={profile.heroIllustrationUrl} alt="王波的卡通人物插画" fill priority sizes="(max-width: 520px) 108px, (max-width: 1050px) 140px, 156px" /></div></div><dl>{profile.highlights.map((item, index) => <div key={item}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{item}</dd></div>)}</dl></div></aside>
    </section>
    <section className="section-shell proof-section"><div className="section-heading"><div><span className="eyebrow">CORE STRENGTHS / 核心能力</span><h2>能把研究、分析和工具应用，落到具体项目中。</h2></div></div><div className="ability-grid">{coreStrengths.map((strength, index) => <article key={strength.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{strength.title}</h3><p>{strength.description}</p><div className="tag-list">{skills.filter((skill) => skill.category === strength.skillCategory).map((skill) => <em key={skill.id}>{skill.name}</em>)}</div></article>)}</div></section>
    <section className="section-shell selected-projects"><div className="section-heading split-heading"><div><span className="eyebrow">SELECTED PROJECTS / 精选项目</span><h2>用角色、行动和可复核的产出说明实践。</h2></div><Link className="text-link" href={`/${locale}/projects`}>查看全部项目<span>→</span></Link></div><div className="project-stack">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} compact />)}</div></section>
    <section className="section-shell home-summary"><div><span className="eyebrow">EXPERIENCE & HONORS / 经历与荣誉</span><h2>有组织推进经验，也重视结果表达。</h2></div><div className="summary-list">{experiences.slice(0, 2).map((item) => <article key={item.id}><span>{item.period}</span><h3>{item.role} · {item.organization}</h3><p>{item.bullets[0]}</p></article>)}{featuredAwards.map((item) => <article key={item.id}><span>{item.date}</span><h3>{item.title}</h3><p>{item.description || "荣誉与竞赛成果"}</p></article>)}</div></section>
    <section className="section-shell job-cta"><div><span className="eyebrow">OPEN TO OPPORTUNITIES</span><h2>寻找跨境业务、市场研究、数据分析与数字化相关机会。</h2><p>欢迎查看项目案例与公开简历；如有合适岗位或合作方向，请直接联系我。</p></div>{(displaySettings.showResume || displaySettings.showContact) && <div className="action-row">{displaySettings.showResume && <Link className="button button-primary" href={`/${locale}/resume`}>查看简历<span>→</span></Link>}{displaySettings.showContact && <Link className="button button-ghost" href={`/${locale}/contact`}>联系我<span>→</span></Link>}</div>}</section>
  </>;
}
