"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";
import Link from "next/link";

type FormValues = {
  email: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const STORAGE_KEY = "checkoutForm";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.round(value * 100) / 100);

const FREE_SHIPPING_THRESHOLD = 100;
const FLAT_SHIPPING_RATE = 10;

export default function CheckoutPage() {
  const { items, total, increase, decrease, remove, clear } = useCart();

  const [values, setValues] = useState<FormValues>({
    email: "",
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [saveInfo, setSaveInfo] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const postalRegex = /^[0-9]{4}$/;

  function validate(field: keyof FormValues, value: string) {
    let error = "";
    switch (field) {
      case "email":
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email address";
        break;
      case "fullName":
        if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "address":
        if (value.length < 5) error = "Address too short";
        break;
      case "city":
        if (!value) error = "City is required";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "postalCode":
        if (!postalRegex.test(value)) error = "Postal code must be 4 digits";
        break;
    }
    return error;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormValues
  ) {
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [field]: value }));

    const errorMsg = validate(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  }

  const isFormValid =
    Object.values(values).every((v) => v !== "") &&
    Object.values(errors).every((e) => e === "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    setIsPlacingOrder(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      const newOrderId = Math.floor(10000 + Math.random() * 90000).toString();
      setOrderId(newOrderId);
      clear();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues((prev) => ({ ...prev, ...parsed }));
      setSaveInfo(true);
    }
  }, []);

  useEffect(() => {
    if (saveInfo) {
      const toSave = {
        email: values.email,
        fullName: values.fullName,
        address: values.address,
        city: values.city,
        country: values.country,
        postalCode: values.postalCode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [values, saveInfo]);

  const shipping = total >= FREE_SHIPPING_THRESHOLD || total === 0 ? 0 : FLAT_SHIPPING_RATE;
  const grandTotal = total + shipping;

  if (orderId) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold font-playfair mb-6">
          🎉 Thank you for your order!
        </h1>
        <p className="mb-4 text-lg">
          Your order <span className="font-mono font-semibold">#{orderId}</span> has been placed successfully.
        </p>
        <p className="text-gray-600 mb-8">
          We’re processing your order and will send you an update when it ships.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-md bg-[#C3C19E] text-white hover:bg-[#b5b38f]"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* --- FORM --- */}
      <section>
        <h1 className="text-3xl font-bold font-playfair mb-8">Checkout</h1>
        <p className="mb-6 font-medium">Please fill out your contact information</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleChange(e, "email")}
              className={`w-full border p-3 rounded-md bg-[#f9f7f2] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isPlacingOrder}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <h2 className="text-2xl font-bold font-playfair mt-10">Shipping Address</h2>

          {(["fullName", "address", "city", "country", "postalCode"] as (keyof FormValues)[]).map(
            (field) => (
              <div key={field}>
                <label className="block mb-2 capitalize">{field}</label>
                <input
                  type="text"
                  value={values[field]}
                  onChange={(e) => handleChange(e, field)}
                  className={`w-full border p-3 rounded-md bg-[#f9f7f2] ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isPlacingOrder}
                />
                {errors[field] && (
                  <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            )
          )}

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              disabled={isPlacingOrder}
            />
            Save my info for next time
          </label>

          <button
            type="submit"
            disabled={!isFormValid || isPlacingOrder}
            className={`mt-6 py-3 px-6 rounded-md transition block mx-auto ${
              isFormValid && !isPlacingOrder
                ? "bg-[#C3C19E] text-white hover:bg-[#b5b38f]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isPlacingOrder ? "Placing order..." : "PLACE ORDER"}
          </button>
        </form>
      </section>

      {/* --- ORDER SUMMARY --- */}
      <section>
        <h2 className="text-2xl font-bold font-playfair mb-6">Order Summary</h2>

        {items === undefined ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded" />
          </div>
        ) : items.length === 0 ? (
          <div className="space-y-4">
            <p>Your cart is empty.</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 rounded-md bg-[#C3C19E] text-white hover:bg-[#b5b38f]"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-white"
                >
                  {item.image?.url && (
                    <div className="relative w-20 h-20 overflow-hidden rounded-md">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt ?? item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold font-playfair text-base md:text-lg">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.qty} × {formatCurrency(item.price)}
                    </p>
                    <p className="text-sm font-medium">
                      {formatCurrency(item.price * item.qty)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={async () => {
                          setLoadingItemId(item.id);
                          await decrease(item.id);
                          setLoadingItemId(null);
                        }}
                        className="h-6 w-6 flex items-center justify-center border rounded disabled:opacity-50"
                        aria-label={`Decrease quantity of ${item.title}`}
                        disabled={loadingItemId === item.id}
                      >
                        –
                      </button>
                      <span className="text-sm">{item.qty}</span>
                      <button
                        onClick={async () => {
                          setLoadingItemId(item.id);
                          await increase(item.id);
                          setLoadingItemId(null);
                        }}
                        className="h-6 w-6 flex items-center justify-center border rounded disabled:opacity-50"
                        aria-label={`Increase quantity of ${item.title}`}
                        disabled={loadingItemId === item.id}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      setLoadingItemId(item.id);
                      await remove(item.id);
                      setLoadingItemId(null);
                    }}
                    className="text-red-500 text-lg font-bold disabled:opacity-50"
                    aria-label={`Remove ${item.title}`}
                    disabled={loadingItemId === item.id}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-2 text-sm sm:text-base">
              <div className="flex justify-between border-t pt-4">
                <span className="font-medium">Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}