import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { getContent, isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "about", "about") : {}; }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const data = getContent(locale);
  return <div className="section-shell page-shell">
    <PageIntro eyebrow={data.about.eyebrow} title={data.about.title} lead={data.about.lead} />
    <section className="about-story">
      <div className="about-portrait"><Image src="/profile-wangbo.webp" alt={locale === "zh" ? "王波职业头像" : "Professional portrait of Wang Bo"} width={418} height={624} sizes="(max-width: 760px) 82vw, 300px" /><span>03 / WAN</span></div>
      <div className="story-copy"><span className="section-index">01</span><h2>{data.about.storyTitle}</h2>{data.about.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>
    <section className="principles-section"><div className="section-heading"><span className="section-index">02</span><h2>{data.about.principlesTitle}</h2></div><div className="principle-grid">{data.about.principles.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="education-block"><div><span className="eyebrow">EDUCATION</span><h2>{data.about.educationTitle}</h2></div><div><strong>{data.about.education}</strong><span>{data.about.educationMeta}</span></div></section>
  </div>;
}
