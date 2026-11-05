"use client";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { allVideos, fmtDur, type RitualVideo } from "@/lib/ritual-videos";
import { GlowButton, Reveal, SectionHeading } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function VideoModal({ videos, title, onClose }: { videos: RitualVideo[]; title: string; onClose: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  const v = videos[i];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.4, ease }} onClick={(e) => e.stopPropagation()} className="relative flex max-h-[92svh] flex-col items-center gap-4">
        <button onClick={onClose} aria-label="Close" className="absolute -top-2 right-0 z-10 translate-y-[-100%] rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:-right-12 sm:top-0 sm:translate-y-0"><X size={20} /></button>
        <video key={v.file} src={v.file} poster={v.poster} controls autoPlay playsInline className="max-h-[78svh] w-auto max-w-full rounded-3xl border border-gold/30 bg-black shadow-[0_0_80px_-10px_rgba(124,58,237,.7)]" style={{ aspectRatio: v.ratio || 0.5625 }} />
        <div className="text-center">
          <p className="font-display text-xl text-white">{title}</p>
          {videos.length > 1 && (
            <div className="mt-2 flex justify-center gap-2">
              {videos.map((x, k) => (
                <button key={x.n} onClick={() => setI(k)} className={`rounded-full border px-3 py-1 text-xs transition ${k === i ? "border-gold bg-gold/15 text-gold" : "border-white/20 text-white/70 hover:border-white/50"}`}>Video {k + 1}</button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** 16:9 thumbnail that opens the player. */
export function VideoThumb({ videos, title }: { videos: RitualVideo[]; title: string }) {
  const [open, setOpen] = useState(false);
  const first = videos[0];
  return (
    <>
      <button onClick={() => first && setOpen(true)} disabled={!first} aria-label={`Play ${title}`} className="group relative mb-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-900/50 via-black to-fuchsia-950/40">
        {first && <Image src={first.poster} alt={title} fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {first ? (
          <motion.span whileHover={{ scale: 1.12 }} className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-black/60 text-gold backdrop-blur-sm transition group-hover:bg-gold group-hover:text-black"><Play size={20} fill="currentColor" /></motion.span>
        ) : (
          <span className="relative text-[10px] uppercase tracking-[0.3em] text-white/50">Video on TikTok LIVE</span>
        )}
        {first && <span className="glass absolute bottom-3 right-3 rounded-full px-3 py-1 text-[11px] text-white">{fmtDur(first.duration)}{videos.length > 1 ? ` · ${videos.length} videos` : ""}</span>}
      </button>
      <AnimatePresence>{open && <VideoModal videos={videos} title={title} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function HoverVideo({ v, label }: { v: RitualVideo; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onMouseEnter={() => ref.current?.play().catch(() => {})}
        onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
        onClick={() => setOpen(true)}
        className="group relative block aspect-[9/16] w-[62vw] shrink-0 snap-center overflow-hidden rounded-[2rem] border border-white/10 bg-black sm:w-60"
      >
        <video ref={ref} src={v.file} poster={v.poster} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-black/50 text-gold backdrop-blur-sm transition group-hover:scale-0"><Play size={20} fill="currentColor" /></span>
        <span className="absolute bottom-4 left-4 right-4 text-left font-display text-lg leading-tight text-white">{label}</span>
      </button>
      <AnimatePresence>{open && <VideoModal videos={[v]} title={label} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

/** Home page strip of real ritual clips. */
export function FeaturedVideos() {
  const picks: [number, string][] = [[0, "The Black Covenant"], [4, "Watermelon of Unity"], [6, "Come Back To My Arms"], [8, "To Infinity & Beyond"], [12, "Watermelon in Reverse"], [18, "Inferno of Desire"]];
  const items = picks.filter(([i]) => allVideos[i]);
  if (!items.length) return null;
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Ritual Videos" title="Step inside the practice" sub="Short glimpses from live sessions — hover to preview, tap to watch." />
      </div>
      <Reveal>
        <div className="flex snap-x gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:justify-start lg:justify-center">
          {items.map(([i, label]) => <HoverVideo key={i} v={allVideos[i]} label={label} />)}
        </div>
      </Reveal>
      <div className="mt-8 flex justify-center"><GlowButton href="/rituals" variant="ghost">All ritual videos</GlowButton></div>
    </section>
  );
}

export { Link };
