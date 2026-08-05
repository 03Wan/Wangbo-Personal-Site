import Link from "next/link";
import type { Locale } from "@/lib/content";
import { getProject } from "@/lib/projects";
import { workStatusLabels, workTypeLabels } from "@/lib/works";
import type { Work } from "@/lib/types";

export function WorkCard({ work, locale, index }: { work: Work; locale: Locale; index: number }) {
  const related = work.relatedProjectSlug ? getProject(work.relatedProjectSlug) : undefined;
  const title = locale === "zh" ? work.title : work.titleEn;
  const description = locale === "zh" ? work.description : work.descriptionEn;
  const publicHref = work.downloadHref ?? work.href;

  return (
    <article className="work-row">
      <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="work-main"><span className="eyebrow">{workTypeLabels[locale][work.type]}</span><h2>{title}</h2><p>{description}</p></div>
      <div className="work-related">
        <span>{locale === "zh" ? "关联项目" : "Related project"}</span>
        {related ? <Link href={`/${locale}/projects/${related.slug}`}>{related.localeContent[locale].title}</Link> : <b>—</b>}
      </div>
      <div className="work-action">
        <span className="work-status">{workStatusLabels[locale][work.status]}</span>
        {publicHref ? <a href={publicHref} {...(work.href ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}>{locale === "zh" ? "查看" : "View"} →</a> : null}
      </div>
    </article>
  );
}
