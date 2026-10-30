import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_id");

  if (!sessionToken || !sessionToken.value) {
    return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
  }

  const body = await request.json();

  if (body.userId !== sessionToken.value) {
    return NextResponse.json({ error: "Forbidden. Invalid record ownership." }, { status: 403 });
  }

  return NextResponse.json({ success: true, orderId: `ORD-${Date.now()}` });
}