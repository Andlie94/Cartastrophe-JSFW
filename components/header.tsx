"use client";

import Link from "next/link";
import { useState, useRef, useEffect, Suspense } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from "../app/context/cartContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchButton = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleToggle = () => {
    setShowInput((prev) => !prev);
    if (!showInput) setTimeout(() => inputRef.current?.focus(), 0);
  };

  const updateUrl = (nextQ: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQ.trim()) params.set("q", nextQ.trim());
    else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(q);
  };

  return (
    <div className="relative">
      {!showInput && (
        <button onClick={handleToggle} className="p-2" aria-label="Open search">
          <FaSearch size={20} />
        </button>
      )}

      {showInput && (
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="p-2 border rounded shadow-md w-40 sm:w-56"
          />
          <button type="submit" className="p-2" aria-label="Search">
            <FaSearch size={18} />
          </button>
          <button onClick={handleToggle} type="button" className="p-2" aria-label="Close search">
            ✕
          </button>
        </form>
      )}
    </div>
  );
};

export default function Header() {
  const { toggleCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="w-full px-4 md:px-6 py-4 flex md:grid md:grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex-1 justify-self-start">
          <Link href="/" className="block leading-tight">
            <h1 className="text-2xl md:text-3xl">Cartastrophe</h1>
            <p className="text-xs md:text-sm">Oops, I bought it again</p>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 justify-self-center">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="w-px h-6 bg-blue-900" />
          <Link href="/contact" className="hover:underline">Contact</Link>
          <span className="w-px h-6 bg-blue-900" />
          <Link href="/about" className="hover:underline">About</Link>
        </nav>

        <div className="flex items-center gap-3 justify-end">
          <div className="hidden md:block">
            <Suspense>
              <SearchButton />
            </Suspense>
          </div>

          <Link href="/cart" className="p-2" aria-label="Go to cart">
            <FaShoppingCart size={24} />
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-2xl leading-none">☰</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <div className="w-full px-4 py-3 flex flex-col gap-4">
            <Suspense>
              <SearchButton />
            </Suspense>
            <nav className="flex flex-col gap-3">
              <Link href="/" onClick={() => setOpen(false)} className="py-1">Home</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="py-1">Contact</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="py-1">About</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}