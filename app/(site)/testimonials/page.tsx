import type { Metadata } from "next";
import { TestimonialsView } from "@/components/Pages";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Client Testimonials | Divine Brujita DJ", description: "Real client experiences shared after working with Divine Brujita DJ and Santísima Madre." };

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Real client experiences" sub="Nothing speaks louder than the voices of those who have experienced the work firsthand." img="/img/altar.png" small />
      <TestimonialsView />
    </>
  );
}
