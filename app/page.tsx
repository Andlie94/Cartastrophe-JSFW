"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "../components/fetch";
import Link from "next/link";
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Laster produkter...</p>;

  function getDisplayPrice(product: Product) {
    if (product.discountedPrice < product.price) {
      return <span>On sale: ${product.discountedPrice.toFixed(2)}</span>;
    }
    return `$${product.price.toFixed(2)}`;
  }

  return (
    <div className="container mx-auto px-20 mt-10">
      <h3 className="text-1xl font-bold mb-3.5 text-black">Shop Now</h3>
      <div className="grid grid-cols-3 gap-8">
      {products.map((product) => (
        <Link key={product.id} href={`/Individual?id=${product.id}`} className="rounded-2xl block">
    <img
      src={product.image.url}
      alt={product.image.alt}
      className="w-full h-96 object-cover mb-4 rounded-2xl"
    />
    <p className="text-xl mb-2">{product.title}</p>
    <p className="font-bold mb-10">{getDisplayPrice(product)}</p>
  </Link>
))}
      </div>
    </div>
  );
}
