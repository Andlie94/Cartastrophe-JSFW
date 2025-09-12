"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/app/context/cartContext";

export default function CartDropdown() {
  const { items, total, increase, decrease, remove, clear, toggleCart } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  // Lukk ved klikk utenfor / ESC
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) toggleCart();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggleCart();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [toggleCart]);

  return (
    <div
      ref={ref}
      className="fixed right-4 top-[72px] z-50 w-[22rem] max-w-[95vw] rounded-lg border bg-white shadow-lg"
      role="dialog"
      aria-label="Cart"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold">Cart</h3>
        <button className="text-sm underline" onClick={toggleCart}>Close</button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-sm text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <ul className="max-h-80 overflow-auto divide-y">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3 p-4 items-center">
                <div className="relative h-14 w-14 rounded overflow-hidden bg-gray-100 shrink-0">
                  {it.image?.url ? (
                    <Image
                    src={it.image.url}
                    alt={it.image.alt ?? it.title}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{it.title}</p>
                  <p className="text-sm text-gray-600">${it.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <button className="h-6 w-6 border rounded" onClick={() => decrease(it.id)}>-</button>
                    <span className="text-sm">{it.qty}</span>
                    <button className="h-6 w-6 border rounded" onClick={() => increase(it.id)}>+</button>
                    <button className="ml-2 text-xs underline text-gray-500" onClick={() => remove(it.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="px-4 py-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            <div className="flex gap-2">
              <Link
                href="/cart"
                className="flex-1 h-10 grid place-items-center rounded-md border"
                onClick={toggleCart}
              >
                View cart
              </Link>
              <Link
                href="/cart" 
                className="flex-1 h-10 grid place-items-center rounded-md bg-brand-button hover:bg-brand-button-hover text-black"
                onClick={toggleCart}
              >
                Checkout
              </Link>
            </div>

            <button className="w-full text-xs text-gray-500 underline" onClick={clear}>
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}