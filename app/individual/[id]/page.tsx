import React from "react";
import { getProductById } from "@/components/fetch";
import Image from "next/image";

export const dynamic = "force-static";

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, rating ?? 0));
  return <span className="text-yellow-500 text-base sm:text-lg">{"★".repeat(r)}{"☆".repeat(5 - r)}</span>;
}

export default async function IndividualPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) return <div className="px-4 py-12 text-center">Fant ikke produkt</div>;

  const reviews = product.reviews || [];

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8 md:pt-16 pb-24 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="relative w-full max-w-md mx-auto aspect-[4/3] sm:aspect-square">
            {product.image?.url && (
              <Image
                src={product.image.url}
                alt={product.image.alt ?? product.title}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                priority
              />
            )}
          </div>

          <div className="flex flex-col gap-4 md:gap-6 items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
            <h1 className="text-2xl sm:text-3xl font-bold break-words">{product.title}</h1>
            <div className="text-lg sm:text-xl font-semibold">{product.price} USD</div>
            {product.description && (
              <p className="text-sm sm:text-base leading-relaxed text-gray-700">{product.description}</p>
            )}
            <button
              type="button"
              className="hidden md:inline-flex justify-center items-center px-6 py-3 rounded-md text-black bg-brand-button hover:bg-brand-button-hover"
            >
              Add to cart
            </button>
          </div>
        </div>

        <section className="mt-12 md:mt-16 max-w-2xl mx-auto md:mx-0">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4 md:space-y-6">
              {reviews.map((r: any, i: number) => (
                <div key={i} className="border rounded-lg shadow-sm bg-white p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <p className="font-bold text-sm sm:text-base">{r.username}</p>
                    <Stars rating={r.rating ?? 0} />
                  </div>
                  {r.description && <p className="text-sm md:text-base text-gray-700">{r.description}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center md:text-left">No reviews yet for this product.</p>
          )}
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/90 backdrop-blur border-t">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-gray-600">Price</div>
            <div className="text-lg font-semibold">{product.price} USD</div>
          </div>
          <button
            type="button"
            className="flex-[2] h-12 rounded-md text-black bg-brand-button hover:bg-brand-button-hover"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}