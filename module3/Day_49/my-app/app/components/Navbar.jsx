// components/Navbar.jsx
import Link from "next/link";
import { getSession } from "@/app/lib/session";
import { signOutAction } from "@/app/actions/authActions";

export default async function Navbar() {
  const user = await getSession();

  return (
    <header style={{ background: "#111", color: "#fff", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link href="/" style={{ color: "#f5a623", fontSize: "20px", fontWeight: "bold", textDecoration: "none" }}>
          Addis Eats 🇪🇹
        </Link>
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link href="/menu" style={{ color: "#eee", textDecoration: "none" }}>Menu</Link>
          <Link href="/track/ORD-101" style={{ color: "#eee", textDecoration: "none" }}>Live Tracker</Link>
          <Link href="/dashboard" style={{ color: "#eee", textDecoration: "none" }}>Dashboard</Link>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user ? (
          <>
            <span style={{ fontSize: "14px", color: "#4caf50" }}>👤 {user.name} ({user.role})</span>
            <form action={signOutAction}>
              <button type="submit" style={{ background: "#333", color: "#fff", border: "1px solid #555", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/signin" style={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}>Sign In</Link>
            <Link href="/register" style={{ background: "#d32f2f", color: "#fff", padding: "6px 14px", borderRadius: "4px", textDecoration: "none", fontSize: "14px" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}