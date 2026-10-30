// app/dashboard/page.js

import RevenueChart from "./RevenueChart";
import OrderTable from "./OrderTable";
import EmptyState from "./EmptyState";

// Mock raw dataset placed outside component
const ALL_ORDERS = [
  { id: "ORD-801", customer: "Abebe B.", area: "Bole", total: 450, date: "2026-06-10T12:00:00Z" },
  { id: "ORD-802", customer: "Sara T.", area: "Kazanchis", total: 180, date: "2026-06-11T14:30:00Z" },
  { id: "ORD-803", customer: "Dawit M.", area: "Megenagna", total: 820, date: "2026-06-11T16:00:00Z" },
  { id: "ORD-804", customer: "Tigist A.", area: "Bole", total: 350, date: "2026-06-12T18:15:00Z" },
];

export default async function DashboardPage({ searchParams }) {
  // 1. Unwrap searchParams Promise (Next.js 15 requirement)
  const resolvedParams = await searchParams;

  // 2. Read query parameters with fallbacks
  const sort = resolvedParams?.sort || "id";
  const dir = resolvedParams?.dir || "asc";
  const page = Number(resolvedParams?.page || 1);
  const pageSize = 2; // Fixed: Defined pageSize

  // 3. Handle empty state[cite: 143]
  if (!ALL_ORDERS.length) return <EmptyState />;

  // 4. Server Aggregation: Calculate revenue by area for Recharts
  const areas = ["Bole", "Kazanchis", "Megenagna"];
  const revenueByArea = areas.map((area) => ({
    area,
    revenue: ALL_ORDERS.filter((o) => o.area === area).reduce((sum, o) => sum + o.total, 0),
  }));

  // 5. Server-side Sorting[cite: 138]
  const sortedOrders = [...ALL_ORDERS].sort((a, b) => {
    let valA = a[sort];
    let valB = b[sort];
    if (typeof valA === "string") {
      return dir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return dir === "asc" ? valA - valB : valB - valA;
  });

  // 6. Server-side Pagination[cite: 142]
  const totalPages = Math.ceil(sortedOrders.length / pageSize);
  const pagedOrders = sortedOrders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: "32px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Addis Eats Business Dashboard</h1>
        <form action={async () => {
          "use server";
          // Server CSV Export handler
        }}>
          <button type="submit" style={{ padding: "8px 16px", background: "#1b5e20", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            📥 Export CSV
          </button>
        </form>
      </div>

      {/* Revenue Chart Section */}
      <section style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", marginBottom: "32px" }}>
        <h2>Revenue by Neighborhood (ETB)</h2>
        <RevenueChart data={revenueByArea} />
      </section>

      {/* Order Table Section */}
      <section style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px" }}>
        <h2>Order Records</h2>
        <OrderTable
          orders={pagedOrders}
          currentSort={sort}
          currentDir={dir}
          currentPage={page}
          totalPages={totalPages}
        />
      </section>
    </div>
  );
}