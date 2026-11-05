"use client";
import Image from "next/image";
import accordions from "@/lib/content/home-accordions.json";
import { SITE } from "@/lib/data";
import { GlowButton, ParallaxImage, Reveal, SectionHeading, SpotlightCard } from "./ui";

type P = { t: string; text: string };
const get = (q: string) => (accordions as { q: string; paras: P[] }[]).find((a) => a.q === q)!;

const chapters: { q: string; img?: string; pos?: string }[] = [
  { q: "My Spiritual Journey", img: "/img/work.png", pos: "50% 40%" },
  { q: "My Family & Heritage", img: "/img/backdrop.png", pos: "50% 50%" },
  { q: "A Career Built on Caring for Others", img: "/img/altar.png", pos: "50% 40%" },
  { q: "My Practice", img: "/img/consult.jpg", pos: "50% 50%" },
];

function Body({ paras }: { paras: P[] }) {
  return (
    <div className="space-y-4 leading-relaxed text-muted">
      {paras.map((p, i) =>
        p.t === "li" ? (
          <p key={i} className="flex gap-3 text-white/90"><span className="text-gold">✦</span>{p.text}</p>
        ) : (
          <p key={i} className={i === 0 ? "text-lg text-white/90" : ""}>{p.text}</p>
        ),
      )}
    </div>
  );
}

export function AboutView() {
  const intro = get("About Me");
  const values = get("My Values");
  const boundaries = get("My Boundaries");
  const thanks = get("Thank You");
  const creations = get("Divine Creations");
  const safety = get("For your safety");
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <ParallaxImage src="/img/hero.png" alt="DJ with tarot cards, sage, candles and crystals" sizes="(min-width:1024px) 45vw, 90vw" className="aspect-[4/5] rounded-[2rem] border border-gold/30" position="50% 30%" amount={36} />
        <div>
          <SectionHeading align="left" eyebrow="About Me" title="Hello, I am DJ" />
          <Reveal delay={0.2}><Body paras={intro.paras.slice(0, 3)} /></Reveal>
        </div>
      </section>

      {chapters.map((c, i) => {
        const a = get(c.q);
        return (
          <section key={c.q} className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-20">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <Reveal><p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold/80">Chapter 0{i + 1}</p></Reveal>
              <Reveal delay={0.1}><h2 className="font-display mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">{c.q}</h2></Reveal>
              <Reveal delay={0.2}><Body paras={a.paras} /></Reveal>
            </div>
            <ParallaxImage src={c.img!} alt={c.q} sizes="(min-width:1024px) 40vw, 90vw" className={`aspect-[4/3] rounded-[2rem] border border-white/10 ${i % 2 ? "lg:order-1" : ""}`} position={c.pos} amount={30} />
          </section>
        );
      })}

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="What guides me" title="My values & boundaries" />
        <div className="grid gap-5 md:grid-cols-2">
          {[values, boundaries].map((a, i) => (
            <Reveal key={a.q} delay={i * 0.1}>
              <SpotlightCard className="h-full">
                <div className="p-8 sm:p-10">
                  <h3 className="font-display mb-5 text-3xl text-white">{a.q}</h3>
                  <Body paras={a.paras} />
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold/80">Outside of my spiritual work</p>
            <h2 className="font-display mb-6 text-4xl text-white sm:text-5xl">Divine Creations</h2>
            <Body paras={creations.paras.slice(0, 2).concat(creations.paras.slice(2, 3))} />
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-white/85">
              {creations.paras.filter((p) => p.t === "li" || (p.text.length < 40 && !/[:.]$/.test(p.text))).slice(0, 12).map((p) => <li key={p.text} className="flex gap-2"><span className="text-gold">✦</span>{p.text}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4"><GlowButton href="/creations">Shop Divine Creations</GlowButton><GlowButton href={SITE.creationsIg} variant="ghost" external>@Divine_creations_by_dj</GlowButton></div>
          </div>
          <ParallaxImage src="/img/creations.png" alt="Handcrafted Divine Creations" sizes="(min-width:1024px) 35vw, 90vw" className="aspect-square rounded-[2rem] border border-gold/30" amount={26} />
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <Image src="/img/madre.png" alt="" fill sizes="60vw" className="-z-10 rounded-[3rem] object-cover opacity-20" />
        <Reveal><h2 className="font-display text-4xl text-white sm:text-5xl">{thanks.q}</h2></Reveal>
        <Reveal delay={0.15}><div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-white/80">{thanks.paras.map((p, i) => <p key={i} className={i >= thanks.paras.length - 2 ? "font-display text-2xl italic text-gold" : ""}>{p.text}</p>)}</div></Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4"><GlowButton href="/shop">Shop Spells</GlowButton><GlowButton href="/madre" variant="ghost">Read About Madre</GlowButton></Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-3xl border border-gold/30 bg-gold/[0.04] p-8 sm:p-10">
          <h3 className="font-display text-3xl text-gold">{safety.q.replace(/^f/, "F")}</h3>
          <div className="mt-5"><Body paras={safety.paras} /></div>
        </div>
      </section>
    </>
  );
}

export function ReadingsInfo() {
  const reading = get("30-Minute Private Reading");
  const how = get("How to Book");
  const safety = get("For your safety");
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-[2rem] border border-gold/30">
            <Image src="/img/consult.jpg" alt="Tarot cards fanned out on green velvet" fill sizes="(min-width:1024px) 55vw, 95vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
            <div className="relative flex h-full min-h-[26rem] flex-col justify-end p-8 sm:p-10">
              <p className="mb-2 text-xs uppercase tracking-[0.35em] text-gold">One-to-one</p>
              <h2 className="font-display text-4xl text-white sm:text-5xl">30-Minute Private Reading</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{reading.paras[1].text}</p>
              <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
                <div className="glass rounded-2xl p-4"><p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Regular</p><p className="font-display text-3xl text-gold">$100</p></div>
                <div className="glass rounded-2xl p-4"><p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Emergency</p><p className="font-display text-3xl text-gold">$200</p><p className="mt-1 text-[11px] text-white/60">Priority scheduling</p></div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex h-full flex-col gap-5">
            <SpotlightCard className="flex-1">
              <div className="p-7">
                <h3 className="font-display text-2xl text-gold">How to book a reading</h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                  <p className="text-white/90">{how.paras[0].text}</p>
                  <p>{how.paras[1].text}</p>
                  <p>{how.paras[3].text}</p>
                </div>
                <div className="mt-5"><GlowButton href="https://www.instagram.com/divine_brujita_d_j" external>DM @divine_brujita_d_j</GlowButton></div>
              </div>
            </SpotlightCard>
            <div className="rounded-3xl border border-gold/30 bg-gold/[0.04] p-7">
              <h3 className="font-display text-2xl text-gold">For your safety</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-white/85">
                {safety.paras.slice(1, 5).map((p) => <li key={p.text} className="flex gap-2"><span className="text-gold">✦</span>{p.text}</li>)}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-muted">{safety.paras[5].text}</p>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-muted">Looking for a spell instead? Spell services are booked through the shop — then join the TikTok LIVE. The form below is a design preview of a scheduling flow.</p>
    </section>
  );
}
