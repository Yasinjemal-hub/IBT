// app/api/orders/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  // 1. AUTH CHECK: Refuse signed-out users
  const sessionToken = cookies().get("session_id");
  if (!sessionToken || !sessionToken.value) {
    return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
  }

  const body = await request.json();

  // 2. OWNERSHIP CHECK: Ensure body.userId matches the authenticated session
  if (body.userId !== sessionToken.value) {
    return NextResponse.json({ error: "Forbidden. Invalid record ownership." }, { status: 403 });
  }

  // Process order...
  return NextResponse.json({ success: true, orderId: "ORD-" + Date.now() });
}