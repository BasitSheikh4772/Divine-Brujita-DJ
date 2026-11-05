import type { Metadata } from "next";
import { Faq } from "@/components/Sections";
import { ServicesView } from "@/components/ServicesView";

export const metadata: Metadata = {
  title: "Spell Services & Pricing | Divine Brujita DJ",
  description:
    "Browse 50+ live spell services — love, protection, road openers, healing, justice and more — performed live on TikTok by Divine Brujita DJ. Transparent pricing from $30.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesView />
      <Faq compact />
    </>
  );
}
