import type { Metadata } from "next";
import { ProductBrowser } from "@/components/Shop";
import { PageHero } from "@/components/ui";
import { spellCats, spells } from "@/lib/catalog";

export const metadata: Metadata = { title: "Shop Spells | Divine Brujita DJ", description: "Browse every live spell service, bundle and signature working by Divine Brujita DJ." };

export default function ShopPage() {
  return (
    <>
      <PageHero eyebrow="Shop Spells" title="Every working, performed live" sub="Choose your spell, add it to your cart and join the TikTok LIVE to be added to the queue." img="/img/spells.png" small />
      <ProductBrowser products={spells} cats={spellCats} placeholder="Search spells — e.g. road opener, protection, love…" />
    </>
  );
}
