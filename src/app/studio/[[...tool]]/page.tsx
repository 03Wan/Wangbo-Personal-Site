import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <section style={{ maxWidth: 620 }}>
          <p style={{ letterSpacing: '.12em', fontSize: 12 }}>SANITY STUDIO</p>
          <h1>请先连接 Sanity 项目</h1>
          <p>复制 .env.example 为 .env.local，填入 NEXT_PUBLIC_SANITY_PROJECT_ID 和 NEXT_PUBLIC_SANITY_DATASET，然后重启开发服务器。</p>
        </section>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
