import type { Metadata } from "next";
import { RitualsView } from "@/components/Pages";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Ritual Videos | Divine Brujita DJ", description: "A glimpse into the spiritual practice of Divine Brujita DJ." };

export default function RitualsPage() {
  return (
    <>
      <PageHero eyebrow="Ritual Videos" title="A glimpse into the practice" sub="During TikTok LIVE, each service begins by setting intentions, praying, and manifesting." img="/img/rituals.png" small />
      <RitualsView />
    </>
  );
}
