import Link from "next/link";
import type { Locale } from "@/lib/content";
import { projects as defaultProjects } from "@/lib/projects";
import type { SiteCopy } from "@/lib/site-copy";
import type { Project, Work } from "@/lib/types";

const typeLabelKeys: Record<Work["type"], keyof SiteCopy["works"]["types"]> = {
  "product-system": "productSystem",
  "research-report": "researchReport",
  "data-analysis": "dataAnalysis",
  prototype: "prototype",
  presentation: "presentation",
  "visual-design": "visualDesign",
  video: "video",
};

const statusLabelKeys: Record<Work["status"], keyof SiteCopy["works"]["statuses"]> = {
  public: "public",
  organizing: "organizing",
  "summary-only": "summaryOnly",
  private: "private",
};

export function WorkCard({ work, locale, copy, index, projects = defaultProjects }: { work: Work; locale: Locale; copy: SiteCopy["works"]; index: number; projects?: Project[] }) {
  const related = work.relatedProjectSlug ? projects.find((project) => project.slug === work.relatedProjectSlug) : undefined;
  const publicHref = work.downloadHref ?? work.href;

  return (
    <article className="work-row">
      <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="work-main"><span className="eyebrow">{copy.types[typeLabelKeys[work.type]]}</span><h2>{work.title}</h2><p>{work.description}</p></div>
      <div className="work-related">
        <span>{copy.relatedProject}</span>
        {related ? <Link href={`/${locale}/projects/${related.slug}`}>{related.content.title}</Link> : <b>—</b>}
      </div>
      <div className="work-action">
        <span className="work-status">{copy.statuses[statusLabelKeys[work.status]]}</span>
        {publicHref ? <a href={publicHref} {...(work.href ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}>{copy.view} →</a> : null}
      </div>
    </article>
  );
}
