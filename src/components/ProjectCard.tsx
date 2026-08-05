import Link from "next/link";
import type { Locale } from "@/lib/content";
import { projectStatusLabels } from "@/lib/projects";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, locale, compact = false, index }: { project: Project; locale: Locale; compact?: boolean; index: number }) {
  const content = project.localeContent[locale];
  const roles = locale === "zh" ? project.role : project.roleEn;
  const tags = locale === "zh" ? project.tags : project.tagsEn;
  return (
    <article className={`project-card ${compact ? "project-card-compact" : ""}`}>
      <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="project-card-body">
        <div className="project-meta"><span>{locale === "zh" ? project.level : project.levelEn}</span><span>{locale === "zh" ? project.period : project.periodEn}</span></div>
        <h2><Link href={`/${locale}/projects/${project.slug}`}>{content.title}</Link></h2>
        <p className="project-summary">{content.summary}</p>
        {!compact && <p className="project-role"><span>{locale === "zh" ? "角色" : "Role"}</span>{roles.slice(0, 3).join(" · ")}</p>}
        <div className="project-card-footer">
          <div className="tag-list">{tags.slice(0, compact ? 3 : 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <span className="project-status"><i />{projectStatusLabels[locale][project.status]}</span>
          <Link className="text-link" href={`/${locale}/projects/${project.slug}`}>{locale === "zh" ? "查看详情" : "View case"}<span>→</span></Link>
        </div>
      </div>
    </article>
  );
}
