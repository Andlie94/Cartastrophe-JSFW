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

const IndividualPage: React.FC = () => {
  const search = useSearchParams();
  const id = search.get("id") || ""; 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("fail to load product from the API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Laster…</div>;
  if (!id || !product) return <div>Fant ikke produkt</div>;

  return (
    <main style={{ padding: "" }}>
      <h1>{product.title}</h1>

      {product.image?.url && (
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
        />
      )}

      {product.description && <p>{product.description}</p>}

      <p>Price: {product.price} kr</p>
      <p>Discounted price: {product.discountedPrice} kr</p>
    </main>
  );
};

export default IndividualPage;