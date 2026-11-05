"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { specials } from "@/lib/data";
import { allNav, mainNav, moreNav } from "@/lib/nav";
import { useCart } from "./Cart";
import { Marquee } from "./ui";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-white/5 bg-black/70 py-2 text-xs text-gold-soft">
      <Marquee>
        {specials.map((s, i) => (
          <span key={i} className="flex items-center gap-5 whitespace-nowrap">
            <span className="text-gold">✦</span> {s}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function activeId(path: string) {
  if (path === "/") return "home";
  const f = allNav.find((n) => n.href !== "/" && path.startsWith(n.href));
  return f?.id ?? "";
}

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 30);
    setHidden(v > 240 && v > prev && !open);
  });
  useEffect(() => {
    setOpen(false);
    setMore(false);
  }, [pathname]);

  const active = activeId(pathname);
  const moreActive = moreNav.some((n) => n.id === active);

  return (
    <motion.header animate={{ y: hidden ? -120 : scrolled ? 0 : 34 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 top-3 z-50 px-3 sm:px-4">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-2xl transition-all duration-500 sm:px-5 ${
          scrolled ? "border-white/15 bg-[#0a0516]/85 shadow-[0_10px_50px_-10px_rgba(124,58,237,.55)]" : "border-white/10 bg-[#0a0516]/55"
        }`}
      >
        <Link href="/" className="font-display flex items-center gap-2 text-xl font-semibold tracking-wide text-white">
          <motion.span animate={{ rotate: [0, 12, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="text-gold">☾</motion.span>
          <span className="whitespace-nowrap">Divine Brujita <span className="text-gold">DJ</span></span>
        </Link>

        <ul className="hidden items-center xl:flex" onMouseLeave={() => setHover(null)}>
          {mainNav.map((n) => {
            const on = hover ? hover === n.id : active === n.id;
            return (
              <li key={n.id} className="relative" onMouseEnter={() => setHover(n.id)}>
                {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-white/10 bg-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <Link href={n.href} className={`relative z-10 block whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors ${active === n.id ? "text-white" : "text-muted hover:text-white"}`}>
                  {n.label}
                  {active === n.id && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />}
                </Link>
              </li>
            );
          })}
          <li className="relative" onMouseEnter={() => { setHover("more"); setMore(true); }} onMouseLeave={() => setMore(false)}>
            {(hover ? hover === "more" : moreActive) && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-white/10 bg-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <button className={`relative z-10 flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm ${moreActive ? "text-white" : "text-muted hover:text-white"}`}>
              More <ChevronDown size={14} className={`transition-transform ${more ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {more && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} transition={{ duration: 0.18 }} className="absolute right-0 top-full w-72 pt-3">
                  <div className="rounded-3xl border border-white/10 bg-[#0a0516]/95 p-2 shadow-2xl shadow-violet-950/60 backdrop-blur-2xl">
                    {moreNav.map((m) => (
                      <Link key={m.id} href={m.href} className="block rounded-2xl px-4 py-3 transition hover:bg-white/10">
                        <span className="font-display text-lg text-white">{m.label}</span>
                        <span className="block text-xs text-muted">{m.sub}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link href="/login" aria-label="Login" className="hidden rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white sm:block"><User size={19} /></Link>
          <Link href="/cart" aria-label="Cart" className="relative rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white">
            <ShoppingBag size={19} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-black">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link href="/book" className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white shadow-[0_0_30px_-6px_rgba(168,85,247,.9)] transition hover:scale-105 sm:block">
            <span className="relative z-10">Book Now</span>
            <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-full p-2 text-white xl:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.96 }} transition={{ duration: 0.25 }} className="mx-auto mt-2 grid max-h-[75svh] max-w-6xl grid-cols-2 gap-1 overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0516]/95 p-3 backdrop-blur-2xl sm:grid-cols-3 xl:hidden">
            {[...allNav, { label: "Login", href: "/login", id: "login" }, { label: "Cart", href: "/cart", id: "cart" }].map((n, i) => (
              <motion.li key={n.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                <Link href={n.href} className={`font-display block rounded-2xl px-4 py-3 text-lg ${active === n.id ? "bg-white/10 text-gold" : "text-white hover:bg-white/5"}`}>
                  {n.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
