export function PageIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="page-intro reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{lead}</p>
    </section>
  );
}
