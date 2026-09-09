import Link from "next/link";
import type { Locale } from "@/lib/content";
import type { SiteCopy } from "@/lib/site-copy";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, locale, copy, compact = false, index }: { project: Project; locale: Locale; copy: SiteCopy["projects"]; compact?: boolean; index: number }) {
  const content = project.content;
  const roles = project.role;
  const tags = project.tags;
  return (
    <article className={`project-card ${compact ? "project-card-compact" : ""}`}>
      <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="project-card-body">
        <div className="project-meta"><span>{project.level}</span><span>{project.period}</span></div>
        <h2><Link href={`/${locale}/projects/${project.slug}`}>{content.title}</Link></h2>
        <p className="project-summary">{content.summary}</p>
        {!compact && <p className="project-role"><span>{copy.roleLabel}</span>{roles.slice(0, 3).join(" · ")}</p>}
        <div className="project-card-footer">
          <div className="tag-list">{tags.slice(0, compact ? 3 : 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <span className="project-status"><i />{copy.statuses[project.status]}</span>
          <Link className="text-link" href={`/${locale}/projects/${project.slug}`}>{copy.viewCase}<span>→</span></Link>
        </div>
      </div>
    </article>
  );
}
