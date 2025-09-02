"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useCart } from "../app/context/cartContext";

export const SearchButton = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setShowInput(!showInput);
    if (!showInput) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="relative">
      {!showInput && (
        <button onClick={handleClick} className="p-2 rounded hover:bg-gray-200">
          <FaSearch size={20} />
        </button>
      )}

      {showInput && (
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="p-2 border rounded shadow-md"
          />
          <button
            onClick={handleClick}
            className="p-2 rounded hover:bg-gray-200"
          >
            ✕
          </button>
        </div>
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
