import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/Shop";
import { creationBySlug, creations } from "@/lib/catalog";

export function generateStaticParams() {
  return creations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = creationBySlug(slug);
  return { title: p ? `${p.title} | Divine Creations` : "Divine Creations", description: p?.excerpt.slice(0, 160) };
}

export default async function CreationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = creationBySlug(slug);
  if (!p) notFound();
  const related = creations.filter((x) => x.cats.some((k) => p.cats.includes(k)) && x.slug !== p.slug).slice(0, 4);
  return <ProductDetail p={p} related={related} />;
}
