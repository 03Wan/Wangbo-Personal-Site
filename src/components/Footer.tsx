import Link from "next/link";
import type { Locale, SiteContent } from "@/lib/content";
import type { SiteCopy } from "@/lib/site-copy";

export function Footer({ locale, data, ui }: { locale: Locale; data: SiteContent; ui: SiteCopy["ui"] }) {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div>
          <span className="footer-kicker">{ui.latinName} / {new Date().getFullYear()}</span>
          <p>{data.footer.line}</p>
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/projects`}>{data.nav.projects}</Link>
          <Link href={`/${locale}/works`}>{data.nav.works}</Link>
          <Link href={`/${locale}/resume`}>{data.nav.resume}</Link>
          <a href={data.shared.github} target="_blank" rel="noopener noreferrer">{ui.footerGithub} ↗</a>
        </div>
        <small>© {new Date().getFullYear()} {ui.personName}. {data.footer.rights}</small>
      </div>
    </footer>
  );
}
