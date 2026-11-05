import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/Shop";
import { spellBySlug, spells } from "@/lib/catalog";

export function generateStaticParams() {
  return spells.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = spellBySlug(slug);
  return { title: p ? `${p.title} | Divine Brujita DJ` : "Spell | Divine Brujita DJ", description: p?.excerpt.slice(0, 160) };
}

export default async function SpellPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = spellBySlug(slug);
  if (!p) notFound();
  const related = spells.filter((x) => x.cats.some((k) => p.cats.includes(k)) && x.slug !== p.slug).slice(0, 4);
  return <ProductDetail p={p} related={related} />;
}
