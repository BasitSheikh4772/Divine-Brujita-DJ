import { BookCta, Creations, Faq, HowItWorks, Intentions, KeywordStrip, Madre, Rituals, Signature, Stats, Testimonials, Weekly, Why } from "@/components/Sections";
import { Hero } from "@/components/Hero";
import { FeaturedVideos } from "@/components/Videos";

export default function Home() {
  return (
    <>
      <Hero />
      <KeywordStrip />
      <Stats />
      <Madre />
      <HowItWorks />
      <Weekly />
      <Signature />
      <Intentions />
      <Testimonials />
      <Rituals />
      <FeaturedVideos />
      <Creations />
      <Why />
      <Faq />
      <BookCta />
    </>
  );
}
