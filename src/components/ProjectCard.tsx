import Link from "next/link";
import type { Locale } from "@/lib/content";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, locale, compact = false, index }: { project: Project; locale: Locale; compact?: boolean; index: number }) {
  const roles = project.role;
  const categoryLabels: Record<string, string> = { "cross-border": "跨境业务", aigc: "AIGC", "digital-trade": "数字贸易", product: "产品实践", "data-research": "数据研究", "rural-research": "乡村调研" };
  return (
    <article className={`project-card ${compact ? "project-card-compact" : ""}`}>
      <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="project-card-body">
        <div className="project-meta"><span>{project.category.slice(0, 2).map((category) => categoryLabels[category] || category).join(" · ")}</span><span>{project.period}</span></div>
        <h2><Link href={`/${locale}/projects/${project.slug}`}>{project.title}</Link></h2>
        <p className="project-summary">{project.summary}</p>
        {!compact && <p className="project-role"><span>我的角色</span>{roles.slice(0, 3).join(" · ")}</p>}
        <div className="project-card-footer">
          <div className="tag-list">{project.skills.slice(0, compact ? 3 : 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <span className="project-status"><i />{{ completed: "已完成", ongoing: "进行中", archived: "已归档" }[project.status]}</span>
          <Link className="text-link" href={`/${locale}/projects/${project.slug}`}>查看案例<span>→</span></Link>
        </div>
      </div>
    </article>
  );
}
