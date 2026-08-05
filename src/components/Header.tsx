"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale, SiteContent } from "@/lib/content";

const routes = [
  { key: "home", path: "" },
  { key: "about", path: "/about" },
  { key: "projects", path: "/projects" },
  { key: "resume", path: "/resume" },
  { key: "contact", path: "/contact" },
] as const;

export function Header({ locale, nav, brand }: { locale: Locale; nav: SiteContent["nav"]; brand: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nextLocale = locale === "zh" ? "en" : "zh";
  const languagePath = pathname.replace(/^\/(zh|en)/, `/${nextLocale}`);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href={`/${locale}`} className="brand" aria-label={locale === "zh" ? "返回首页" : "Back to home"}>
          <span className="brand-mark">WB</span>
          <span>{brand}</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((value) => !value)}>
          <span>{open ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
        <nav id="primary-nav" className={`primary-nav ${open ? "is-open" : ""}`} aria-label={locale === "zh" ? "主导航" : "Primary navigation"}>
          {routes.map((route) => {
            const href = `/${locale}${route.path}`;
            const active = pathname === href;
            return <Link key={route.key} href={href} className={active ? "active" : undefined} onClick={() => setOpen(false)}>{nav[route.key]}</Link>;
          })}
          <Link href={languagePath || `/${nextLocale}`} className="language-switch" lang={nextLocale === "zh" ? "zh-CN" : "en"} onClick={() => setOpen(false)}>
            {nextLocale === "zh" ? "中" : "EN"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
