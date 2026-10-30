"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setItems(saved);
      }
    } catch {
      setItems([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  function addToCart(dish) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);

      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: Number(item.quantity || 0) + 1 } : item
        );
      }

      return [...prev, { ...dish, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Number(item.quantity || 1) - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0) * Number(item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}