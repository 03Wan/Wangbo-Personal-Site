import Link from "next/link";
import type { Locale, SiteContent } from "@/lib/content";

export function Footer({ locale, data }: { locale: Locale; data: SiteContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div>
          <span className="footer-kicker">WANG BO / {new Date().getFullYear()}</span>
          <p>{data.footer.line}</p>
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/projects`}>{data.nav.projects}</Link>
          <Link href={`/${locale}/resume`}>{data.nav.resume}</Link>
          <a href={data.shared.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
        <small>© {new Date().getFullYear()} Wang Bo. {data.footer.rights}</small>
      </div>
    </footer>
  );
}
