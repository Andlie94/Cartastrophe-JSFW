'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '../app/context/cartContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchButton = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState(searchParams.get('q') ?? '');

  useEffect(() => {
    setQ(searchParams.get('q') ?? '');
  }, [searchParams]);

  const handleToggle = () => {
    setShowInput((prev) => !prev);
    if (!showInput) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const updateUrl = (nextQ: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextQ.trim()) params.set('q', nextQ.trim());
    else params.delete('q');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(q);
  };

  return (
    <div className="relative">
      {!showInput && (
        <button
          onClick={handleToggle}
          className="p-2 rounded hover:bg-gray-200"
        >
          <FaSearch size={20} />
        </button>
      )}

      {showInput && (
        <form onSubmit={onSubmit} className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="p-2 border rounded shadow-md"
          />
          <button
            type="submit"
            className="p-2 rounded hover:bg-gray-200"
            aria-label="Search"
          >
            <FaSearch size={18} />
          </button>
          <button
            onClick={handleToggle}
            type="button"
            className="p-2 rounded hover:bg-gray-200"
            aria-label="Close search"
          >
            ✕
          </button>
        </form>
      )}
    </div>
  );
};

export default function Header() {
  const { toggleCart } = useCart();

  return (
    <header>
      <nav className="flex items-center p-4 text-custom">
        <div className="flex-1 flex flex-col items-start">
          <Link href="/">
            <h1 className="text-3xl">Cartastrophe</h1>
          </Link>
          <p className="text-sm">Oops, I bought it again</p>
        </div>

        <div className="flex space-x-8 mt-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <hr className="w-px h-6 bg-blue-900" />
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <hr className="w-px h-6 bg-blue-900" />
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center mt-2 space-x-4">
          <SearchButton />
          <Link
            href="/cart"
            className="p-2 rounded hover:bg-gray-200"
            aria-label="Go to cart"
          >
            <FaShoppingCart size={28} color="#000000" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
