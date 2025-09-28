"use client";

import { useState, useCallback, useEffect, useRef } from "react";

type Review = {
  username: string;
  rating: number;
  description?: string;
};

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, rating ?? 0));
  return (
    <span className="text-yellow-500 text-base sm:text-lg">
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

  if (!total) {
    return (
      <div className={`text-gray-500 ${className}`}>
        No reviews yet for this product.
      </div>
    );
  }

  const clamp = (i: number) => (i + total) % total;
  const goTo = useCallback((i: number) => setIndex(clamp(i)), [total]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - startX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    startX.current = null;
  };

  const r = reviews[index];

  return (
    <section
      className={`relative select-none ${className}`}
      aria-roledescription="carousel"
      aria-label="Product reviews"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative">
        <article
          className="border border-gray-300 rounded-xl bg-white shadow-sm px-6 sm:px-8 py-4 sm:py-5 transition"
          aria-live="polite"
        >
          <header className="flex items-start justify-between gap-3 mb-2">
            <p className="font-bold text-base sm:text-lg">{r.username}</p>
            <Stars rating={r.rating} />
          </header>
          {r.description && (
            <p className="text-sm md:text-base text-gray-700">{r.description}</p>
          )}
        </article>

        {total > 1 && (
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

      {total > 1 && (
        <nav
          className="mt-3 flex items-center justify-center gap-2"
          aria-label="Review pagination"
        >
          {reviews.map((_, i) => {
            const active = i === index;
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