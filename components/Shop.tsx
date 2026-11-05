"use client";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Minus, Plus, Search, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { sq, type Product } from "@/lib/catalog";
import { useCart } from "./Cart";
import { GlowButton, Pill, Reveal, Tilt } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;
const money = (n: number) => `$${n % 1 ? n.toFixed(2) : n}`;
export const priceLabel = (p: Product) => (p.priceMax > p.price ? `from ${money(p.price)}` : money(p.price));
const base = (p: Product) => (p.kind === "spell" ? "/shop" : "/creations");

export function ProductCard({ p, i = 0 }: { p: Product; i?: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.55, delay: Math.min(i % 12, 8) * 0.04, ease }}>
      <Tilt max={6} className="h-full">
        <Link href={`${base(p)}/${p.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d0719] transition-colors hover:border-gold/40">
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-violet-900/40 to-black">
            <Image src={sq(p.images[0], 600)} alt={p.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
            <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-gold">{p.kind === "spell" ? "Spell" : "Creation"}</span>
          </div>
          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
            <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">{p.title}</h3>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-display text-2xl text-gold">{priceLabel(p)}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition group-hover:border-gold group-hover:bg-gold group-hover:text-black"><ArrowUpRight size={16} /></span>
            </div>
          </div>
        </Link>
      </Tilt>
    </motion.div>
  );
}

export function ProductBrowser({ products, cats, placeholder }: { products: Product[]; cats: { id: string; label: string }[]; placeholder: string }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("default");
  const [shown, setShown] = useState(24);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat");
    if (c && cats.some((x) => x.id === c)) setCat(c);
  }, [cats]);
  useEffect(() => setShown(24), [cat, q, sort]);

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === "all" || p.cats.includes(cat)) && p.title.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "az") l = [...l].sort((a, b) => a.title.localeCompare(b.title));
    return l;
  }, [products, cat, q, sort]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="sticky top-20 z-30 mb-8 rounded-3xl border border-white/10 bg-[#0a0516]/85 p-3 backdrop-blur-2xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-muted focus:border-gold/50" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-white/10 bg-[#120a24] px-4 py-2.5 text-sm text-white outline-none focus:border-gold/50">
            <option value="default">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="az">Name: A–Z</option>
          </select>
        </div>
        <div className="mt-3 flex gap-1 overflow-x-auto [scrollbar-width:none]">
          {cats.map((c) => (
            <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</Pill>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-muted"><span className="text-gold">{list.length}</span> {list.length === 1 ? "item" : "items"}</p>

      <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.slice(0, shown).map((p, i) => (
            <ProductCard key={p.kind + p.slug} p={p} i={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && <p className="py-24 text-center text-muted">Nothing found — try another search.</p>}
      {shown < list.length && (
        <div className="mt-12 flex justify-center">
          <button onClick={() => setShown((s) => s + 24)} className="glass rounded-full px-8 py-3.5 text-sm text-white transition hover:border-gold/60 hover:text-gold">
            Load more ({list.length - shown} left)
          </button>
        </div>
      )}
    </section>
  );
}

export function ProductDetail({ p, related }: { p: Product; related: Product[] }) {
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [opts, setOpts] = useState<Record<string, string>>(() => Object.fromEntries(p.options.map((o) => [o.name, o.values[0]])));
  const optLabel = Object.values(opts).filter(Boolean).join(" / ");
  const id = p.kind + p.slug + optLabel;
  const desc = (p.excerpt || "Each item is prepared with care, intention and devotion.").replace(/([.!?])([A-Z])/g, "$1\n\n$2");

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-40">
        <nav className="mb-8 text-xs text-muted">
          <Link href="/" className="hover:text-white">Home</Link> / <Link href={base(p)} className="hover:text-white">{p.kind === "spell" ? "Shop Spells" : "Divine Creations"}</Link> / <span className="text-white/70">{p.title}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-900/40 to-black">
              <AnimatePresence mode="wait">
                <motion.div key={img} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <Image src={sq(p.images[img], 1000)} alt={p.title} fill priority sizes="50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            {p.images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                {p.images.slice(0, 8).map((u, i) => (
                  <button key={u} onClick={() => setImg(i)} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${i === img ? "border-gold" : "border-white/10 opacity-70 hover:opacity-100"}`}>
                    <Image src={sq(u, 200)} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold/80">{p.kind === "spell" ? "Live spiritual work" : "Divine Creations by DJ"}</p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{p.title}</h1>
            <p className="font-display mt-4 text-4xl text-gold">{priceLabel(p)}</p>
            <p className="mt-6 whitespace-pre-line leading-relaxed text-muted">{desc.length > 900 ? desc.slice(0, 900) + "…" : desc}</p>

            {p.options.map((o) => (
              <div key={o.name} className="mt-7">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/70">{o.name}</p>
                <div className="flex flex-wrap gap-2">
                  {o.values.map((v) => (
                    <button key={v} onClick={() => setOpts((s) => ({ ...s, [o.name]: v }))} className={`rounded-full border px-5 py-2 text-sm transition ${opts[o.name] === v ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-white/80 hover:border-white/40"}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="glass flex items-center rounded-full">
                <button aria-label="Less" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 text-white/80 hover:text-white"><Minus size={16} /></button>
                <span className="w-8 text-center text-white">{qty}</span>
                <button aria-label="More" onClick={() => setQty((q) => q + 1)} className="p-3 text-white/80 hover:text-white"><Plus size={16} /></button>
              </div>
              <button
                onClick={() => add({ id, title: p.title + (optLabel ? ` — ${optLabel}` : ""), price: p.price, img: sq(p.images[0], 300), option: optLabel, href: `${base(p)}/${p.slug}` }, qty)}
                className="group relative flex-1 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-8px_rgba(168,85,247,.9)] transition-[background-position] duration-700 hover:bg-right sm:flex-none"
              >
                <span className="relative z-10">Add to cart</span>
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </div>

            <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm text-muted">
              {p.kind === "spell" ? (
                <>
                  <p className="flex gap-3"><ShieldCheck size={18} className="shrink-0 text-gold" /> After booking, join the TikTok LIVE and comment “Here For My Spell” to be added to the queue.</p>
                  <p className="flex gap-3"><span className="shrink-0 text-gold">✦</span> Entertainment purposes only. Results cannot be guaranteed. Clients must be 18+.</p>
                </>
              ) : (
                <>
                  <p className="flex gap-3"><Truck size={18} className="shrink-0 text-gold" /> Handmade and natural pieces vary slightly in color, shape and finish.</p>
                  <p className="flex gap-3"><span className="shrink-0 text-gold">✦</span> All sales are final. See our <Link href="/legal/refund" className="text-gold underline-offset-4 hover:underline">Refund Policy</Link>.</p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="font-display mb-8 text-3xl text-white">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((r, i) => <ProductCard key={r.slug} p={r} i={i} />)}
          </div>
          <div className="mt-10 flex justify-center"><GlowButton href={base(p)} variant="ghost">Back to {p.kind === "spell" ? "all spells" : "all creations"}</GlowButton></div>
        </section>
      )}
    </>
  );
}
