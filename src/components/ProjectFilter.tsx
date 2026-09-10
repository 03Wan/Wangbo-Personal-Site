"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Locale } from "@/lib/content";
import type { Project, ProjectCategory } from "@/lib/types";

const categories: Array<"all" | ProjectCategory> = ["all", "cross-border", "aigc", "digital-trade", "product", "data-research", "rural-research"];
const categoryLabels: Record<"all" | ProjectCategory, string> = {
  all: "全部", "cross-border": "跨境业务", aigc: "AIGC", "digital-trade": "数字贸易", product: "产品实践", "data-research": "数据研究", "rural-research": "乡村调研",
};

export function ProjectFilter({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const filtered = active === "all" ? projects : projects.filter((project) => project.category.includes(active));

  return (
    <>
      <div className="filter-bar" aria-label="按项目类别筛选">
        {categories.map((category) => (
          <button key={category} type="button" className={active === category ? "is-active" : ""} aria-pressed={active === category} onClick={() => setActive(category)}>
            {categoryLabels[category]}
          </button>
        ))}
      </div>
      <section className="project-stack project-stack-full" aria-live="polite">
        {filtered.length > 0 ? filtered.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} />) : <p className="empty-state">该分类暂无项目。</p>}
      </section>
    </>
  );
}
