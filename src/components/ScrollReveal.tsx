"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "main > section",
  ".page-shell > .page-intro",
  ".page-shell > section",
  ".page-shell > .contact-grid",
  ".page-shell > .resume-actions",
  ".page-shell > .resume-layout",
  ".case-page > .case-hero",
  ".case-page > .case-section",
  ".case-page > .case-pagination",
  ".project-card",
  ".work-row",
  ".contact-card",
  ".resume-entry",
  ".footer-shell",
].join(",");

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>(revealSelector);

      if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -10%", threshold: 0.08 });

      elements.forEach((element, index) => {
        element.classList.add("scroll-reveal");
        element.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
        observer?.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
