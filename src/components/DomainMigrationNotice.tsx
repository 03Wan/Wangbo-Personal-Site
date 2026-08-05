"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

const destination = "https://www.myboverse.com/";
const storageKey = "zhixuan-youfa-domain-notice-v1";

export function DomainMigrationNotice({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hostname = window.location.hostname;
      const isNewDomain = hostname === "myboverse.com" || hostname === "www.myboverse.com";
      if (!isNewDomain && window.localStorage.getItem(storageKey) !== "dismissed") setOpen(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function dismiss() {
    window.localStorage.setItem(storageKey, "dismissed");
    setOpen(false);
  }

  const copy = locale === "zh"
    ? {
        close: "关闭",
        title: "智选优发已启用新域名",
        description: "智选优发现已迁移至新的官方网站。后续产品介绍与更新将在新站发布，建议使用并收藏新地址。",
        visit: "前往智选优发新官网",
        stay: "暂时留在个人官网",
      }
    : {
        close: "Close",
        title: "Zhixuan Youfa has moved",
        description: "Zhixuan Youfa now has a new official website. Future product information and updates will be published there, so please bookmark the new address.",
        visit: "Visit the new Zhixuan Youfa site",
        stay: "Stay on the portfolio",
      };

  if (!open) return null;

  return (
    <div className="migration-backdrop" role="presentation">
      <section className="migration-dialog" role="dialog" aria-modal="true" aria-labelledby="migration-title" aria-describedby="migration-description">
        <div className="migration-heading"><span className="eyebrow">DOMAIN UPDATE / 01</span><button type="button" onClick={dismiss}>{copy.close}</button></div>
        <h2 id="migration-title">{copy.title}</h2>
        <p id="migration-description">{copy.description}</p>
        <a className="migration-domain" href={destination} target="_blank" rel="noopener noreferrer">myboverse.com <span>↗</span></a>
        <div className="migration-actions"><a className="button button-primary" href={destination} target="_blank" rel="noopener noreferrer">{copy.visit}<span>→</span></a><button className="button button-ghost" type="button" onClick={dismiss}>{copy.stay}</button></div>
      </section>
    </div>
  );
}
