"use client";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import faqData from "@/lib/content/faq.json";
import ritualData from "@/lib/content/rituals.json";
import testimonialData from "@/lib/content/testimonials.json";
import { videosFor } from "@/lib/ritual-videos";
import { SITE } from "@/lib/data";
import { services } from "@/lib/services";
import { useCart } from "./Cart";
import { VideoThumb } from "./Videos";
import { GlowButton, Pill, Reveal, SectionHeading, Sparkles, SpotlightCard } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;
const inputCls = "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-gold/50 focus:bg-white/[0.07]";
const labelCls = "mb-2 block text-xs uppercase tracking-[0.25em] text-white/60";

/* ---------------- FAQ ---------------- */
export function FaqView() {
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState("");
  const list = useMemo(() => faqData.map((f, i) => ({ ...f, i })).filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the FAQ…" className={`${inputCls} rounded-full pl-11`} />
      </div>
      <div className="space-y-3">
        {list.map((f) => (
          <motion.div layout key={f.i} className={`overflow-hidden rounded-2xl border transition-colors ${open === f.i ? "border-gold/40 bg-white/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
            <button onClick={() => setOpen(open === f.i ? null : f.i)} aria-expanded={open === f.i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-white">
              <span className="font-display text-xl capitalize-first">{f.q}</span>
              <motion.span animate={{ rotate: open === f.i ? 45 : 0 }} className="shrink-0 text-gold"><Plus size={20} /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === f.i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                  <div className="space-y-2 px-6 pb-6 text-sm leading-relaxed text-muted">{f.a.split("\n").map((l, k) => <p key={k}>{l}</p>)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {list.length === 0 && <p className="py-16 text-center text-muted">No matching questions.</p>}
      </div>
      <Reveal className="mt-14 text-center">
        <p className="text-muted">Still have a question?</p>
        <div className="mt-5 flex flex-wrap justify-center gap-4"><GlowButton href={SITE.tiktok} external>Ask on TikTok LIVE</GlowButton><GlowButton href="/book" variant="ghost">Book a Reading</GlowButton></div>
      </Reveal>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d: string) => `${months[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`;

export function TestimonialsView() {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(24);
  const list = useMemo(() => testimonialData.filter((t) => (t.q + t.u).toLowerCase().includes(q.toLowerCase())), [q]);
  useEffect(() => setShown(24), [q]);
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="glass mx-auto mb-12 max-w-3xl rounded-2xl p-5 text-center text-xs leading-relaxed text-muted">
          <span className="text-gold">Please note:</span> Testimonials represent the personal experiences and opinions of individual clients. Every spiritual journey is unique, and results will naturally vary. Divine Brujita DJ does not guarantee any specific outcome. All services are provided for spiritual and entertainment purposes.
        </p>
      </Reveal>
      <div className="relative mx-auto mb-4 max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search testimonials…" className={`${inputCls} rounded-full pl-11`} />
      </div>
      <p className="mb-8 text-center text-xs text-muted"><span className="text-gold">{list.length}</span> client testimonials</p>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {list.slice(0, shown).map((t, i) => (
          <motion.figure key={t.u + t.d + i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease }} className="glass mb-5 break-inside-avoid rounded-3xl p-6 transition-colors hover:border-gold/40">
            <div className="mb-3 text-gold">★★★★★</div>
            <blockquote className="text-sm leading-relaxed text-white/90">“{t.q}”</blockquote>
            <figcaption className="mt-4 text-xs text-muted">@{t.u} · {fmt(t.d)}</figcaption>
          </motion.figure>
        ))}
      </div>
      {shown < list.length && (
        <div className="mt-10 flex justify-center">
          <button onClick={() => setShown((s) => s + 24)} className="glass rounded-full px-8 py-3.5 text-sm text-white transition hover:border-gold/60 hover:text-gold">Load more ({list.length - shown} left)</button>
        </div>
      )}
      <Reveal className="mt-16 text-center">
        <p className="text-muted">Hundreds more are pinned on TikTok.</p>
        <div className="mt-5"><GlowButton href={SITE.tiktok} variant="ghost" external>TikTok @Divine_brujita_dj</GlowButton></div>
      </Reveal>
    </section>
  );
}

/* ---------------- Rituals ---------------- */
export function RitualsView() {
  const cats = ["All", ...Array.from(new Set(ritualData.map((r) => r.cat)))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = ritualData.filter((r) => cat === "All" || r.cat === cat);
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className="leading-relaxed text-white/80">The videos on this page offer a glimpse into my spiritual practice. During TikTok LIVE, I begin each service by setting intentions, praying, and manifesting.</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">All rituals are completed after midnight during my private spiritual working hours. To honor the sacredness of this work and protect every client’s privacy, many portions of the ritual are intentionally kept private.</p>
        <p className="mt-5 inline-block rounded-full border border-gold/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-gold">Disclaimer · these are not complete rituals</p>
      </Reveal>
      <div className="mb-10 flex justify-center gap-1 overflow-x-auto [scrollbar-width:none]">
        {cats.map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((r, i) => {
            const isOpen = open === r.title;
            const price = r.paras.find((p) => /^\$\d/.test(p));
            const norm = (x: string) => x.toLowerCase().replace(/[^a-z]/g, "");
            const paras = r.paras.filter((p) => !/^\$\d/.test(p) && !/^disclaimer/i.test(p) && norm(p) !== norm(r.title));
            return (
              <motion.div layout key={r.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease }}>
                <SpotlightCard className="h-full">
                  <div className="relative p-7 sm:p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{r.cat}</span>
                      {price && <span className="font-display text-xl text-gold">{price.split(/ via| for/)[0]}</span>}
                    </div>
                    <VideoThumb videos={videosFor(r.title)} title={r.title} />
                    <h3 className="font-display text-2xl font-semibold leading-snug text-white">{r.title}</h3>
                    <div className={`mt-3 space-y-3 text-sm leading-relaxed text-muted ${isOpen ? "" : "line-clamp-3"}`}>
                      {(isOpen ? paras : paras.slice(0, 1)).map((p, k) => <p key={k}>{p}</p>)}
                    </div>
                    {paras.length > 1 && (
                      <button onClick={() => setOpen(isOpen ? null : r.title)} className="mt-4 text-sm text-gold underline-offset-4 hover:underline">{isOpen ? "Show less" : "Read more"}</button>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      <Reveal className="mt-14 text-center"><GlowButton href={SITE.tiktok} external>Watch the full videos on TikTok</GlowButton></Reveal>
    </section>
  );
}

/* ---------------- Donations ---------------- */
export function DonationsView() {
  const presets = [5, 10, 25, 50, 100];
  const freqs = ["One-Time", "Weekly", "Monthly", "Quarterly", "Annual"];
  const [amt, setAmt] = useState<number | "custom">(5);
  const [custom, setCustom] = useState("");
  const [freq, setFreq] = useState("One-Time");
  const [fee, setFee] = useState(false);
  const [done, setDone] = useState(false);
  const base = amt === "custom" ? Number(custom) || 0 : amt;
  const total = base + (fee ? base * 0.06 : 0);
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <div className="glass rounded-[2rem] p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black"><Check /></div>
                <h2 className="font-display text-3xl text-white">Thank you</h2>
                <p className="mt-3 text-muted">This is a design preview — no payment was taken.</p>
                <button onClick={() => setDone(false)} className="mt-6 text-sm text-gold hover:underline">Back to form</button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className={labelCls}>Amount</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {presets.map((p) => (
                    <button key={p} onClick={() => setAmt(p)} className={`rounded-2xl border py-3 text-sm transition ${amt === p ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-white/80 hover:border-white/40"}`}>${p}</button>
                  ))}
                  <button onClick={() => setAmt("custom")} className={`rounded-2xl border py-3 text-sm transition ${amt === "custom" ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-white/80 hover:border-white/40"}`}>Custom</button>
                </div>
                <AnimatePresence>
                  {amt === "custom" && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="relative mt-3"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold">$</span><input value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^\d.]/g, ""))} placeholder="Enter an amount" className={`${inputCls} pl-8`} /></div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className={`${labelCls} mt-8`}>Frequency</p>
                <div className="flex flex-wrap gap-2">
                  {freqs.map((f) => (
                    <button key={f} onClick={() => setFreq(f)} className={`rounded-full border px-4 py-2 text-sm transition ${freq === f ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-white/80 hover:border-white/40"}`}>{f}</button>
                  ))}
                </div>
                <label className="mt-8 flex cursor-pointer items-center gap-3 text-sm text-white/80">
                  <input type="checkbox" checked={fee} onChange={(e) => setFee(e.target.checked)} className="h-4 w-4 accent-[#e8c77a]" /> Cover the 6% processing fee
                </label>
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-muted">{freq} total</span>
                  <span className="font-display text-4xl text-gold">${total.toFixed(2)}</span>
                </div>
                <button disabled={!base} onClick={() => setDone(true)} className="mt-6 w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 text-sm font-medium text-white shadow-[0_0_40px_-8px_rgba(168,85,247,.9)] transition hover:scale-[1.02] disabled:opacity-40">Donate</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
      <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted">Donations are voluntary and are not payments for services. Contributions are used to support Divine Brujita DJ and are non-refundable. No goods, services, or specific outcomes are promised in exchange for a donation.</p>
    </section>
  );
}

/* ---------------- Login ---------------- */
export function LoginView() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [sent, setSent] = useState(false);
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-40">
      <Image src="/img/madre.png" alt="" fill sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
      <Sparkles />
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, ease }} className="glass relative w-full max-w-md rounded-[2rem] p-8 sm:p-10">
        <p className="text-center text-gold">☾</p>
        <h1 className="font-display mt-2 text-center text-4xl text-white">{mode === "in" ? "Welcome back" : "Create account"}</h1>
        <div className="mx-auto mt-6 flex w-fit rounded-full border border-white/10 p-1">
          {(["in", "up"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setSent(false); }} className={`relative rounded-full px-5 py-1.5 text-sm ${mode === m ? "text-black" : "text-muted"}`}>
              {mode === m && <motion.span layoutId="login-pill" className="absolute inset-0 rounded-full bg-gold" />}
              <span className="relative z-10">{m === "in" ? "Sign in" : "Sign up"}</span>
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 space-y-4">
          <AnimatePresence initial={false}>
            {mode === "up" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <label className={labelCls}>Full name</label>
                <input className={inputCls} placeholder="Your name" />
              </motion.div>
            )}
          </AnimatePresence>
          <div><label className={labelCls}>Email</label><input type="email" className={inputCls} placeholder="you@example.com" /></div>
          <div><label className={labelCls}>Password</label><input type="password" className={inputCls} placeholder="••••••••" /></div>
          <button className="w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-8px_rgba(168,85,247,.9)] transition hover:scale-[1.02]">{mode === "in" ? "Sign in" : "Create account"}</button>
          <AnimatePresence>{sent && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs text-gold">Design preview — accounts are not connected yet.</motion.p>}</AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
}

/* ---------------- Cart ---------------- */
export function CartView() {
  const { items, total, setQty, remove, clear } = useCart();
  const [note, setNote] = useState(false);
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {items.length === 0 ? (
        <Reveal className="py-16 text-center">
          <p className="font-display text-4xl text-white">Your cart is empty</p>
          <p className="mt-3 text-muted">Add a spell or a creation to begin.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4"><GlowButton href="/shop">Shop Spells</GlowButton><GlowButton href="/creations" variant="ghost">Divine Creations</GlowButton></div>
        </Reveal>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((i) => (
                <motion.li layout key={i.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} className="glass flex items-center gap-4 rounded-3xl p-4">
                  <Link href={i.href} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl"><Image src={i.img} alt="" fill sizes="96px" className="object-cover" /></Link>
                  <div className="min-w-0 flex-1">
                    <Link href={i.href} className="font-display block text-xl leading-snug text-white hover:text-gold">{i.title}</Link>
                    <p className="mt-1 text-sm text-gold">${i.price}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-white/15">
                        <button aria-label="Less" onClick={() => setQty(i.id, i.qty - 1)} className="p-2 text-white/80"><Minus size={14} /></button>
                        <span className="w-6 text-center text-sm text-white">{i.qty}</span>
                        <button aria-label="More" onClick={() => setQty(i.id, i.qty + 1)} className="p-2 text-white/80"><Plus size={14} /></button>
                      </div>
                      <button aria-label="Remove" onClick={() => remove(i.id)} className="p-2 text-muted transition hover:text-red-400"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <p className="font-display hidden text-2xl text-white sm:block">${(i.price * i.qty).toFixed(2)}</p>
                </motion.li>
              ))}
            </AnimatePresence>
            <button onClick={clear} className="text-xs text-muted hover:text-white">Clear cart</button>
          </ul>
          <aside className="glass h-fit rounded-3xl p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl text-white">Order summary</h2>
            <div className="mt-5 flex justify-between text-sm text-muted"><span>Subtotal</span><span className="text-white">${total.toFixed(2)}</span></div>
            <div className="mt-2 flex justify-between text-sm text-muted"><span>Shipping</span><span>Calculated at checkout</span></div>
            <div className="mt-5 flex justify-between border-t border-white/10 pt-5"><span className="text-white">Total</span><span className="font-display text-3xl text-gold">${total.toFixed(2)}</span></div>
            <button onClick={() => setNote(true)} className="mt-6 w-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-8px_rgba(168,85,247,.9)] transition hover:scale-[1.02]">Checkout</button>
            <AnimatePresence>{note && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-xs text-gold">Design preview — checkout is not connected yet.</motion.p>}</AnimatePresence>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">All sales are final. Entertainment purposes only. 18+.</p>
          </aside>
        </div>
      )}
    </section>
  );
}

/* ---------------- Book ---------------- */
const slots = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "9:00 PM", "10:00 PM", "11:00 PM"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BookView() {
  const [svc, setSvc] = useState("");
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState("");
  const [days, setDays] = useState<{ n: number; label: string; num: number; mon: string }[]>([]);
  const [done, setDone] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const now = Date.now();
    setDays(Array.from({ length: 14 }, (_, n) => { const d = new Date(now + (n + 1) * 86400000); return { n, label: dayNames[d.getDay()], num: d.getDate(), mon: months[d.getMonth()] }; }));
  }, []);

  const opts = services.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  const ready = svc && day !== null && slot;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="glass mx-auto max-w-lg rounded-[2rem] p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black"><Check /></div>
            <h2 className="font-display text-4xl text-white">Request received</h2>
            <p className="mt-3 text-muted">Design preview — no booking was created. After booking, join the TikTok LIVE and comment “Here For My Spell”.</p>
            <div className="mt-8"><GlowButton href="/">Back home</GlowButton></div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={(e) => { e.preventDefault(); if (ready) setDone(true); }} className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(22rem,1fr)]">
            <div className="min-w-0 space-y-10">
              <div>
                <p className="font-display mb-1 text-2xl text-white"><span className="mr-2 text-gold">1.</span>Choose your service</p>
                <div className="relative mt-4"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services…" className={`${inputCls} rounded-full pl-11`} /></div>
                <div className="mt-4 grid max-h-72 gap-2 overflow-y-auto pr-2 sm:grid-cols-2 [scrollbar-color:rgba(232,199,122,.5)_transparent] [scrollbar-width:thin]">
                  {opts.map((s) => (
                    <button type="button" key={s.id} onClick={() => setSvc(s.id)} className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${svc === s.id ? "border-gold bg-gold/10 text-white" : "border-white/10 text-white/80 hover:border-white/30"}`}>
                      <span>{s.name}</span><span className="ml-3 text-gold">${s.price}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-display mb-4 text-2xl text-white"><span className="mr-2 text-gold">2.</span>Pick a day</p>
                <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                  {days.map((d) => (
                    <button type="button" key={d.n} onClick={() => setDay(d.n)} className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition ${day === d.n ? "border-gold bg-gold/15 text-gold" : "border-white/10 text-white/80 hover:border-white/30"}`}>
                      <span className="text-[10px] uppercase tracking-widest text-muted">{d.label}</span><span className="font-display text-2xl">{d.num}</span><span className="text-[10px] text-muted">{d.mon}</span>
                    </button>
                  ))}
                </div>
                <p className="font-display mb-4 mt-8 text-2xl text-white"><span className="mr-2 text-gold">3.</span>Preferred time</p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => <button type="button" key={s} onClick={() => setSlot(s)} className={`rounded-full border px-4 py-2 text-sm transition ${slot === s ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-white/80 hover:border-white/40"}`}>{s}</button>)}
                </div>
                <p className="mt-4 text-xs text-muted">Appointment times are for scheduling only. Work is performed live in the order received.</p>
              </div>
            </div>
            <aside className="glass h-fit min-w-0 space-y-4 rounded-3xl p-7 lg:sticky lg:top-28">
              <p className="font-display text-2xl text-white"><span className="mr-2 text-gold">4.</span>Your details</p>
              <div><label className={labelCls}>Name</label><input required className={inputCls} placeholder="Full name" /></div>
              <div><label className={labelCls}>Email</label><input required type="email" className={inputCls} placeholder="you@example.com" /></div>
              <div><label className={labelCls}>TikTok username</label><input className={inputCls} placeholder="@username" /></div>
              <div><label className={labelCls}>Notes</label><textarea rows={3} className={inputCls} placeholder="Anything you’d like to focus on" /></div>
              <button disabled={!ready} className="w-full whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-8px_rgba(168,85,247,.9)] transition hover:scale-[1.02] disabled:opacity-40">Request booking</button>
              <p className="text-center text-[11px] text-muted">18+ · Entertainment purposes only · All sales final</p>
            </aside>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
