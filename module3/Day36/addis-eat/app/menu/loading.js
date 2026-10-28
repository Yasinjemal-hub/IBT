// app/menu/loading.js
export default function MenuLoading() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Loading delicious dishes...</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} style={{ height: "180px", backgroundColor: "#eee", borderRadius: "8px" }} />
        ))}
      </div>
    </div>
  );
}