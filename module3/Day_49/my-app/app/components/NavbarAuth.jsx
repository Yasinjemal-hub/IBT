// components/NavbarAuth.jsx
import { getSession } from "@/app/lib/session";
import { signOutAction } from "@/app/actions/authActions";
import Link from "next/link";

export default async function NavbarAuth() {
  const user = await getSession();

  if (!user) {
    return (
      <div style={{ display: "flex", gap: "12px" }}>
        <Link href="/signin" style={{ color: "#fff", textDecoration: "none" }}>Sign In</Link>
        <Link href="/register" style={{ background: "#d32f2f", color: "#fff", padding: "6px 12px", borderRadius: "4px", textDecoration: "none" }}>Register</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <span style={{ color: "#fff", fontSize: "14px" }}>👤 {user.name}</span>
      <form action={signOutAction}>
        <button type="submit" style={{ background: "transparent", border: "1px solid #666", color: "#fff", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}>
          Sign Out
        </button>
      </form>
    </div>
  );
}