"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale, SiteContent } from "@/lib/content";
import type { SiteCopy } from "@/lib/site-copy";

const routes = [
  { key: "home", path: "" },
  { key: "about", path: "/about" },
  { key: "projects", path: "/projects" },
  { key: "works", path: "/works" },
  { key: "resume", path: "/resume" },
  { key: "contact", path: "/contact" },
] as const;

export function Header({ locale, nav, brand, ui }: { locale: Locale; nav: SiteContent["nav"]; brand: string; ui: SiteCopy["ui"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href={`/${locale}`} className="brand" aria-label={ui.homeAria}>
          <span className="brand-mark">{ui.monogram}</span>
          <span>{brand}</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((value) => !value)}>
          <span>{open ? ui.menuClose : ui.menuOpen}</span>
          <i aria-hidden="true" />
        </button>
        <nav id="primary-nav" className={`primary-nav ${open ? "is-open" : ""}`} aria-label={ui.primaryNavAria}>
          {routes.map((route) => {
            const href = `/${locale}${route.path}`;
            const active = route.path === "" ? pathname === href : pathname.startsWith(href);
            return <Link key={route.key} href={href} className={active ? "active" : undefined} onClick={() => setOpen(false)}>{nav[route.key]}</Link>;
          })}
        </nav>
      </div>
    </header>
  );
}
