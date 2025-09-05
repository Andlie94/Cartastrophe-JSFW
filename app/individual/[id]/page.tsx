import React from 'react';
import { getProductById } from '@/components/fetch';
import Image from 'next/image';

export const dynamic = 'force-static';

export default async function IndividualPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div>Fant ikke produkt</div>;
  }

  return (
    <main>
      <h1>{product.title}</h1>
      {product.image?.url && (
        <div className="relative w-full h-96">
          <Image src={product.image.url} alt={product.image.alt ?? product.title} fill className="object-cover" />
        </div>
      )}
      <p>{product.description}</p>
      <p>Pris: {product.price}</p>
    </main>
  );
}