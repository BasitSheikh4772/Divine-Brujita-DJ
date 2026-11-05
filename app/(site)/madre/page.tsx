import type { Metadata } from "next";
import Image from "next/image";
import { GlowButton, PageHero, ParallaxImage, Reveal, SectionHeading, SpotlightCard } from "@/components/ui";
import { sq } from "@/lib/catalog";

export const metadata: Metadata = { title: "Madre — Our Holy Mother | Divine Brujita DJ", description: "Learn about Santísima Muerte, Our Holy Mother — protection, justice, healing and transformation." };

const sections = [
  { t: "Madre — Our Holy Mother", body: ["She is known by many names, including La Niña Blanca, La Flaquita, Santísima, Madre, and Lady Death. To many of us, she is simply Madre — our Holy Mother.", "Beneath our skin, beyond our titles, mistakes, and differences, we are all bones. We are all equal, and she reminds us of that truth."], list: ["She does not judge.", "She does not reject.", "She does not discriminate."], after: "She welcomes everyone, regardless of your past, your struggles, your skin color, your status, or who you love. In a world where many feel unseen or unheard, she listens." },
  { t: "She Walks With You", body: ["When you feel alone, she stands beside you. When you are afraid, she gives you strength.", "Many people fear her because she represents death, but death itself is not evil. It is natural, inevitable, and sacred.", "She walks before you to help guide your path. She walks beside you to support you when you are weak. She walks behind you to help protect you from betrayal and harm.", "She whispers intuition into your heart, reveals what is hidden, and sees both what is spoken and what remains unspoken. She knows the intentions of those around you and helps guide you with wisdom."] },
  { t: "Offerings Are Acts of Gratitude", body: ["Offerings are never bribes — they are expressions of gratitude and devotion. Common offerings include:"], list: ["A candle", "Fresh flowers", "A heartfelt prayer", "A glass of water", "A shot of tequila"], after: "She does not measure devotion by money. She measures it by sincerity, respect, and faith." },
  { t: "Everyone Is Welcome", body: ["Anyone can come into her arms."], list: ["The rich.", "The poor.", "The broken.", "The hopeful."], after: "Because death comes for us all equally, there is unity in her embrace. She reminds us that every life has value and every soul deserves compassion." },
  { t: "A Reminder to Live With Faith", body: ["Santísima Madre is not something to fear. She is a reminder to:"], list: ["Live fully.", "Love deeply.", "Forgive quickly.", "Walk with faith."] },
];

export default function MadrePage() {
  return (
    <>
      <PageHero eyebrow="Madre" title="Our Holy Mother, Santísima Muerte" sub="Protection, justice, healing, transformation and the sacred cycle of life and death." img="/img/madre.png" />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-6 text-lg leading-relaxed text-white/80">
          <Reveal><p><span className="font-display text-3xl text-gold">Santísima Muerte</span>, lovingly known as Our Holy Mother of Death, is a deeply revered folk saint honored by millions of devoted followers throughout Mexico and around the world. To those who walk beside her, she symbolizes protection, justice, healing, transformation, strength, and the sacred cycle of life and death.</p></Reveal>
          <Reveal delay={0.1}><p className="text-base text-muted">She reminds us that before the Creator, every soul is equal regardless of wealth, status, background, or past mistakes. Her love is not reserved for a select few; she welcomes all who approach her with genuine faith, humility, respect, and a sincere heart.</p></Reveal>
          <Reveal delay={0.2}><p className="text-base text-muted">For many devotees, Santísima Muerte is a constant source of comfort during life’s greatest joys and most difficult challenges. She is honored as a compassionate spiritual guide who inspires courage, hope, resilience, and inner peace while encouraging her followers to walk their path with honesty, responsibility, and devotion.</p></Reveal>
          <Reveal delay={0.3}><p className="text-base text-muted">At Divine Brujita DJ, every prayer and devotional offering is made with the deepest reverence and gratitude for Our Holy Mother. She is honored with love, respect, and unwavering faith, recognizing her as a powerful symbol of compassion, protection, and spiritual guidance.</p></Reveal>
        </div>
        <ParallaxImage src={sq("https://images.squarespace-cdn.com/content/v1/6a4d5effe9ce341ca3551477/11b2589d-245a-4e9b-805d-8175986d39bc/ChatGPT+Image+Aug+1%2C+2026%2C+05_09_31+PM.png", 900)} alt="Santísima Madre devotional artwork" className="aspect-[4/5] rounded-[2rem] border border-gold/30" amount={40} sizes="(min-width:1024px) 40vw, 90vw" />
      </section>

      <Reveal className="mx-auto max-w-3xl px-6 py-10 text-center">
        <p className="font-display text-4xl italic leading-snug text-gold-shimmer sm:text-5xl">Nuestra Santísima Muerte. Nuestra Madre. Siempre con nosotros.</p>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="Devotion" title="Learn who she is" />
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((s, i) => (
            <Reveal key={s.t} delay={(i % 2) * 0.1} className={i === sections.length - 1 && sections.length % 2 ? "md:col-span-2" : ""}>
              <SpotlightCard className="h-full">
                <div className="p-8 sm:p-10">
                  <p className="mb-3 text-gold">🤍</p>
                  <h3 className="font-display text-3xl font-semibold text-white">{s.t}</h3>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                    {s.body.map((b) => <p key={b}>{b}</p>)}
                    {s.list && (
                      <ul className="space-y-1.5 py-1 text-white/90">
                        {s.list.map((l) => <li key={l} className="flex gap-2"><span className="text-gold">✦</span>{l}</li>)}
                      </ul>
                    )}
                    {s.after && <p>{s.after}</p>}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 p-10 text-center sm:p-16">
          <Image src={sq("https://images.squarespace-cdn.com/content/v1/6a4d5effe9ce341ca3551477/552f0bfb-ad40-4ad7-8a24-3cda8a246d00/ChatGPT+Image+Aug+2%2C+2026%2C+09_26_47+PM.png", 1200)} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="relative">
            <h2 className="font-display text-4xl text-white sm:text-5xl">Questions about Santísima Madre?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">Learn more through some of the questions I am asked most often.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4"><GlowButton href="/faq">Frequently Asked Questions</GlowButton><GlowButton href="/shop" variant="ghost">Shop Spells</GlowButton></div>
          </div>
        </div>
      </section>
    </>
  );
}
