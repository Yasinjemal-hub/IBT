/**
 * Loading skeleton for the orders page.
 * Mimics the layout of the actual order table to avoid layout shift.
 */
export default function OrdersLoading() {
  const rows = 5;
  return (
    <>
      <header className="page-header">
        <div
          className="skeleton"
          style={{ width: 120, height: 28, marginBottom: 8 }}
        />
        <div className="skeleton" style={{ width: 200, height: 16 }} />
      </header>

      <div className="card">
        {/* Skeleton table header */}
        <div className="skeleton-header" />

        {/* Skeleton table rows */}
        {Array.from({ length: rows }, (_, i) => (
          <div className="skeleton-row" key={i}>
            <div className="skeleton skeleton-cell skeleton-cell--sm" />
            <div className="skeleton skeleton-cell skeleton-cell--lg" />
            <div className="skeleton skeleton-cell skeleton-cell--md" />
            <div className="skeleton skeleton-cell skeleton-cell--sm" />
            <div className="skeleton skeleton-cell skeleton-cell--md" />
            <div className="skeleton skeleton-cell skeleton-cell--sm" />
          </div>
        ))}

        {/* Skeleton pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            padding: "20px 0",
          }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
