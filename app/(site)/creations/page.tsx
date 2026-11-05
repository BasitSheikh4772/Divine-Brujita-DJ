import type { Metadata } from "next";
import { ProductBrowser } from "@/components/Shop";
import { PageHero } from "@/components/ui";
import { creationCats, creations } from "@/lib/catalog";

export const metadata: Metadata = { title: "Divine Creations | Divine Brujita DJ", description: "Handcrafted crystals, jewelry, devotional pieces and hair care from Divine Creations by DJ." };

export default function CreationsPage() {
  return (
    <>
      <PageHero eyebrow="Divine Creations by DJ" title="Handcrafted with love, purpose & magic" sub="Crystals, devotional pieces, jewelry and hair care — each made with intention." img="/img/creations.png" small />
      <ProductBrowser products={creations} cats={creationCats} placeholder="Search creations — e.g. moldavite, owl, hair oil…" />
    </>
  );
}
