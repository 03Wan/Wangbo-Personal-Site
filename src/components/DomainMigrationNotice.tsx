"use client";

import { useEffect, useState } from "react";
import type { SiteCopy } from "@/lib/site-copy";

export function DomainMigrationNotice({ copy, destination }: { copy: SiteCopy["migration"]; destination: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hostname = window.location.hostname;
      const isZhixuanYoufaDomain = hostname === "zhixuanyoufa.myboverse.com";
      if (!isZhixuanYoufaDomain) setOpen(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function dismiss() {
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="migration-backdrop" role="presentation">
      <section className="migration-dialog" role="dialog" aria-modal="true" aria-labelledby="migration-title" aria-describedby="migration-description">
        <div className="migration-heading"><span className="eyebrow">{copy.eyebrow}</span><button type="button" onClick={dismiss}>{copy.close}</button></div>
        <h2 id="migration-title">{copy.title}</h2>
        <p id="migration-description">{copy.description}</p>
        <a className="migration-domain" href={destination} target="_blank" rel="noopener noreferrer">{copy.displayDomain} <span>↗</span></a>
        <div className="migration-actions"><a className="button button-primary" href={destination} target="_blank" rel="noopener noreferrer">{copy.visit}<span>→</span></a><button className="button button-ghost" type="button" onClick={dismiss}>{copy.stay}</button></div>
      </section>
    </div>
  );
}
