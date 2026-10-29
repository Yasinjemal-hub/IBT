// app/menu/layout.js
import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px 32px" }}>
      {/* Persistent Sidebar - Stays mounted across navigation! */}
      <aside style={{ width: "220px", borderRight: "1px solid #eee", paddingRight: "20px" }}>
        <h3>Categories</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "12px 0" }}><Link href="/menu">All Items</Link></li>
          <li style={{ margin: "12px 0" }}><Link href="/menu?cat=Vegan">Vegan Favorites</Link></li>
          <li style={{ margin: "12px 0" }}><Link href="/menu?cat=Meat">Meat Specialties</Link></li>
        </ul>
      </aside>

      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}