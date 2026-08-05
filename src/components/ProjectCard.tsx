import type { SiteContent } from "@/lib/content";

type Project = SiteContent["projects"]["items"][number];

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`project-card ${compact ? "project-card-compact" : ""}`}>
      <div className="project-number">{project.number}</div>
      <div className="project-card-body">
        <div className="project-meta"><span>{project.level}</span><span>{project.period}</span></div>
        <h2>{project.title}</h2>
        <p className="project-summary">{project.summary}</p>
        {!compact && <ul className="clean-list">{project.details.map((item) => <li key={item}>{item}</li>)}</ul>}
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}
