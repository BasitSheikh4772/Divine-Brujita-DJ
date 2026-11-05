"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { SITE } from "@/lib/data";
import { GlowButton, Sparkles } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = [
  [{ w: "Devotion," }, { w: "Ritual" }],
  [{ w: "& Live" }, { w: "Spiritual", g: true }],
  [{ w: "Work", g: true }],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* Image */}
      <motion.div style={{ y: imgY }} className="absolute inset-x-0 top-0 h-[72svh] lg:inset-y-0 lg:left-[16%] lg:right-[-6%] lg:h-auto">
        <motion.div initial={{ scale: 1.25, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.2, ease }} className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0">
            <Image src="/img/hero.png" alt="Divine Brujita DJ with tarot cards, sage, candles and crystals under a violet moon" fill priority sizes="(min-width:1024px) 90vw, 100vw" className="object-cover object-[50%_20%]" />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Overlays */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
      <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/85 via-35% to-transparent to-65% lg:block" />
      <Sparkles />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-[52svh] lg:justify-center lg:pb-0 lg:pt-28">
        <motion.div style={{ y: textY, opacity: fade }} className="max-w-xl">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 1 }} className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Performed live · for Santísima Madre
          </motion.p>

          <h1 className="font-display text-[3.4rem] font-semibold leading-[0.98] text-white sm:text-7xl lg:text-[5.5rem]" aria-label="Devotion, Ritual & Live Spiritual Work">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.map((x, wi) => (
                  <span key={wi} className="mr-3 inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span
                      initial={{ y: "115%", rotate: 5 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{ delay: 0.6 + (li * 2 + wi) * 0.12, duration: 1.1, ease }}
                      className={`inline-block ${"g" in x ? "text-gold-shimmer italic" : ""}`}
                    >
                      {x.w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }} className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
            Cleanses, spell work and card readings performed with candles, prayer and intention — live on TikTok. Begin your spiritual journey today.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.75, duration: 1 }} className="mt-9 flex flex-wrap gap-4">
            <GlowButton href="/services">Explore Spell Services</GlowButton>
            <GlowButton href={SITE.tiktok} variant="ghost" external>Join the LIVE</GlowButton>
          </motion.div>
        </motion.div>

        {/* Floating glass badges */}
        <motion.div style={{ y: badgeY }} className="pointer-events-none absolute bottom-24 right-6 hidden flex-col gap-3 lg:flex">
          {[
            { k: "Hundreds", v: "of real testimonials on TikTok" },
            { k: "30-min", v: "private readings available" },
          ].map((b, i) => (
            <motion.div key={b.k} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.1 + i * 0.2, duration: 0.9, ease }} className="glass animate-float rounded-2xl px-5 py-3" style={{ animationDelay: `${i * 1.5}s` }}>
              <p className="font-display text-2xl text-gold">{b.k}</p>
              <p className="text-xs text-white/70">{b.v}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/50 lg:flex">
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-white/20">
            <motion.span animate={{ y: ["-100%", "100%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-gold" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
