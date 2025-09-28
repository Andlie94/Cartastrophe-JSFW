import React from "react";
import { getProductById } from "@/components/fetch";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import ReviewCarousel from "@/components/ReviewCarousel";

export const dynamic = "force-static";

type Review = {
  username: string;
  rating: number;
  description?: string;
};

export default async function IndividualPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  if (!product) {
    return <div className="px-4 py-12 text-center">Fant ikke produkt</div>;
  }

  const reviews: Review[] = product.reviews ?? [];

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
            <h1 className="text-2xl sm:text-3xl font-bold break-words">
              {product.title}
            </h1>
            <div className="text-lg sm:text-xl font-semibold">
              {product.price} USD
            </div>
            {product.description && (
              <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                {product.description}
              </p>
            )}
            <AddToCartButton
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              className="hidden md:flex"
            />
          </div>
        </div>

        <section className="mt-12 md:mt-16 max-w-2xl mx-auto md:mx-0">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Reviews</h2>
          <ReviewCarousel reviews={reviews} />
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/90 backdrop-blur border-t">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-gray-600">Price</div>
            <div className="text-lg font-semibold">{product.price} USD</div>
          </div>
          <AddToCartButton
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            className="flex-[2] h-12 w-full"
            openCartOnAdd={true}
          />
        </div>
      </div>
    </>
  );
}