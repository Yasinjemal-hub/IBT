"use client";

import { registerAction } from "@/app/actions/authActions";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#ffffff", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", color: "#111", margin: "0 0 8px 0" }}>Create Account</h1>
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>Join Addis Eats to order online</p>
        </div>

        {state?.error && (
          <div style={{ padding: "12px", background: "#ffebee", color: "#c62828", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>Full Name</label>
            <input type="text" name="name" placeholder="Abebe Bikila" required style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>Email</label>
            <input type="email" name="email" placeholder="abebe@example.com" required style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>Password</label>
            <input type="password" name="password" placeholder="••••••••" required style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <button type="submit" disabled={isPending} style={{ width: "100%", padding: "12px", background: "#1b5e20", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
            {isPending ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Already registered? <Link href="/signin" style={{ color: "#1b5e20", fontWeight: "bold" }}>Sign in here</Link>
        </p>
      </div>
    </div>
  );
}