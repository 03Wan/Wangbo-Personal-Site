"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { projectCategoryLabels } from "@/lib/projects";
import type { Locale } from "@/lib/content";
import type { Project, ProjectCategory } from "@/lib/types";

const categories: Array<"all" | ProjectCategory> = ["all", "cross-border", "aigc", "digital-trade", "product", "data-research", "rural-research"];

export function ProjectFilter({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const filtered = active === "all" ? projects : projects.filter((project) => project.category.includes(active));

  return (
    <>
      <div className="filter-bar" aria-label={locale === "zh" ? "按项目类别筛选" : "Filter by project category"}>
        {categories.map((category) => (
          <button key={category} type="button" className={active === category ? "is-active" : ""} aria-pressed={active === category} onClick={() => setActive(category)}>
            {projectCategoryLabels[locale][category]}
          </button>
        ))}
      </div>
      <section className="project-stack project-stack-full" aria-live="polite">
        {filtered.length > 0 ? filtered.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} />) : <p className="empty-state">{locale === "zh" ? "该分类暂无项目。" : "No projects in this category yet."}</p>}
      </section>
    </>
  );
}
