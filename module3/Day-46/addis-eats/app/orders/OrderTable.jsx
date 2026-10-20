"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Formats a number as Ethiopian Birr.
 */
function formatETB(amount) {
  return `ETB ${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Returns the status CSS class name.
 */
function getStatusClass(status) {
  const s = status.toLowerCase();
  if (s === "delivered") return "status status--delivered";
  if (s === "pending") return "status status--pending";
  if (s === "cancelled") return "status status--cancelled";
  return "status";
}

/**
 * Builds a URL preserving existing search params but overriding specified ones.
 */
function buildUrl(currentParams, overrides) {
  const params = new URLSearchParams(currentParams.toString());
  for (const [key, value] of Object.entries(overrides)) {
    params.set(key, value);
  }
  return `/orders?${params.toString()}`;
}

/**
 * Column definitions for the order table.
 */
const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "customer", label: "Customer" },
  { key: "neighbourhood", label: "Neighbourhood" },
  { key: "total", label: "Total (ETB)" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

/**
 * OrderTable — Client component with semantic HTML table.
 * Supports sortable column headers and pagination via URL search params.
 */
export default function OrderTable({
  orders,
  sortField,
  sortOrder,
  currentPage,
  totalPages,
  totalOrders,
}) {
  const searchParams = useSearchParams();

  /**
   * Get the sort link URL for a column header.
   * Clicking the already-sorted column toggles the direction.
   */
  function getSortUrl(field) {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    return buildUrl(searchParams, { sort: field, order: newOrder, page: "1" });
  }

  /**
   * Get the sort indicator arrow for a column header.
   */
  function getSortIndicator(field) {
    if (sortField !== field) return "";
    return sortOrder === "asc" ? " ▲" : " ▼";
  }

  return (
    <>
      <div className="order-table-container" role="region" aria-label="Orders table" tabIndex={0}>
        <table className="order-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} scope="col">
                  <Link
                    href={getSortUrl(col.key)}
                    aria-label={`Sort by ${col.label} ${
                      sortField === col.key && sortOrder === "asc"
                        ? "descending"
                        : "ascending"
                    }`}
                  >
                    {col.label}
                    <span className="sort-indicator" aria-hidden="true">
                      {getSortIndicator(col.key)}
                    </span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.neighbourhood}</td>
                <td>{formatETB(order.total)}</td>
                <td>{order.date}</td>
                <td>
                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Orders pagination">
          <Link
            href={buildUrl(searchParams, { page: String(Math.max(1, currentPage - 1)) })}
            className={`pagination__btn ${currentPage <= 1 ? "pagination__btn--disabled" : ""}`}
            aria-disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            ← Prev
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <Link
              key={pg}
              href={buildUrl(searchParams, { page: String(pg) })}
              className={`pagination__btn ${pg === currentPage ? "pagination__btn--active" : ""}`}
              aria-label={`Page ${pg}`}
              aria-current={pg === currentPage ? "page" : undefined}
            >
              {pg}
            </Link>
          ))}

          <Link
            href={buildUrl(searchParams, { page: String(Math.min(totalPages, currentPage + 1)) })}
            className={`pagination__btn ${currentPage >= totalPages ? "pagination__btn--disabled" : ""}`}
            aria-disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            Next →
          </Link>

          <span className="pagination__info">
            Showing {(currentPage - 1) * 5 + 1}–
            {Math.min(currentPage * 5, totalOrders)} of {totalOrders}
          </span>
        </nav>
      )}
    </>
  );
}
