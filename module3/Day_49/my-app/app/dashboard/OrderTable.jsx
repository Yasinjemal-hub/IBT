import Link from "next/link";
import { etb, addisTime } from "@/app/lib/format";

export default function OrderTable({ orders, currentSort, currentDir, currentPage, totalPages }) {
  const getSortLink = (field) => {
    const nextDir = currentSort === field && currentDir === "asc" ? "desc" : "asc";
    return `/dashboard?sort=${field}&dir=${nextDir}&page=1`;
  };

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
        <caption style={{ textAlign: "left", fontWeight: "bold", paddingBottom: "8px" }}>
          Recent Restaurant Orders (Sorted by {currentSort})
        </caption>
        <thead>
          <tr style={{ background: "#f4f4f4", borderBottom: "2px solid #ccc" }}>
            <th scope="col" style={{ padding: "10px", textAlign: "left" }}>
              <Link href={getSortLink("id")} style={{ color: "#111" }}>Order ID ⇕</Link>
            </th>
            <th scope="col" style={{ padding: "10px", textAlign: "left" }}>
              <Link href={getSortLink("customer")} style={{ color: "#111" }}>Customer ⇕</Link>
            </th>
            <th scope="col" style={{ padding: "10px", textAlign: "left" }}>Area</th>
            <th scope="col" style={{ padding: "10px", textAlign: "left" }}>Date & Time</th>
            <th scope="col" style={{ padding: "10px", textAlign: "right" }}>
              <Link href={getSortLink("total")} style={{ color: "#111" }}>Total (ETB) ⇕</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px", textAlign: "left" }}>{o.id}</td>
              <td style={{ padding: "10px", textAlign: "left" }}>{o.customer}</td>
              <td style={{ padding: "10px", textAlign: "left" }}>{o.area}</td>
              <td style={{ padding: "10px", textAlign: "left" }}>{addisTime.format(new Date(o.date))}</td>
              {/* Right-align numeric/monetary columns[cite: 153] */}
              <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>{etb.format(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* URL-based Pager using Link components[cite: 157, 158] */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
        <span>Page {currentPage} of {totalPages}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {currentPage > 1 && (
            <Link href={`/dashboard?page=${currentPage - 1}&sort=${currentSort}&dir=${currentDir}`} style={{ padding: "6px 12px", border: "1px solid #ccc", textDecoration: "none", color: "#111", borderRadius: "4px" }}>
              ← Previous
            </Link>
          )}
          {currentPage < totalPages && (
            <Link href={`/dashboard?page=${currentPage + 1}&sort=${currentSort}&dir=${currentDir}`} style={{ padding: "6px 12px", border: "1px solid #ccc", textDecoration: "none", color: "#111", borderRadius: "4px" }}>
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}