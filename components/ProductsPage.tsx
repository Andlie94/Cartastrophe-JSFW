'use client';

import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export type Product = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: { url: string; alt: string };
};

export default function ProductsPage({
  initialProducts,
  initialQuery = '',
}: {
  initialProducts: Product[];
  initialQuery?: string;
}) {
  const [products] = useState<Product[]>(initialProducts);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [sortOrder, setSortOrder] = useState<'expensive' | 'cheap' | 'all'>(
    'all'
  );
  const [query, setQuery] = useState(initialQuery);

  function SearchParamsSync({ onChange }: { onChange: (query: string) => void }) {
    const searchParams = useSearchParams();
    const qParam = (searchParams.get('q') ?? '').trim().toLowerCase();
    useEffect(() => {
      onChange(qParam);
    }, [qParam, onChange]);
    return null;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleProducts = useMemo(() => {
    const list = query
      ? products.filter((p) => {
          const title = p.title?.toLowerCase() ?? '';
          const alt = p.image?.alt?.toLowerCase() ?? '';
          return title.includes(query) || alt.includes(query);
        })
      : products;

    return sortProducts(list, sortOrder);
  }, [products, sortOrder, query]);

  function getDisplayPrice(product: Product) {
    if (product.discountedPrice < product.price) {
      return <span>On sale: ${product.discountedPrice.toFixed(2)}</span>;
    }
    return `$${product.price.toFixed(2)}`;
  }

  function getEffectivePrice(product: Product) {
    return product.discountedPrice < product.price
      ? product.discountedPrice
      : product.price;
  }

  function sortProducts(list: Product[], order: 'expensive' | 'cheap' | 'all') {
    return [...list].sort((a, b) => {
      const priceA = getEffectivePrice(a);
      const priceB = getEffectivePrice(b);

      if (order === 'expensive') return priceB - priceA;
      if (order === 'cheap') return priceA - priceB;
      return 0;
    });
  }

  return (
    <>
      <Suspense>
        <SearchParamsSync onChange={setQuery} />
      </Suspense>

      <div>
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-4">
          <Image
            src="https://images.unsplash.com/photo-1579143074908-5aaac893d0fe?q=80&w=2070&auto=format&fit=crop"
            className="w-full md:h-full object-cover"
            width={1200}
            height={400}
            alt="Picture of a black watch with a colorful image"
            priority
          />
          <div className="">
            <h2 className="absolute top-20 left-14 text-2xl md:top-20 md:left-45 text-amber-300 font-bold">
              New arrivals
            </h2>
            <p className="absolute text-[#C5C4A6] text-lg top-30 left-8 md:top-32 md:left-40">
              Shop the latest products
            </p>
          </div>
          <Link href="/about">
            <button className="absolute top-42 left-18 md:top-44 md:left-50 bg-[#C5C4A6] text-[#4B4B4B] py-2 px-4 rounded shadow-lg hover:bg-[#B0AFA0] transition cursor-pointer">
              About us
            </button>
          </Link>
        </div>

        <div className="container mx-auto px-6 md:px-20 mt-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold mb-3.5 text-black">
              {query ? `Shop Now — search: ${query}` : 'Shop Now'}
            </h3>

            <div className="relative inline-block" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 hover:text-gray-500 transition"
              >
                <span>{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                  <ul className="py-1 text-sm text-gray-700">
                    <li className="px-4 py-2 font-bold">Sort by</li>
                    <li
                      onClick={() => setSortOrder('all')}
                      className="px-4 py-2 hover:bg-[#C5C4A6] cursor-pointer"
                    >
                      All
                    </li>
                    <li
                      onClick={() => setSortOrder('expensive')}
                      className="px-4 py-2 hover:bg-[#C5C4A6] cursor-pointer"
                    >
                      Price: High
                    </li>
                    <li
                      onClick={() => setSortOrder('cheap')}
                      className="px-4 py-2 hover:bg-[#C5C4A6] cursor-pointer"
                    >
                      Price: Low
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {visibleProducts.map((product) => (
              <Link
                key={product.id}
                href={`/individual/${product.id}`}
                className="rounded-2xl block"
              >
                <div className="hover:scale-105 transition border border-transparent hover:border-[#C5C4A6] rounded-2xl">
                  <div className="relative w-full h-80 mb-2 md:h-96 md:mb-4 rounded-2xl">
                    <Image
                      src={product.image?.url ?? '/default-image.jpg'}
                      alt={product.image?.alt ?? product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <p className="text-xl ml-2">{product.title}</p>
                  <p className="font-bold mb-10 ml-2">
                    {getDisplayPrice(product)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}