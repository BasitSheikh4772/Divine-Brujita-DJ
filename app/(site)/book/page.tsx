import type { Metadata } from "next";
import { ReadingsInfo } from "@/components/About";
import { BookView } from "@/components/Pages";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Book a Session | Divine Brujita DJ", description: "Reserve your spiritual session with Divine Brujita DJ." };

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Book Now" title="Reserve your session" sub="Choose your service, pick a day and share what you’d like to focus on." img="/img/work.png" small />
      <ReadingsInfo />
      <BookView />
    </>
  );
}
