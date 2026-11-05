import type { Metadata } from "next";
import { FaqView } from "@/components/Pages";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "FAQ — The Path to Clarity | Divine Brujita DJ", description: "Answers to the questions asked most often before booking your spiritual journey." };

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="The Path to Clarity" sub="Find answers to the questions asked most often before booking your spiritual journey." img="/img/faq.png" small />
      <FaqView />
    </>
  );
}
