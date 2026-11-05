"use client";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { useCart } from "./Cart";
import { useEffect, useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className = "", y = 32 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked reveal. */
export function SplitText({ text, className = "", delay = 0, as: Tag = "h2", immediate = false }: { text: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p"; immediate?: boolean }) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-80px" } };
  return (
    <MotionTag className={className} initial="hidden" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block pr-[0.25em]"
            variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function SectionHeading({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <div className={`mb-14 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-gold/80" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
          <span className="h-px w-8 bg-gold/60" /> {eyebrow} <span className={`h-px w-8 bg-gold/60 ${align === "left" ? "hidden" : ""}`} />
        </p>
      </Reveal>
      <SplitText text={title} className="font-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl" />
      {sub && (
        <Reveal delay={0.25}>
          <p className="mt-5 text-base text-muted sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-gold" />;
}

/** Soft violet glow that follows the cursor across the whole page (desktop only). */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });
  useEffect(() => {
    const m = (e: PointerEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, [x, y]);
  return <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[90px] lg:block" />;
}

/** Card with cursor-following spotlight. */
export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const bg = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, rgba(168,85,247,.25), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(232,199,122,.7), transparent 65%)`;
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className={`group relative rounded-3xl p-px ${className}`}
    >
      <div className="absolute inset-0 rounded-3xl bg-white/10" />
      <motion.div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: border }} />
      <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0d0719]">
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: bg }} />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}

/** 3D tilt on hover. */
export function Tilt({ children, className = "", max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Image with scroll parallax inside a clipped frame, plus a clip-path reveal on entry. */
export function ParallaxImage({ src, alt, className = "", sizes = "100vw", amount = 60, priority = false, position = "center" }: { src: string; alt: string; className?: string; sizes?: string; amount?: number; priority?: boolean; position?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(12% 8% 12% 8% round 2rem)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </motion.div>
  );
}

export function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v) + suffix) });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref} className={className}>0{suffix}</span>;
}

export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/4 top-[-20%] h-[70vh] w-[70vw] animate-aurora rounded-full bg-violet-700/40 blur-[140px]" />
      <div className="absolute -right-1/4 top-[10%] h-[60vh] w-[60vw] animate-aurora rounded-full bg-fuchsia-700/30 blur-[140px] [animation-delay:-6s]" />
      <div className="absolute bottom-[-30%] left-1/4 h-[60vh] w-[60vw] animate-aurora rounded-full bg-indigo-800/40 blur-[160px] [animation-delay:-12s]" />
    </div>
  );
}

const dots = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 53) % 100,
  top: (i * 37 + 11) % 100,
  size: 1 + (i % 3),
  dur: 3 + (i % 5),
  delay: (i % 7) * 0.6,
}));

export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold-soft"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.5, 0.6], y: [0, -14, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Marquee({ children, reverse = false, className = "" }: { children: React.ReactNode; reverse?: boolean; className?: string }) {
  return (
    <div className={`group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}>
      <div className={`flex w-max shrink-0 gap-5 pr-5 group-hover:[animation-play-state:paused] ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {children}
        {children}
      </div>
    </div>
  );
}

/** Button that is pulled toward the cursor. */
export function GlowButton({ href, children, variant = "solid", external = false, className = "" }: { href: string; children: React.ReactNode; variant?: "solid" | "ghost"; external?: boolean; className?: string }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const ref = useRef<HTMLDivElement>(null);
  const base = "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide";
  const cls =
    variant === "solid"
      ? `${base} bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] text-white shadow-[0_0_40px_-8px_rgba(168,85,247,.9)] transition-[background-position] duration-700 hover:bg-right`
      : `${base} glass text-white transition-colors hover:border-gold/60`;
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
      ) : (
        <Link href={href} className={cls}>{inner}</Link>
      )}
    </motion.div>
  );
}

export function CartToast() {
  const { toast } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-gold/40 bg-[#0a0516]/95 px-6 py-3 text-sm text-white shadow-[0_10px_50px_-10px_rgba(124,58,237,.8)] backdrop-blur-xl">
          <span className="mr-2 text-gold">✦</span>
          {toast}{" "}
          <Link href="/cart" className="ml-2 text-gold underline-offset-4 hover:underline">View cart</Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Shared hero for inner pages. */
export function PageHero({ eyebrow, title, sub, img, children, small = false }: { eyebrow: string; title: string; sub?: string; img?: string; children?: React.ReactNode; small?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  return (
    <section ref={ref} className={`relative flex items-end overflow-hidden ${small ? "min-h-[46svh] pb-12" : "min-h-[62svh] pb-16"} pt-40`}>
      <div aria-hidden className="absolute inset-0 bg-ink" />
      {img && (
        <motion.div style={{ y }} className="absolute inset-0">
          <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease }} className="absolute inset-0">
            <Image src={img} alt="" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      )}
      {!img && <Aurora />}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/85 to-transparent" />
      <Sparkles />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.9 }} className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-8 bg-gold/60" /> {eyebrow}
        </motion.p>
        <SplitText immediate as="h1" text={title} className="font-display max-w-3xl text-5xl font-semibold leading-[1.02] text-white sm:text-7xl" delay={0.35} />
        {sub && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }} className="mt-5 max-w-xl text-lg text-white/75">
            {sub}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9 }} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`relative shrink-0 rounded-full px-5 py-2 text-sm transition-colors ${active ? "text-black" : "text-muted hover:text-white"}`}>
      {active && <motion.span layoutId="pill-active" className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-soft to-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </button>
  );
}

export function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.6 6.8a5.5 5.5 0 0 1-3.4-1.2 5.5 5.5 0 0 1-1.9-3.1h-3.4v12.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.1a6.1 6.1 0 1 0 5.3 6V9.3a8.9 8.9 0 0 0 5.3 1.7V7.6c-.0 0-.0-.8 0-.8Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
