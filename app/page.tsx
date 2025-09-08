"use client";

import React, { useEffect, useState, useRef } from "react";
import { getProducts } from "../components/fetch";
import Link from "next/link";
import Image from "next/image";

export type Product = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [sortOrder, setSortOrder] = useState<"expensive" | "cheap">(
    "expensive"
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <p>Laster produkter...</p>;

  function getDisplayPrice(product: Product) {
    if (product.discountedPrice < product.price) {
      return <span>On sale: ${product.discountedPrice.toFixed(2)}</span>;
    }
    return `$${product.price.toFixed(2)}`;
  }

  function sortProducts(products: Product[], order: "expensive" | "cheap" | "all") {
    return [...products].sort((a, b) => {
      if (order === "expensive") {
        return b.price - a.price;
      } else if (order === "cheap") {
        return a.price - b.price;
      } else {
        return 0;
      }
    });
  }

  return (
    <div>
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-4">
        <Image
          src="https://images.unsplash.com/photo-1579143074908-5aaac893d0fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full md:h-full object-cover"
          width={500}
          height={500}
          alt="picture of a black watch with a colorful image"
        />
        <h2 className="absolute top-15 left-10 text-2xl md:top-30 md:left-70 text-amber-300 text-3xl font-bold">
          New arrivals
        </h2>
        <p className="absolute text-[#C5C4A6] text-l top-25 left-8 md:top-40 md:left-70">
          Shop the latest products
        </p>
        <Link href="/about">
          <button className="absolute top-35 left-17  md:top-50 md:left-77 bg-[#C5C4A6] text-[#4B4B4B] py-2 px-4 rounded shadow-lg hover:bg-[#B0AFA0] transition">
            about us
          </button>
        </Link>
      </div>

      <div className="container mx-auto px-20 mt-10">
        <div className="flex justify-between items-center">
          <h3 className="text-1xl font-bold mb-3.5 text-black">Shop Now</h3>

          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 hover:text-gray-500 transition"
            >
              <span>{open ? "▲" : "▼"}</span>
            </button>
            {open && (
              <div className="absolute w-48 bg-white border-gray-200 rounded-lg shadow-xl z-10">
                <ul className="py-1 text-sm text-gray-700">
                  <li className="px-4 py-2 font-bold">Sort by</li>
                  <li
                    onClick={() => setSortOrder("all")}
                    className="px-4 py-2 hover:bg-[#C5C4A6] cursor-pointer"
                  >
                    All
                    
                  </li>
                  <li
                    onClick={() => setSortOrder("expensive")}
                    className="px-4 py-2 hover:bg-[#C5C4A6] cursor-pointer"
                  >
                    Price: High
                  </li>
                  <li
                    onClick={() => setSortOrder("cheap")}
                    className="px-4 py-2 hover:bg-[#C5C4A6] cursor-pointer"
                  >
                    Price: Low
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-6">
          {sortProducts(products, sortOrder).map((product) => (
            <Link
              key={product.id}
              href={`/individual/${product.id}`}
              className="rounded-2xl block"
            >
              <div className="relative w-full h-96 mb-4 rounded-2xl">
                <Image
                  src={product.image?.url ?? "/default-image.jpg"}
                  alt={product.image?.alt ?? product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-2xl"
                />
              </div>
              <p className="text-xl mb-2">{product.title}</p>
              <p className="font-bold mb-10">{getDisplayPrice(product)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
