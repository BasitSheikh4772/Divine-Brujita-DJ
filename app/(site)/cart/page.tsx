import type { Metadata } from "next";
import { CartView } from "@/components/Pages";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Cart | Divine Brujita DJ" };

export default function CartPage() {
  return (
    <>
      <PageHero eyebrow="Your cart" title="Ready when you are" small />
      <CartView />
    </>
  );
}
