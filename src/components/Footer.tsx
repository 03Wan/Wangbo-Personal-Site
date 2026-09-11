import Link from "next/link";
import type { Locale } from "@/lib/content";
import type { DisplaySettings, Profile } from "@/lib/types";

export function Footer({ locale, profile, displaySettings }: { locale: Locale; profile: Profile; displaySettings: DisplaySettings }) {
  if (!displaySettings.showFooter) return null;
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div>
          <span className="footer-kicker">{profile.latinName} / {new Date().getFullYear()}</span>
          <p>以商业理解、数据洞察与数字化工具推进可靠交付。</p>
        </div>
        <div className="footer-links">
          {displaySettings.showProjects && <Link href={`/${locale}/projects`}>项目案例</Link>}
          {displaySettings.showResume && <Link href={`/${locale}/resume`}>简历</Link>}
          {displaySettings.showContact && <Link href={`/${locale}/contact`}>联系</Link>}
          {displaySettings.showGithub && <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
        </div>
        <small>© {new Date().getFullYear()} {profile.name}. 保留所有权利。</small>
      </div>
    </footer>
  );
}
