"use client";

import { useEffect, useState } from "react";
import type { DomainNotice } from "@/lib/types";

export function DomainMigrationNotice({ notice }: { notice: DomainNotice }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setOpen(notice.enabled && window.location.hostname !== new URL(notice.url).hostname);
      } catch {
        setOpen(false);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [notice.enabled, notice.url]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  if (!open) return null;

  const displayDomain = new URL(notice.url).hostname;
  return (
    <div className="migration-backdrop" role="presentation">
      <section className="migration-dialog" role="dialog" aria-modal="true" aria-labelledby="migration-title" aria-describedby="migration-description">
        <div className="migration-heading"><span className="eyebrow">DOMAIN UPDATE</span><button type="button" onClick={() => setOpen(false)}>关闭</button></div>
        <h2 id="migration-title">{notice.title}</h2>
        <p id="migration-description">{notice.description}</p>
        <a className="migration-domain" href={notice.url} target="_blank" rel="noopener noreferrer">{displayDomain}<span>↗</span></a>
        <div className="migration-actions"><a className="button button-primary" href={notice.url} target="_blank" rel="noopener noreferrer">前往智选优发新官网<span>→</span></a><button className="button button-ghost" type="button" onClick={() => setOpen(false)}>暂时留在个人官网</button></div>
      </section>
    </div>
  );
}
