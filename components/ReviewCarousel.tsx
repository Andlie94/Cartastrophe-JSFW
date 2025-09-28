"use client";

import { useEffect, useRef, useState } from "react";

export type Review = {
  username: string;
  rating: number;
  description?: string;
};

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating ?? 0)));
  return (
    <span className="text-[#E0B600] text-base sm:text-lg" aria-label={`${r} out of 5 stars`}>
      {"★".repeat(r)}
      {"☆".repeat(5 - r)}
    </span>
  );
}

export default function ReviewCarousel({
  reviews,
  className = "",
}: {
  reviews: Review[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const total = reviews?.length ?? 0;
  const hasReviews = total > 0;

  const clamp = (i: number) => (i + total) % Math.max(total, 1);

  
  const goTo = (i: number) => setIndex(clamp(i));
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));

 
  useEffect(() => {
    if (!hasReviews || total < 2) return;
  
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasReviews, total]);

  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - startX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    startX.current = null;
  };

  const r = hasReviews ? reviews[clamp(index)] : undefined;

  return (
    <section
      className={`relative select-none ${className}`}
      aria-roledescription="carousel"
      aria-label="Product reviews"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative">
        {hasReviews ? (
          <article
            className="border border-gray-300 rounded-xl bg-white shadow-sm px-6 sm:px-8 py-4 sm:py-5 transition"
            aria-live="polite"
          >
            <header className="flex items-start justify-between gap-3 mb-2">
              <p className="font-bold text-base sm:text-lg">{r!.username}</p>
              <Stars rating={r!.rating} />
            </header>
            {r!.description && (
              <p className="text-sm md:text-base text-gray-700">{r!.description}</p>
            )}
          </article>
        ) : (
          <div className="border border-gray-300 rounded-xl bg-white shadow-sm px-6 sm:px-8 py-6 text-gray-500">
            No reviews yet for this product.
          </div>
        )}

        {hasReviews && total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="hidden md:flex items-center justify-center absolute -left-5 top-1/2 -translate-y-1/2 size-9 rounded-full
                         bg-white shadow border border-gray-200 hover:bg-gray-50 z-10
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <span aria-hidden>‹</span>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="hidden md:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 size-9 rounded-full
                         bg-white shadow border border-gray-200 hover:bg-gray-50 z-10
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <span aria-hidden>›</span>
            </button>
          </>
        )}
      </div>

    
      {hasReviews && total > 1 && (
        <nav className="mt-3 flex items-center justify-center gap-2" aria-label="Review pagination">
          {reviews.map((_, i) => {
            const active = i === clamp(index);
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to review ${i + 1}`}
                aria-current={active ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  active ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </nav>
      )}
    </section>
  );
}