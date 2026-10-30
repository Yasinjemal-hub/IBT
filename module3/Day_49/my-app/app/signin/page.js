"use client";

import { signInAction } from "@/app/actions/authActions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/menu";
  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#ffffff", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", color: "#111", margin: "0 0 8px 0" }}>Welcome Back 🇪🇹</h1>
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>Sign in to complete your Addis Eats order</p>
        </div>

        <div style={{ display: "flex", background: "#eee", padding: "4px", borderRadius: "8px", marginBottom: "24px" }}>
          <button style={{ flex: 1, padding: "8px", border: "none", background: "#fff", borderRadius: "6px", fontWeight: "bold" }}>Sign In</button>
          <Link href="/register" style={{ flex: 1, padding: "8px", textAlign: "center", color: "#666", textDecoration: "none" }}>Register</Link>
        </div>

        {state?.error && (
          <div style={{ padding: "12px", background: "#ffebee", color: "#c62828", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <input type="hidden" name="next" value={next} />

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>Email</label>
            <input type="email" name="email" defaultValue="user@addiseats.com" required style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>Password</label>
            <input type="password" name="password" defaultValue="123456" required style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} />
          </div>

          <button type="submit" disabled={isPending} style={{ width: "100%", padding: "12px", background: "#d32f2f", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Don't have an account? <Link href="/register" style={{ color: "#d32f2f", fontWeight: "bold" }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "85vh", display: "grid", placeItems: "center" }}>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}