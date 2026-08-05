import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { getContent, isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteCopy } from "@/lib/site-copy";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "about", "about") : {}; }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const data = getContent(locale); const extra = siteCopy[locale].about;
  return <div className="section-shell page-shell">
    <PageIntro eyebrow={data.about.eyebrow} title={data.about.title} lead={data.about.lead} />
    <section className="about-story">
      <div className="about-portrait"><Image src="/profile-wangbo.webp" alt={locale === "zh" ? "王波职业头像" : "Professional portrait of Wang Bo"} width={418} height={624} sizes="(max-width: 760px) 82vw, 300px" /><span>03 / WAN</span></div>
      <div className="story-copy"><span className="section-index">01</span><h2>{data.about.storyTitle}</h2>{data.about.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>
    <section className="principles-section"><div className="section-heading"><span className="section-index">02</span><h2>{data.about.principlesTitle}</h2></div><div className="principle-grid">{data.about.principles.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="about-focus"><div className="section-heading"><span className="section-index">03</span><h2>{extra.focusTitle}</h2></div><ul>{extra.focuses.map((focus, index) => <li key={focus}><span>{String(index + 1).padStart(2, "0")}</span>{focus}</li>)}</ul></section>
    <section className="tools-section"><div className="section-heading"><span className="section-index">04</span><h2>{extra.toolsTitle}</h2></div><div className="tools-grid">{extra.tools.map((group) => <article key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
    <section className="education-block"><div><span className="section-index">05</span><h2>{data.about.educationTitle}</h2></div><div><strong>{data.about.education}</strong><span>{data.about.educationMeta}</span></div></section>
  </div>;
}
