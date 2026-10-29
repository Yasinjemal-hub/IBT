"use client";

import { useCart } from "@/app/context/CartContext";

export default function AddToCartBtn({ dish }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(dish)}
      style={{ padding: "8px 12px", background: "#d32f2f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
    >
      Add to Cart
    </button>
  );
}