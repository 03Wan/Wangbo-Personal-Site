import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getContent, isLocale, locales } from "@/lib/content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const data = getContent(rawLocale);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: rawLocale === "zh" ? "王波" : "Wang Bo",
    url: data.shared.site,
    image: `${data.shared.site}/profile-wangbo.webp`,
    email: `mailto:${data.shared.email}`,
    alumniOf: { "@type": "CollegeOrUniversity", name: rawLocale === "zh" ? "三江学院" : "Sanjiang University" },
    sameAs: [data.shared.github],
    knowsAbout: ["Cross-border e-commerce", "International trade", "AIGC"],
  };

  return (
    <div className="site-frame" lang={rawLocale === "zh" ? "zh-CN" : "en"}>
      <ScrollReveal />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header locale={rawLocale} nav={data.nav} brand={data.brand} />
      <main>{children}</main>
      <Footer locale={rawLocale} data={data} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
