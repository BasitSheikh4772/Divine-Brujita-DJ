import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Reveal, SpotlightCard } from "@/components/ui";
import { legalDocs } from "@/lib/legal";

export const metadata: Metadata = { title: "Legal | Divine Brujita DJ" };

export default function LegalPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms, privacy & policies" sub="Please read these before booking a service or purchasing a product." small />
      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-20 sm:grid-cols-2">
        {legalDocs.map((d, i) => (
          <Reveal key={d.slug} delay={(i % 2) * 0.1}>
            <Link href={`/legal/${d.slug}`} className="block h-full">
              <SpotlightCard className="h-full">
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Policy</p>
                  <h2 className="font-display mt-2 text-3xl text-white">{d.title}</h2>
                  <p className="mt-3 text-sm text-muted">{d.desc}</p>
                  <span className="mt-6 inline-block text-sm text-gold">Read →</span>
                </div>
              </SpotlightCard>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
