import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Reveal } from "@/components/ui";
import { legalBlocks, legalDocs } from "@/lib/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export default async function LegalDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();
  const blocks = legalBlocks(doc.slug);
  const heads = blocks.filter((b) => b.t === "h2");
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} small />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[16rem_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/80">Policies</p>
          <ul className="mb-8 space-y-1">
            {legalDocs.map((d) => (
              <li key={d.slug}><Link href={`/legal/${d.slug}`} className={`block rounded-xl px-3 py-2 text-sm transition ${d.slug === slug ? "bg-white/10 text-gold" : "text-muted hover:text-white"}`}>{d.title}</Link></li>
            ))}
          </ul>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold/80">On this page</p>
          <ul className="hidden space-y-1.5 text-xs text-muted lg:block">
            {heads.map((h) => <li key={h.id}><a href={`#${h.id}`} className="transition hover:text-white">{h.text}</a></li>)}
          </ul>
        </aside>
        <article className="max-w-3xl space-y-4 leading-relaxed text-white/80">
          {blocks.map((b, i) =>
            b.t === "h2" ? (
              <h2 key={i} id={b.id} className="font-display scroll-mt-28 pt-6 text-3xl text-white">{b.text}</h2>
            ) : b.t === "li" ? (
              <p key={i} className="flex gap-3 pl-2 text-sm text-muted"><span className="text-gold">✦</span>{b.text}</p>
            ) : (
              <Reveal key={i} y={14}><p className="text-sm text-muted sm:text-base">{b.text}</p></Reveal>
            ),
          )}
        </article>
      </section>
    </>
  );
}
