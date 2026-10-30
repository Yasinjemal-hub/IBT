import Link from "next/link";

export default function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", background: "#f9f9f9", borderRadius: "8px", border: "1px dashed #ccc" }}>
      <h3 style={{ margin: "0 0 8px 0" }}>No orders found</h3>
      <p style={{ color: "#666", marginBottom: "16px" }}>There are no restaurant orders matching your current query.</p>
      <Link href="/menu" style={{ padding: "10px 18px", background: "#d32f2f", color: "#fff", textDecoration: "none", borderRadius: "6px", fontWeight: "bold" }}>
        Browse Menu & Place Order
      </Link>
    </div>
  );
}