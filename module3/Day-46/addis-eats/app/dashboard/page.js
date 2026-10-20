import {
  getOrders,
  getRevenueByNeighbourhood,
  getOrdersOverTime,
} from "@/lib/data";
import RevenueChart from "./RevenueChart";

/**
 * Dashboard page — Server Component.
 * Aggregates order data and passes only the required summaries
 * to the client chart component.
 */
export const metadata = {
  title: "Dashboard | Addis Eats",
  description: "Revenue and order analytics for Addis Ababa neighbourhoods",
};

export default async function DashboardPage() {
  let orders;

  try {
    orders = await getOrders();
  } catch (error) {
    // Propagate to error.js boundary
    throw new Error("Failed to load order data. Please try again later.");
  }

  // Empty state — no orders available
  if (!orders || orders.length === 0) {
    return (
      <>
        <header className="page-header">
          <h1 className="page-header__title">Dashboard</h1>
          <p className="page-header__subtitle">Revenue & order analytics</p>
        </header>
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            📭
          </div>
          <h2 className="empty-state__title">No orders yet</h2>
          <p className="empty-state__text">
            Once orders start coming in, you will see revenue breakdowns and
            daily order trends here.
          </p>
        </div>
      </>
    );
  }

  // Aggregate data server-side — only summaries are sent to the client
  const revenueData = getRevenueByNeighbourhood(orders);
  const ordersOverTime = getOrdersOverTime(orders);
  const totalRevenue = revenueData.reduce((sum, r) => sum + r.revenue, 0);
  const totalOrders = orders.length;

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Dashboard</h1>
        <p className="page-header__subtitle">
          {totalOrders} orders · ETB{" "}
          {totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
          total revenue
        </p>
      </header>

      <RevenueChart
        revenueData={revenueData}
        ordersOverTime={ordersOverTime}
      />
    </>
  );
}
