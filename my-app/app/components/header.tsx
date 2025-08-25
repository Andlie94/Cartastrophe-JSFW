'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';


export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="">

      <nav className="flex justify-center space-x-8 p-4 text-custom">
        <Link href="/" className="hover:underline">About me</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="hover:underline cursor-pointer"
          >
            My Work
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
              <Link href="/design" className="block px-4 py-2 hover:bg-gray-200">Design</Link>
              <Link href="/code" className="block px-4 py-2 hover:bg-gray-200">Code</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}