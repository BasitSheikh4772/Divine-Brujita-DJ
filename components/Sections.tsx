"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { creations, faqs, intentions, keywords, reviews, signature, SITE, steps, weekly, why } from "@/lib/data";
import { CountUp, GlowButton, InstagramIcon, TikTokIcon, Marquee, ParallaxImage, Reveal, SectionHeading, SpotlightCard, SplitText, Sparkles, Tilt } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function KeywordStrip() {
  return (
    <div className="border-y border-white/5 bg-black/40 py-6">
      <Marquee>
        {keywords.map((k) => (
          <span key={k} className="font-display flex items-center gap-8 whitespace-nowrap text-5xl italic text-transparent [-webkit-text-stroke:1px_rgba(232,199,122,.55)] sm:text-7xl">
            {k} <span className="text-2xl not-italic text-gold [-webkit-text-stroke:0]">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function Stats() {
  const items = [
    { n: 50, s: "+", l: "Spell services" },
    { n: 100, s: "s", l: "Real testimonials" },
    { n: 30, s: " min", l: "Private readings" },
    { n: 18, s: "+", l: "Adults only" },
  ];
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-16 md:grid-cols-4">
      {items.map((it, i) => (
        <Reveal key={it.l} delay={i * 0.1} className="py-6 text-center">
          <p className="font-display text-5xl font-semibold text-gold-shimmer sm:text-6xl"><CountUp to={it.n} suffix={it.s} /></p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">{it.l}</p>
        </Reveal>
      ))}
    </section>
  );
}

export function Madre() {
  return (
    <section id="madre" className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-28 lg:grid-cols-2 lg:gap-20">
      <div className="relative mx-auto w-full max-w-md">
        <div aria-hidden className="absolute -inset-8 rounded-full bg-amber-400/15 blur-[80px]" />
        <ParallaxImage src="/img/madre.png" alt="Santísima Madre in a candlelit shrine under a full moon" sizes="(min-width:1024px) 40vw, 90vw" className="aspect-[3/4] rounded-[2rem] border border-gold/30" amount={40} position="60% 30%" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }} className="glass absolute -bottom-6 -right-2 rounded-2xl px-5 py-3 sm:-right-8">
          <p className="font-display text-xl text-gold">Santísima Madre</p>
          <p className="text-xs text-white/60">Holy Mother · Devotion first</p>
        </motion.div>
      </div>
      <div>
        <SectionHeading align="left" eyebrow="Our Holy Mother" title="Discover the devotion and sacred symbolism" />
        <Reveal delay={0.2}>
          <p className="max-w-lg leading-relaxed text-muted">
            Every ritual is performed with faith, intention and devotion to Santísima Madre. Learn about my spiritual journey, my family and heritage, and the values and boundaries that guide the work I do.
          </p>
        </Reveal>
        <Reveal delay={0.35} className="mt-8 grid max-w-lg grid-cols-2 gap-3">
          {["My Spiritual Journey", "Family & Heritage", "My Practice", "My Values"].map((t) => (
            <div key={t} className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-white/90"><span className="text-gold">✦</span>{t}</div>
          ))}
        </Reveal>
        <Reveal delay={0.5} className="mt-10"><GlowButton href="/madre" variant="ghost">Read About Madre <ArrowUpRight size={16} /></GlowButton></Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="The Process" title="How your session works" sub="Simple, transparent, and performed live." />
      <div className="relative grid gap-6 md:grid-cols-3">
        <motion.div aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: "easeInOut" }} className="absolute left-[17%] right-[17%] top-[3.1rem] hidden h-px origin-left bg-gradient-to-r from-transparent via-gold/70 to-transparent md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.15}>
            <SpotlightCard className="h-full">
              <div className="p-8 text-center">
                <motion.div whileInView={{ boxShadow: ["0 0 0 0 rgba(232,199,122,0)", "0 0 40px 4px rgba(232,199,122,.35)", "0 0 0 0 rgba(232,199,122,0)"] }} transition={{ duration: 2.4, delay: 0.6 + i * 0.5 }} viewport={{ once: true }} className="font-display mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-black text-2xl text-gold">{s.n}</motion.div>
                <h3 className="font-display text-2xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Weekly() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="This Week" title="Weekly spell specials" sub="Limited weekly offers — performed live in the order received." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {weekly.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.1}>
            <Tilt className="h-full">
              <Link href={`/shop/${w.slug}`} className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0d0719]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={w.img} alt={w.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0719] via-[#0d0719]/30 to-transparent" />
                  <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">{w.tag}</span>
                </div>
                <div className="relative -mt-16 p-5">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">{w.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">{w.sub}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-3xl text-gold">${w.price}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition group-hover:border-gold group-hover:bg-gold group-hover:text-black"><ArrowUpRight size={18} /></span>
                  </div>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Pinned section whose vertical scroll drives a horizontal carousel. */
export function Signature() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sec} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SectionHeading align="left" eyebrow="Signature Workings" title="Rituals people return for" />
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-6 sm:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] sm:pr-24">
          {signature.map((s) => (
            <Link key={s.title} href={`/shop/${s.slug}`} className="group relative block h-[46vh] min-h-[300px] w-[72vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 sm:w-[26rem]">
              <Image src={s.img} alt={s.title} fill sizes="26rem" className="object-cover transition duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">{s.tag}</span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <h3 className="font-display text-2xl font-semibold leading-tight text-white">{s.title}</h3>
                <span className="font-display text-3xl text-gold">${s.price}</span>
              </div>
            </Link>
          ))}
          <Link href="/services" className="group flex h-[46vh] min-h-[300px] w-[60vw] shrink-0 flex-col items-center justify-center gap-4 rounded-[2rem] border border-gold/40 bg-gradient-to-br from-violet-900/50 to-black text-center sm:w-80">
            <span className="font-display text-3xl text-white">See all services</span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black transition group-hover:scale-110"><ArrowUpRight /></span>
          </Link>
        </motion.div>
        <div className="mx-auto mt-10 h-px w-full max-w-6xl overflow-hidden bg-white/10 px-6">
          <motion.div style={{ width: bar }} className="h-full bg-gold" />
        </div>
      </div>
    </section>
  );
}

export function Intentions() {
  return (
    <section id="spells" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Spell Services" title="Choose work aligned with your intention" sub="Every journey is unique. Find the category that speaks to yours." />
      <div className="grid gap-5 md:grid-cols-3">
        {intentions.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08} className={s.span}>
            <Link href={`/shop?cat=${s.cat}`} className="block h-full">
              <SpotlightCard className="h-full">
                <div className="flex min-h-52 flex-col justify-between p-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-gold/80">{s.tag}</span>
                    <h3 className="font-display mt-3 text-3xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-3 max-w-md text-sm text-muted">{s.body}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 transition group-hover:gap-3 group-hover:text-gold">Explore <ArrowUpRight size={16} /></span>
                </div>
              </SpotlightCard>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center" delay={0.2}><GlowButton href="/services">Explore All Spell Services</GlowButton></Reveal>
    </section>
  );
}

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="glass w-[340px] shrink-0 rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1">
      <div className="mb-3 text-gold">★★★★★</div>
      <blockquote className="text-sm leading-relaxed text-white/90">“{r.q}”</blockquote>
      <figcaption className="mt-4 text-xs text-muted">{r.u} · {r.d}</figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-28">
      <div aria-hidden className="absolute inset-0">
        <Image src="/img/work.png" alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </div>
      <Sparkles />
      <div className="relative">
        <SectionHeading eyebrow="Testimonials" title="Words from our community" sub="A small selection — hundreds more are pinned on TikTok @Divine_brujita_dj." />
        <div className="space-y-5">
          <Marquee>{reviews.slice(0, 15).map((r, i) => <ReviewCard key={i} r={r} />)}</Marquee>
          <Marquee reverse>{reviews.slice(15).map((r, i) => <ReviewCard key={i} r={r} />)}</Marquee>
        </div>
        <Reveal className="mt-12 flex justify-center"><GlowButton href="/testimonials" variant="ghost">Read all testimonials <ArrowUpRight size={16} /></GlowButton></Reveal>
      </div>
    </section>
  );
}

export function Rituals() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">
        <div className="absolute inset-0">
          <ParallaxImage src="/img/rituals.png" alt="Ritual altar with candles and offerings" className="h-full w-full" amount={80} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="relative max-w-xl p-10 sm:p-16">
          <SplitText text="Curious how the services are performed?" className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl" />
          <Reveal delay={0.3}><p className="mt-5 text-white/75">Every ritual is performed with faith, intention and devotion to Santísima Madre. Watch a glimpse of the practice and what to expect before your next session.</p></Reveal>
          <Reveal delay={0.45} className="mt-8"><GlowButton href="/rituals">Watch Ritual Videos <ArrowUpRight size={16} /></GlowButton></Reveal>
        </div>
      </div>
    </section>
  );
}

export function Creations() {
  return (
    <section id="creations" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Divine Creations" title="Handcrafted with love, purpose & magic" sub="Crystals, devotional pieces, jewelry and hair care — each made with intention." />
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {creations.map((c, i) => (
          <Reveal key={c.name} delay={(i % 4) * 0.08}>
            <Tilt max={7}>
              <Link href={`/creations/${c.slug}`} className="group block overflow-hidden rounded-3xl border border-white/10 bg-[#0d0719]">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={c.img} alt={c.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 transition group-hover:opacity-90" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{c.note}</p>
                  <h3 className="font-display mt-1 text-lg font-semibold leading-snug text-white sm:text-xl">{c.name}</h3>
                  <p className="mt-1 text-sm text-gold">${c.price}</p>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center"><GlowButton href="/creations" variant="ghost">Shop Divine Creations <ArrowUpRight size={16} /></GlowButton></Reveal>
    </section>
  );
}

export function Why() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Why Divine Brujita DJ" title="Devotion in every detail" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {why.map((w, i) => (
          <Reveal key={w.title} delay={(i % 3) * 0.08}>
            <SpotlightCard className="h-full">
              <div className="p-7">
                <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="mb-4 h-px bg-gold" />
                <h3 className="font-display text-2xl font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Faq({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-28 lg:grid-cols-[1fr_1.2fr]">
      {!compact && (
        <ParallaxImage src="/img/faq.png" alt="Mystical offering table" sizes="40vw" className="hidden aspect-[4/5] rounded-[2rem] border border-white/10 lg:block" amount={30} />
      )}
      <div className={compact ? "lg:col-span-2 mx-auto w-full max-w-3xl" : ""}>
        <SectionHeading align="left" eyebrow="FAQ" title="Before you book" />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <div className={`overflow-hidden rounded-2xl border transition-colors ${open === i ? "border-gold/40 bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-white">
                  <span className="font-display text-xl">{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-gold"><Plus size={20} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookCta() {
  return (
    <section id="book" className="px-6 py-24">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-gold/30 p-12 text-center sm:p-20">
          <Image src="/img/backdrop.png" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/90" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,.4),transparent_65%)]" />
          <Sparkles />
          <div className="relative">
            <SplitText text="Ready to begin your journey?" className="font-display text-4xl font-semibold text-white sm:text-6xl" />
            <Reveal delay={0.3}><p className="mx-auto mt-5 max-w-xl text-white/75">Book your work, then join the TikTok LIVE and comment “Here For My Spell”.</p></Reveal>
            <Reveal delay={0.45} className="mt-9 flex flex-wrap justify-center gap-4">
              <GlowButton href="/book">Book a Session</GlowButton>
              <GlowButton href={SITE.tiktok} variant="ghost" external>Join on TikTok</GlowButton>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const cols = [
    { h: "Shop", l: [["Shop Spells", "/shop"], ["Divine Creations", "/creations"], ["Spell Services", "/services"], ["Cart", "/cart"]] },
    { h: "Discover", l: [["About DJ", "/about"], ["Madre", "/madre"], ["Ritual Videos", "/rituals"], ["Testimonials", "/testimonials"], ["FAQ", "/faq"]] },
    { h: "Support", l: [["Book a Session", "/book"], ["Donations", "/donations"], ["Login", "/login"]] },
    { h: "Legal", l: [["Terms & Conditions", "/legal/terms"], ["Privacy Policy", "/legal/privacy"], ["Disclaimer", "/legal/disclaimer"], ["Refund Policy", "/legal/refund"]] },
  ];
  return (
    <footer className="relative border-t border-white/10 px-6 pb-10 pt-16 text-sm text-muted">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <p className="font-display text-4xl text-white">Divine Brujita <span className="text-gold">DJ</span></p>
          <p className="mt-4 max-w-sm leading-relaxed">Live ritual spell work, cleanses and readings performed with devotion to Santísima Madre.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[["TikTok", SITE.tiktok, <TikTokIcon key="t" size={15} />], ["Instagram", SITE.instagram, <InstagramIcon key="i" size={15} />], ["Divine Creations", SITE.creationsIg, <InstagramIcon key="c" size={15} />]].map(([n, h, ic]) => (
              <a key={n as string} href={h as string} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white transition hover:border-gold/60 hover:text-gold">{ic}{n}</a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.h}>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold/80">{c.h}</p>
              <ul className="space-y-2.5">
                {c.l.map(([n, h]) => (
                  <li key={n}><Link href={h} className="transition hover:text-white">{n}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 pt-6 text-xs leading-relaxed">
        <p>Entertainment purposes only. Results cannot be guaranteed. Every spiritual journey is unique. Clients must be 18 years or older to purchase services.</p>
        <p className="mt-2">© 2026 Divine Brujita DJ. All rights reserved.</p>
      </div>
    </footer>
  );
}
