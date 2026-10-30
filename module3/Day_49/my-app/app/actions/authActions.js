"use server";

import { createSessionCookie, destroySessionCookie, getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

// Sign-In Action
export async function signInAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const nextParam = formData.get("next") || "/menu";

  // Simulate user authentication check[cite: 117]
  if (email === "user@addiseats.com" && password === "123456") {
    await createSessionCookie({
      id: "usr_101",
      email: "user@addiseats.com",
      name: "Abebe Bikila",
      role: "customer",
    });

    // OPEN REDIRECT DEFENSE: Reject absolute URLs (must start with '/')
    const safeNext = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/menu";
    redirect(safeNext);
  }

  return { error: "Invalid email or password." };
}

// Registration Action
export async function registerAction(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || password.length < 6) {
    return { error: "Please fill all fields. Password must be 6+ chars." };
  }

  await createSessionCookie({
    id: `usr_${Date.now()}`,
    email,
    name,
    role: "customer",
  });

  redirect("/menu");
}

// Sign-Out Action
export async function signOutAction() {
  await destroySessionCookie(); //[cite: 117]
  redirect("/signin");
}

// LAYER 3 SECURITY ACTION: Real Authorization & Ownership Check
export async function cancelOrderAction(orderId) {
  const user = await getSession(); // 1. Auth check[cite: 124]
  if (!user) throw new Error("401 Unauthorized: Sign in required.");

  // Simulate fetching order from DB
  const mockOrder = { id: orderId, userId: "usr_101", status: "PENDING" };

  // 2. Authorisation check: Does this user OWN this record?[cite: 124]
  if (mockOrder.userId !== user.id) {
    throw new Error("403 Forbidden: You do not own this order."); //[cite: 124]
  }

  return { success: true, message: `Order ${orderId} canceled.` };
}