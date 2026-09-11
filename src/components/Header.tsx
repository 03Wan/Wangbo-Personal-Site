"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/content";
import type { DisplaySettings, Profile } from "@/lib/types";

const routes = [
  { label: "首页", path: "", setting: "showHome" },
  { label: "项目案例", path: "/projects", setting: "showProjects" },
  { label: "简历", path: "/resume", setting: "showResume" },
  { label: "关于", path: "/about", setting: "showAbout" },
  { label: "联系", path: "/contact", setting: "showContact" },
] as const;

export function Header({ locale, profile, displaySettings }: { locale: Locale; profile: Profile; displaySettings: DisplaySettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href={`/${locale}`} className="brand" aria-label="返回首页">
          <span className="brand-mark">{profile.monogram}</span>
          <span>{profile.latinName}</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen((value) => !value)}>
          <span>{open ? "关闭" : "菜单"}</span>
          <i aria-hidden="true" />
        </button>
        <nav id="primary-nav" className={`primary-nav ${open ? "is-open" : ""}`} aria-label="主导航">
          {routes.filter((route) => displaySettings[route.setting]).map((route) => {
            const href = `/${locale}${route.path}`;
            const active = route.path === "" ? pathname === href : pathname.startsWith(href);
            return <Link key={route.path} href={href} className={active ? "active" : undefined} onClick={() => setOpen(false)}>{route.label}</Link>;
          })}
        </nav>
      </div>
    </header>
  );
}
