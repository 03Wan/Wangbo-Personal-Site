import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "年度好友亲密度测试",
  description: "输入双方名字，生成一份今年的好友默契报告。纯娱乐测试，不读取真实聊天记录。",
  openGraph: {
    title: "年度好友亲密度测试",
    description: "测测你和 TA 今年的好友亲密度，看看唯一风险项是什么。",
    type: "website",
    locale: "zh_CN",
    url: "https://www.myboverse.com/friendship",
    siteName: "年度好友亲密度测试",
  },
  twitter: {
    card: "summary",
    title: "年度好友亲密度测试",
    description: "测测你和 TA 今年的好友亲密度。",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function FriendshipLayout({ children }: { children: ReactNode }) {
  return children;
}
