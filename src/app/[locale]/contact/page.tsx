import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { isLocale } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getSiteData } from "@/lib/site-data";
import { notFound } from "next/navigation";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, "contact", "contact") : {}; }
export default async function ContactPage({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) notFound(); const { profile } = await getSiteData(); const topics = ["求职与岗位沟通", "跨境业务与市场研究", "数据分析与数字化工作流", "项目交流与合作"]; return <div className="section-shell page-shell contact-page"><PageIntro eyebrow="CONTACT / 联系" title="如有合适机会或希望进一步交流，欢迎联系我。" lead="优先通过邮件沟通；也可以在 GitHub 查看公开项目与后续更新。" /><div className="contact-grid"><a className="contact-card" href={`mailto:${profile.email}?subject=${encodeURIComponent("来自个人网站的联系")}`}><span className="contact-index">01</span><div><span className="eyebrow">EMAIL</span><h2>发送邮件</h2><p>欢迎联系，我会在看到后尽快回复。</p><strong>{profile.email}</strong></div><b>→</b></a><a className="contact-card" href={profile.github} target="_blank" rel="noopener noreferrer"><span className="contact-index">02</span><div><span className="eyebrow">GITHUB</span><h2>查看 GitHub</h2><p>浏览公开仓库、网站源码和后续项目更新。</p><strong>github.com/03Wan</strong></div><b>↗</b></a></div><section className="contact-topics"><span className="section-index">03</span><div><h2>适合联系我的主题</h2><ul>{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div></section><p className="privacy-note"><span>PRIVACY</span>为保护个人隐私，本网站不公开手机号、出生日期和政治面貌，也不收集访客表单数据。</p></div>; }
