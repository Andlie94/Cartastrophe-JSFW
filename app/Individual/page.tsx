"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductById } from "@/components/fetch";

type Product = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  description?: string;
  image?: { url: string; alt: string };
};

export default function IndividualPage() {
  const search = useSearchParams();
  const id = search.get("id") || "";
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getProductById(id).then(setProduct).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Laster…</div>;
  if (!id || !product) return <div>Fant ikke produkt</div>;

  return (
    <main>
      <h1>{product.title}</h1>
      {product.image?.url && (
        <img src={product.image.url} alt={product.image?.alt || product.title} />
      )}
      {product.description && <p>{product.description}</p>}
      <p>Price: {product.price}</p>
      <p>Discounted: {product.discountedPrice}</p>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}