import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myboverse.com"),
  title: { default: "王波 | 个人官网", template: "%s | 王波" },
  description: "王波的个人官网：关于我、项目作品、个人简历与联系方式。",
  authors: [{ name: "王波", url: "https://www.myboverse.com" }],
  creator: "王波",
  openGraph: {
    type: "website",
    siteName: "王波个人官网",
    locale: "zh_CN",
    alternateLocale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "王波个人官网" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f5f7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
