// app/menu/layout.js
import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "80vh", gap: "20px" }}>
      {/* Persistent Category Sidebar */}
      <aside style={{ width: "200px", padding: "20px", borderRight: "2px solid #eee" }}>
        <h3>Categories</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0" }}><Link href="/menu">All Dishes</Link></li>
          <li style={{ margin: "10px 0" }}><Link href="/menu?category=Vegan">Vegan</Link></li>
          <li style={{ margin: "10px 0" }}><Link href="/menu?category=Meat">Meat</Link></li>
        </ul>
      </aside>

      {/* Main Content Area where page.js and loading.js render */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}