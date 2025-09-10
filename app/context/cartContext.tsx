"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

type Img = { url?: string; alt?: string };
export type CartItem = { id: string; title: string; price: number; image?: Img; qty: number };

type Ctx = {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  total: number;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const toggleCart = () => setOpen(v => !v);
  const addItem = (it: Omit<CartItem, "qty">, qty = 1) =>
    setItems(prev => {
      const i = prev.findIndex(p => p.id === it.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { ...it, qty }];
    });
  const increase = (id: string) => setItems(prev => prev.map(p => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const decrease = (id: string) =>
    setItems(prev => prev.map(p => (p.id === id ? { ...p, qty: p.qty - 1 } : p)).filter(p => p.qty > 0));
  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, p) => n + p.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, p) => s + p.price * p.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, isOpen, count, total, toggleCart, addItem, increase, decrease, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};