// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("addis_eats_session");
  const { pathname } = request.nextUrl;

  // Protected paths that require authentication
  const isProtectedRoute = pathname.startsWith("/checkout") || pathname.startsWith("/orders");

  if (isProtectedRoute && !session) {
    // Save destination so user returns after sign-in[cite: 112, 125]
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Keep matcher narrow to avoid adding latency to static assets[cite: 113]
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};