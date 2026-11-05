import type { Metadata } from "next";
import { DonationsView } from "@/components/Pages";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Donations | Divine Brujita DJ", description: "Support Divine Brujita DJ with a voluntary one-time or recurring donation." };

export default function DonationsPage() {
  return (
    <>
      <PageHero eyebrow="Donations" title="Support the devotion" sub="Donations are voluntary and help support Divine Brujita DJ." img="/img/backdrop.png" small />
      <DonationsView />
    </>
  );
}
