// app/checkout/page.js
import { cookies } from "next/headers"; // Reading cookies forces Next.js to make this route Dynamic!

export default async function CheckoutPage() {
  const session = await cookies().get("session"); // Varied per user request
  return <h1>Checkout for user: {session?.value}</h1>;
}