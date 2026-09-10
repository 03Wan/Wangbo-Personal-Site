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
  const { profile } = await getSiteData();
  const personJsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: profile.site, image: `${profile.site}/profile-wangbo.webp`, email: `mailto:${profile.email}`, alumniOf: { "@type": "CollegeOrUniversity", name: "三江学院" }, sameAs: [profile.github], knowsAbout: ["Cross-border e-commerce", "Market research", "Data analysis", "AI workflows"] };
  return <div className="site-frame" lang="zh-CN"><ScrollReveal /><Header locale={locale} profile={profile} /><main>{children}</main><Footer locale={locale} profile={profile} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} /></div>;
}
