import { getOrders } from "@/lib/data";
import OrderTable from "./OrderTable";

/**
 * Orders page — Server Component.
 * Reads search params for sort field, sort order, and page number.
 * Validates params, sorts/paginates data, and passes results to the client table.
 */

export const metadata = {
  title: "Orders | Addis Eats",
  description: "View and manage all delivery orders",
};

const VALID_SORT_FIELDS = ["id", "customer", "neighbourhood", "total", "date", "status"];
const VALID_SORT_ORDERS = ["asc", "desc"];
const PAGE_SIZE = 5;

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;

  // Parse and validate search params
  let sortField = VALID_SORT_FIELDS.includes(params?.sort) ? params.sort : "id";
  let sortOrder = VALID_SORT_ORDERS.includes(params?.order) ? params.order : "asc";
  let page = parseInt(params?.page, 10);

  let orders;

  try {
    orders = await getOrders();
  } catch (error) {
    throw new Error("Failed to load orders. Please try again later.");
  }

  // Empty state
  if (!orders || orders.length === 0) {
    return (
      <>
        <header className="page-header">
          <h1 className="page-header__title">Orders</h1>
          <p className="page-header__subtitle">Manage delivery orders</p>
        </header>
        <div className="card">
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">📭</div>
            <h2 className="empty-state__title">No orders yet</h2>
            <p className="empty-state__text">
              When customers place orders, they will appear here. Check back later!
            </p>
          </div>
        </div>
      </>
    );
  }

  // Sort the orders
  const sortedOrders = [...orders].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Numeric comparison for total and id
    if (sortField === "total" || sortField === "id") {
      aVal = Number(aVal);
      bVal = Number(bVal);
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }

    // String comparison for everything else
    aVal = String(aVal).toLowerCase();
    bVal = String(bVal).toLowerCase();
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate pagination
  const totalOrders = sortedOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalOrders / PAGE_SIZE));

  // Validate page number — fallback to 1 if invalid
  if (isNaN(page) || page < 1) {
    page = 1;
  } else if (page > totalPages) {
    page = totalPages;
  }

  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Orders</h1>
        <p className="page-header__subtitle">
          {totalOrders} total orders · Page {page} of {totalPages}
        </p>
      </header>

      <div className="card">
        <OrderTable
          orders={paginatedOrders}
          sortField={sortField}
          sortOrder={sortOrder}
          currentPage={page}
          totalPages={totalPages}
          totalOrders={totalOrders}
        />
      </div>
    </>
  );
}
