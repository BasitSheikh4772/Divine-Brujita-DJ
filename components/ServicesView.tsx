"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { spellByNumber, spellByTitle, spellHref, sq } from "@/lib/catalog";
import { useEffect, useRef, useState } from "react";
import { SITE, weekly } from "@/lib/data";
import { guideIntro, guides } from "@/lib/service-guides";
import { addons, categories, services, type Cat } from "@/lib/services";
import { GlowButton, Reveal, SectionHeading, Sparkles, SpotlightCard, SplitText, Tilt } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;
const named: Record<string, string> = { "ward-name": "Warding Your Name", unlimpia: "Unlimpia", covenant: "Black Covenant", eye: "Crystal Eye", pig: "Pig-Faced", gifts: "Gifts for" };
const thumbOf = (s: { id: string; n?: string }) => (s.n ? spellByNumber(s.n) : spellByTitle(named[s.id] ?? "@@"))?.images[0];

function ServicesHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section ref={ref} className="relative flex min-h-[78svh] items-end overflow-hidden pb-20 pt-44">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2, ease }} className="absolute inset-0">
          <Image src="/img/work.png" alt="" fill priority sizes="100vw" className="object-cover object-[50%_30%]" />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/90 to-transparent" />
      <Sparkles />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.9 }} className="mb-5 text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
          Performed live on TikTok
        </motion.p>
        <SplitText immediate as="h1" text="Spell services aligned with your intention" className="font-display max-w-3xl text-5xl font-semibold leading-[1.02] text-white sm:text-7xl" delay={0.4} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9 }} className="mt-6 max-w-xl text-lg text-white/75">
          Candles, crystals, prayer, herbs and oils — selected for your specific service and performed during a live spiritual session.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.9 }} className="mt-9 flex flex-wrap gap-4">
          <GlowButton href="#menu">Browse the Menu</GlowButton>
          <GlowButton href="/book" variant="ghost">Book a Session</GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

function GuideItem({ g, defaultOpen }: { g: { title: string; tag: string; paras: string[] }; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Reveal>
      <div className={`overflow-hidden rounded-2xl border transition-colors ${open ? "border-gold/40 bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
        <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
          <span><span className="block text-[10px] uppercase tracking-[0.3em] text-gold/80">{g.tag}</span><span className="font-display text-2xl text-white">{g.title}</span></span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} className="shrink-0 text-2xl text-gold">+</motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
              <div className="space-y-3 px-6 pb-6 text-sm leading-relaxed text-muted">{g.paras.map((p, k) => <p key={k} className={/^(This bundle|Disclaimer|Please Note)/.test(p) ? "text-white/80" : ""}>{p}</p>)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function ServicesView() {
  const [cat, setCat] = useState<Cat>("all");
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat") as Cat | null;
    if (c && categories.some((x) => x.id === c)) {
      setCat(c);
      setTimeout(() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);
  const list = cat === "all" ? services : services.filter((s) => s.cat === cat);
  const current = categories.find((c) => c.id === cat)!;

  return (
    <>
      <ServicesHero />

      {/* Weekly offers */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="This Week" title="Weekly spell specials" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {weekly.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <Tilt className="h-full">
                <Link href={`/shop/${w.slug}`} className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0d0719]">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={w.img} alt={w.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0719] to-transparent" />
                  </div>
                  <div className="relative -mt-12 p-5">
                    <h3 className="font-display text-xl font-semibold leading-tight text-white">{w.title}</h3>
                    <p className="mt-1 text-xs text-white/60">{w.sub}</p>
                    <p className="font-display mt-3 text-3xl text-gold">${w.price}</p>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20">
        <SectionHeading eyebrow="The Menu" title="Find your spell" sub="Choose a category, then book on the live shop. Prices are per working." />

        <div className="sticky top-20 z-30 -mx-2 mb-10 overflow-x-auto rounded-full border border-white/10 bg-[#0a0516]/85 px-2 py-2 backdrop-blur-2xl [scrollbar-width:none]">
          <div className="flex w-max gap-1">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`relative rounded-full px-5 py-2 text-sm transition-colors ${cat === c.id ? "text-black" : "text-muted hover:text-white"}`}>
                {cat === c.id && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-soft to-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative z-10 whitespace-nowrap">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p key={cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 text-center text-sm text-muted">
            {current.blurb} · <span className="text-gold">{list.length} services</span>
          </motion.p>
        </AnimatePresence>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((s, i) => (
              <motion.div key={s.id} layout initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: Math.min(i * 0.025, 0.3), ease }}>
                <Link href={s.n ? spellHref(s.n) : "/shop"} className="block h-full">
                  <SpotlightCard className="h-full">
                    <div className="flex h-full items-center gap-4 p-5">
                      <div className="font-display relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-black/50 text-lg text-gold">
                        {thumbOf(s) && <Image src={sq(thumbOf(s), 200)} alt="" fill sizes="64px" className="object-cover transition duration-700 group-hover:scale-110" />}
                        <span className="relative z-10 rounded-full bg-black/70 px-1.5 text-[10px] text-gold">{s.n ? `#${s.n}` : "✦"}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        {s.hot && <span className="mb-1 inline-block rounded-full bg-gold/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] text-gold">Popular</span>}
                        <h3 className="font-display text-xl font-semibold leading-snug text-white">{s.name}</h3>
                        <p className="text-xs capitalize text-muted">{s.cat}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl text-gold">${s.price}</p>
                        <ArrowUpRight size={16} className="ml-auto mt-1 text-white/40 transition group-hover:text-gold" />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Service guides */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="Not sure where to start?" title="Service guides" sub={guideIntro} />
        <div className="space-y-3">
          {guides.map((g, i) => (
            <GuideItem key={g.title} g={g} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Optional Enhancements" title="Fuel your work with add-ons" />
        <div className="grid gap-5 md:grid-cols-3">
          {addons.map((a, i) => (
            <Reveal key={a.group} delay={i * 0.1}>
              <SpotlightCard className="h-full">
                <div className="p-7">
                  <h3 className="font-display text-2xl text-gold">{a.group}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {a.items.map((it) => (
                      <li key={it} className="flex gap-2"><span className="text-gold">✦</span>{it}</li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works + Important info */}
      <section id="how" className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-3xl p-8 sm:p-10">
            <h2 className="font-display text-3xl text-white">How your session is performed</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Your work is performed during a live spiritual session using candles, crystals, prayer, herbs, oils, devotional practices and other ritual tools selected for your specific service.
            </p>
            <h3 className="font-display mt-8 text-2xl text-gold">What happens after booking?</h3>
            <p className="mt-3 leading-relaxed text-muted">
              Join my TikTok LIVE and comment <span className="text-white">“Here For My Spell”</span> so you can be added to the session queue. Work is performed live in the order received, first come first served, unless otherwise announced.
            </p>
            <div className="mt-8"><GlowButton href={SITE.tiktok} external>Join the LIVE <ArrowUpRight size={16} /></GlowButton></div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="h-full rounded-3xl border border-gold/30 bg-gradient-to-br from-violet-950/60 to-black p-8 sm:p-10">
            <h2 className="font-display text-3xl text-white">Important information</h2>
            <ul className="mt-5 space-y-3 text-white/80">
              {["Entertainment purposes only.", "Results cannot be guaranteed.", "Every spiritual journey is unique.", "Clients must be 18 years or older to purchase services."].map((t) => (
                <li key={t} className="flex gap-3"><span className="text-gold">✦</span>{t}</li>
              ))}
            </ul>
            <h3 className="font-display mt-8 text-2xl text-gold">What this work may help with</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {["Encouraging positive spiritual movement", "Removing energetic blockages", "Supporting emotional clarity", "Opening new opportunities aligned with your intention"].map((t) => (
                <li key={t}>— {t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
