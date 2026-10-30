// lib/session.js
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "addis_eats_session";

// 1. Create session cookie with safety flags
export async function createSessionCookie(userData) {
  const sessionData = JSON.stringify({
    id: userData.id,
    email: userData.email,
    name: userData.name,
    role: userData.role || "customer",
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
    httpOnly: true, // Prevents XSS scripts from stealing token
    secure: process.env.NODE_ENV === "production", // Transmitted over HTTPS only[cite: 118]
    sameSite: "lax", // Protects against CSRF attacks[cite: 118]
    maxAge: 60 * 60 * 24 * 7, // 1 week duration[cite: 118]
    path: "/",
  });
}

// 2. Read session helper used across pages and actions[cite: 120]
export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie);
  } catch {
    return null;
  }
}

// 3. Clear cookie on sign-out[cite: 117]
export async function destroySessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}