import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span>404</span><h1>Nothing here yet.</h1><p>这个页面尚不存在，返回主页继续浏览。</p><Link className="button button-primary" href="/zh">返回首页 →</Link></main>;
}
