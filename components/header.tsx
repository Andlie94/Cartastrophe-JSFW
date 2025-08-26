'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';


export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <header className="">

      <nav className="flex justify-center space-x-8 p-4 text-custom">
        <Link href="/" className="hover:underline">Home</Link>
        <hr className="w-px h-6 bg-blue-900" />
        <Link href="/cart" className="hover:underline">Cart</Link>  {/* se om vi har bruk for denne */}
        <hr className="w-px h-6 bg-blue-900" />
        <Link href="/contact" className="hover:underline">Contact</Link>
      </nav>
    </header>
  );
}