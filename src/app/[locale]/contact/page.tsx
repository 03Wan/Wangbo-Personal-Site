import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { getContent, isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "contact", "contact") : {}; }

export default async function ContactPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const data = getContent(locale);
  return <div className="section-shell page-shell contact-page"><PageIntro eyebrow={data.contact.eyebrow} title={data.contact.title} lead={data.contact.lead} /><div className="contact-grid"><a className="contact-card" href={`mailto:${data.shared.email}`}><span className="contact-index">01</span><div><span className="eyebrow">EMAIL</span><h2>{data.contact.emailTitle}</h2><p>{data.contact.emailText}</p><strong>{data.shared.email}</strong></div><b>↗</b></a><a className="contact-card" href={data.shared.github} target="_blank" rel="noreferrer"><span className="contact-index">02</span><div><span className="eyebrow">GITHUB</span><h2>{data.contact.githubTitle}</h2><p>{data.contact.githubText}</p><strong>github.com/03Wan</strong></div><b>↗</b></a></div><p className="privacy-note"><span>PRIVACY</span>{data.contact.privacy}</p></div>;
}
