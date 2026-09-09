import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getSiteData } from "@/lib/site-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "contact", "contact") : {}; }

export default async function ContactPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const snapshot = await getSiteData(); const data = snapshot.content[locale]; const extra = snapshot.siteCopy[locale].contact; const ui = snapshot.siteCopy[locale].ui;
  return <div className="section-shell page-shell contact-page"><PageIntro eyebrow={data.contact.eyebrow} title={data.contact.title} lead={data.contact.lead} /><div className="contact-grid"><a className="contact-card" href={`mailto:${data.shared.email}?subject=${encodeURIComponent(ui.emailSubject)}`}><span className="contact-index">01</span><div><span className="eyebrow">{ui.emailLabel}</span><h2>{data.contact.emailTitle}</h2><p>{data.contact.emailText}</p><strong>{data.shared.email}</strong></div><b>→</b></a><a className="contact-card" href={data.shared.github} target="_blank" rel="noopener noreferrer"><span className="contact-index">02</span><div><span className="eyebrow">{ui.githubLabel}</span><h2>{data.contact.githubTitle}</h2><p>{data.contact.githubText}</p><strong>{ui.githubDisplay}</strong></div><b>↗</b></a></div><section className="contact-topics"><span className="section-index">03</span><div><h2>{extra.topicsTitle}</h2><ul>{extra.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div></section><p className="privacy-note"><span>{ui.privacyLabel}</span>{data.contact.privacy}</p></div>;
}
