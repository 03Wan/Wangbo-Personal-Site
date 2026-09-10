import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getSiteData } from "@/lib/site-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "home") : {}; }

const abilities = [
  ["01", "跨境业务与市场研究", "从市场、渠道、内容和用户转化链路理解问题，形成可讨论的研究与方案框架。"],
  ["02", "数据分析与商业洞察", "梳理数据来源、口径、变量和结论边界，为业务判断提供清晰、克制的依据。"],
  ["03", "AI 工具与数字化工作流", "将 AI 工具用于资料整理、内容表达与流程设计，同时保留人工复核和可追溯性。"],
] as const;

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { profile, projects, experiences, awards, skills } = await getSiteData();
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const featuredAwards = awards.filter((award) => award.featured).slice(0, 3);
  return <>
    <section className="hero section-shell">
      <div className="hero-copy"><div className="status-row"><span className="eyebrow">{profile.professionalTitle}</span><span className="status"><i />{profile.availability}</span></div><h1><span className="hero-title-break">{profile.valueProposition}</span></h1><span className="title-rule" aria-hidden="true" /><p className="hero-lead">{profile.intro}</p><div className="action-row"><Link className="button button-primary" href={`/${locale}/projects`}>查看项目案例<span>→</span></Link><a className="button button-ghost" href={profile.resumePath} download>下载公开简历<span>↓</span></a><Link className="button button-link" href={`/${locale}/contact`}>联系我<span>→</span></Link></div></div>
      <aside className="identity-panel"><div className="identity-copy"><h2>{profile.latinName}</h2><span>{profile.location}</span><i aria-hidden="true" /><dl>{profile.highlights.map((item, index) => <div key={item}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{item}</dd></div>)}</dl></div></aside>
    </section>
    <section className="section-shell proof-section"><div className="section-heading"><div><span className="eyebrow">CORE STRENGTHS / 核心能力</span><h2>能把研究、分析和工具应用，落到具体项目中。</h2></div></div><div className="ability-grid">{abilities.map(([index, title, description]) => <article key={title}><span>{index}</span><h3>{title}</h3><p>{description}</p><div className="tag-list">{skills.filter((skill) => skill.category === title).map((skill) => <em key={skill.id}>{skill.name}</em>)}</div></article>)}</div></section>
    <section className="section-shell selected-projects"><div className="section-heading split-heading"><div><span className="eyebrow">SELECTED PROJECTS / 精选项目</span><h2>用角色、行动和可复核的产出说明实践。</h2></div><Link className="text-link" href={`/${locale}/projects`}>查看全部项目<span>→</span></Link></div><div className="project-stack">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} compact />)}</div></section>
    <section className="section-shell home-summary"><div><span className="eyebrow">EXPERIENCE & HONORS / 经历与荣誉</span><h2>有组织推进经验，也重视结果表达。</h2></div><div className="summary-list">{experiences.slice(0, 2).map((item) => <article key={item.id}><span>{item.period}</span><h3>{item.role} · {item.organization}</h3><p>{item.bullets[0]}</p></article>)}{featuredAwards.map((item) => <article key={item.id}><span>{item.date}</span><h3>{item.title}</h3><p>{item.description || "荣誉与竞赛成果"}</p></article>)}</div></section>
    <section className="section-shell job-cta"><div><span className="eyebrow">OPEN TO OPPORTUNITIES</span><h2>寻找跨境业务、市场研究、数据分析与数字化相关机会。</h2><p>欢迎查看项目案例与公开简历；如有合适岗位或合作方向，请直接联系我。</p></div><div className="action-row"><Link className="button button-primary" href={`/${locale}/resume`}>查看简历<span>→</span></Link><Link className="button button-ghost" href={`/${locale}/contact`}>联系我<span>→</span></Link></div></section>
  </>;
}
