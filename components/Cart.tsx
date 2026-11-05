"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { id: string; title: string; price: number; img: string; qty: number; option?: string; href: string };

type Ctx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (i: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toast: string | null;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "dj-demo-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((i: Omit<CartItem, "qty">, qty = 1) => {
    setItems((cur) => {
      const f = cur.find((c) => c.id === i.id);
      return f ? cur.map((c) => (c.id === i.id ? { ...c, qty: c.qty + qty } : c)) : [...cur, { ...i, qty }];
    });
    setToast(`${i.title} added to cart`);
  }, []);
  const setQty = useCallback((id: string, qty: number) => setItems((cur) => (qty <= 0 ? cur.filter((c) => c.id !== id) : cur.map((c) => (c.id === id ? { ...c, qty } : c)))), []);
  const remove = useCallback((id: string) => setItems((cur) => cur.filter((c) => c.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<Ctx>(
    () => ({ items, count: items.reduce((n, i) => n + i.qty, 0), total: items.reduce((n, i) => n + i.qty * i.price, 0), add, setQty, remove, clear, toast }),
    [items, add, setQty, remove, clear, toast],
  );
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
