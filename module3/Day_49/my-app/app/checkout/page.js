"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { items, total, removeFromCart } = useCart();

  const tax = total * 0.05;
  const grandTotal = total + tax;

  async function handlePlaceOrder() {
    if (!items.length) return;

    const sessionId = `guest-${Date.now()}`;
    document.cookie = `session_id=${sessionId}; path=/; max-age=86400`;

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: sessionId,
        items,
        total: grandTotal,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Unable to place the order right now.");
      return;
    }

    alert(`Order placed successfully! ${data.orderId}`);
  }

  return (
    <div className="page-shell">
      <div className="section-header">
        <p className="eyebrow">Checkout</p>
        <h2>Your order</h2>
      </div>

      {!items.length ? (
        <div className="dish-card" style={{ padding: "32px", maxWidth: "700px" }}>
          <p style={{ margin: 0, color: "#625a57" }}>Your cart is empty. Add a few dishes from the menu to continue.</p>
          <Link href="/menu" className="primary-btn" style={{ marginTop: "18px" }}>Browse menu</Link>
        </div>
      ) : (
        <div className="detail-layout" style={{ alignItems: "flex-start" }}>
          <div className="dish-card" style={{ padding: "20px" }}>
            {items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: "14px", padding: "12px 0", borderBottom: "1px solid #eadac7" }}>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ color: "#625a57", marginTop: "4px" }}>
                    Qty: {item.quantity} • {item.price} ETB each
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span>{item.quantity * item.price} ETB</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="secondary-btn small-btn"
                    style={{ padding: "0.45rem 0.8rem" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="dish-card" style={{ padding: "24px" }}>
            <h3 style={{ marginTop: 0 }}>Summary</h3>
            <div style={{ display: "grid", gap: "10px", color: "#625a57" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <strong>{total} ETB</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tax</span>
                <strong>{tax.toFixed(2)} ETB</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", color: "#1f1b1a" }}>
                <span>Total</span>
                <strong>{grandTotal.toFixed(2)} ETB</strong>
              </div>
            </div>

            <button className="primary-btn" style={{ width: "100%", marginTop: "20px" }} onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
