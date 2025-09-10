"use client";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/components/Toast";

type Img = { url?: string; alt?: string };

export default function AddToCartButton({
  id,
  title,
  price,
  image,
  className = "",
  openCartOnAdd = false,
}: {
  id: string;
  title: string;
  price: number;
  image?: Img;
  className?: string;
  openCartOnAdd?: boolean;
}) {
  const { addItem, toggleCart } = useCart();
  const toast = useToast();

  return (
    <button
      type="button"
      className={`px-6 py-3 rounded-md text-black bg-brand-button hover:bg-brand-button-hover cursor-pointer ${className}`}
      onClick={() => {
        addItem({ id, title, price, image }, 1);
        toast({
          title: "Added to cart",
          description: `${title} was successfully added.`,
          variant: "success",
          duration: 2500,
        });
        if (openCartOnAdd) toggleCart();
      }}
    >
      Add to cart
    </button>
  );
}