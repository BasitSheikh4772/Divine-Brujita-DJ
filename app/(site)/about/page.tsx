import type { Metadata } from "next";
import { AboutView } from "@/components/About";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "About DJ — My Story | Divine Brujita DJ", description: "My spiritual journey, family and heritage, years in healthcare, values and boundaries." };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About DJ" title="Faith, family & a calling to help" sub="The story behind Divine Brujita DJ — and the values that guide every session." img="/img/hero.png" small />
      <AboutView />
    </>
  );
}
