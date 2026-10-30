// app/orders/page.js
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const user = await getSession();

  // Layer 2 Page Check: Redirect if session missing[cite: 123]
  if (!user) {
    redirect("/signin?next=/orders");
  }

  // SCOPED QUERY: Fetch orders using user.id ONLY (never read an ID from searchParams)[cite: 123]
  const userOrders = [
    { id: "ORD-991", dish: "Shiro Tegabino", total: 180, status: "Delivered" },
    { id: "ORD-992", dish: "Special Kitfo", total: 350, status: "Preparing" },
  ];

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Orders, {user.name}</h1>
      <p style={{ color: "#666" }}>Logged in as: {user.email}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
        {userOrders.map((order) => (
          <div key={order.id} style={{ border: "1px solid #eee", padding: "16px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3>{order.dish}</h3>
              <p style={{ margin: 0, color: "#888" }}>Order ID: {order.id}</p>
            </div>
            <div>
              <span style={{ padding: "4px 8px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "4px", marginRight: "12px" }}>{order.status}</span>
              <strong>{order.total} ETB</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}