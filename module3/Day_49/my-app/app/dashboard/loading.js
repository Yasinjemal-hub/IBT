export default function DashboardLoading() {
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ height: "200px", backgroundColor: "#eee", borderRadius: "8px", marginBottom: "24px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ height: "40px", backgroundColor: "#eee", borderRadius: "4px" }} />
        ))}
      </div>
    </div>
  );
}