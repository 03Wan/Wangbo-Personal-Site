"use client";

export function BackToTop() {
  return <button className="back-to-top" type="button" aria-label="返回网页顶部" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>;
}
