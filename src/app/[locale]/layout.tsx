import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { isLocale, locales } from "@/lib/content";
import { getSiteData } from "@/lib/site-data";

export const dynamic = "force-dynamic";
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { profile, displaySettings, siteAppearance } = await getSiteData();
  const appearanceCss = `:root { --bg: ${siteAppearance.backgroundColor}; --surface: ${siteAppearance.backgroundColor}; --text: ${siteAppearance.textColor}; --accent: ${siteAppearance.accentColor}; --max: ${siteAppearance.contentWidth === "wide" ? "1480px" : "1320px"}; --section-space: ${siteAppearance.spacing === "compact" ? "52px" : "72px"}; --section-space-mobile: ${siteAppearance.spacing === "compact" ? "40px" : "54px"}; --base-font-size: ${siteAppearance.bodyScale === "large" ? "17px" : "16px"}; --heading-scale: ${siteAppearance.headingScale === "large" ? "1.12" : "1"}; }`;
  const personJsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: profile.site, image: `${profile.site}/profile-wangbo.webp`, email: `mailto:${profile.email}`, alumniOf: { "@type": "CollegeOrUniversity", name: "三江学院" }, sameAs: [profile.github], knowsAbout: ["Cross-border e-commerce", "Market research", "Data analysis", "AI workflows"] };
  return <><style>{appearanceCss}</style><div className={`site-frame font-${siteAppearance.fontStyle}`} lang="zh-CN"><ScrollReveal /><Header locale={locale} profile={profile} displaySettings={displaySettings} /><main>{children}</main><Footer locale={locale} profile={profile} displaySettings={displaySettings} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} /></div></>;
}
