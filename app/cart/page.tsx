"use client";

import React from "react";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, total } = useCart();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <section>
        <h1 className="text-3xl font-bold font-playfair mb-8">Checkout</h1>

        <p className="mb-6 font-medium">
          Please fill out your contact information
        </p>
        <form className="space-y-6">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f7f2]"
            />
          </div>

          <h2 className="text-2xl font-bold font-playfair mt-10">
            Shipping Adress
          </h2>

          <div>
            <label className="block mb-2">Full name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f7f2]"
            />
          </div>

          <div>
            <label className="block mb-2">Adress</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f7f2]"
            />
          </div>

          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f7f2]"
            />
          </div>

          <div>
            <label className="block mb-2">Country</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f7f2]"
            />
          </div>

          <div>
            <label className="block mb-2">Postal code</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f7f2]"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-[#C3C19E] text-white py-3 px-6 rounded-md hover:bg-[#b5b38f] transition block mx-auto"
          >
            PLACE ORDER
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-playfair mb-6">Order Summary</h2>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-white"
                >
                  {item.image?.url && (
                    <div className="w-20 h-20 relative">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt ?? item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold font-playfair text-base md:text-lg">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.qty} × {item.price.toFixed(2)} USD
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-2 text-sm sm:text-base">
              <div className="flex justify-between border-t pt-4">
                <span className="font-medium">Subtotal</span>
                <span>{total.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} USD</span>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
