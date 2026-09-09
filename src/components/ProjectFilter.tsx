"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Locale } from "@/lib/content";
import type { SiteCopy } from "@/lib/site-copy";
import type { Project, ProjectCategory } from "@/lib/types";

const categories: Array<"all" | ProjectCategory> = ["all", "cross-border", "aigc", "digital-trade", "product", "data-research", "rural-research"];
const categoryLabelKeys: Record<"all" | ProjectCategory, keyof SiteCopy["projects"]["categories"]> = {
  all: "all",
  "cross-border": "crossBorder",
  aigc: "aigc",
  "digital-trade": "digitalTrade",
  product: "product",
  "data-research": "dataResearch",
  "rural-research": "ruralResearch",
};

export function ProjectFilter({ projects, locale, copy, ariaLabel }: { projects: Project[]; locale: Locale; copy: SiteCopy["projects"]; ariaLabel: string }) {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const filtered = active === "all" ? projects : projects.filter((project) => project.category.includes(active));

  return (
    <>
      <div className="filter-bar" aria-label={ariaLabel}>
        {categories.map((category) => (
          <button key={category} type="button" className={active === category ? "is-active" : ""} aria-pressed={active === category} onClick={() => setActive(category)}>
            {copy.categories[categoryLabelKeys[category]]}
          </button>
        ))}
      </div>
      <section className="project-stack project-stack-full" aria-live="polite">
        {filtered.length > 0 ? filtered.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} copy={copy} index={index} />) : <p className="empty-state">{copy.empty}</p>}
      </section>
    </>
  );
}
