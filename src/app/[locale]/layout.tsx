import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { isLocale, locales } from "@/lib/content";
import { getSiteData } from "@/lib/site-data";

// Content is managed in Sanity and should be read again after every publish.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const snapshot = await getSiteData();
  const data = snapshot.content[rawLocale];
  const ui = snapshot.siteCopy[rawLocale].ui;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ui.personName,
    url: data.shared.site,
    image: `${data.shared.site}/profile-wangbo.webp`,
    email: `mailto:${data.shared.email}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "三江学院" },
    sameAs: [data.shared.github],
    knowsAbout: ["Cross-border e-commerce", "International trade", "AIGC"],
  };

  return (
    <div className="site-frame" lang="zh-CN">
      <ScrollReveal />
      <Header locale={rawLocale} nav={data.nav} brand={data.brand} ui={ui} />
      <main>{children}</main>
      <Footer locale={rawLocale} data={data} ui={ui} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
