"use client";

/**
 * Error boundary for the orders route.
 * Displays a user-friendly error message distinct from empty state.
 */
export default function OrdersError({ error, reset }) {
  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Orders</h1>
        <p className="page-header__subtitle">Manage delivery orders</p>
      </header>
      <div className="card">
        <div className="error-state" role="alert">
          <div className="error-state__icon" aria-hidden="true">
            ❌
          </div>
          <h2 className="error-state__title">Failed to Load Orders</h2>
          <p className="error-state__text">
            {error?.message ||
              "Something went wrong while retrieving your orders. This is not the same as having no orders — there was an error communicating with the data source."}
          </p>
          <button onClick={reset} className="error-state__btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    </>
  );
}
