// app/layout.js
import { CartProvider } from "@/app/context/CartContext";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats | Authentic Ethiopian Restaurant",
  description: "Order fresh Shiro, Kitfo, and Doro Wat online from Addis Eats in Toronto.",
  openGraph: {
    title: "Addis Eats",
    description: "Authentic Ethiopian Cuisine Delivered",
    url: "https://addis-eats.vercel.app",
    siteName: "Addis Eats",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>
        <CartProvider>
          <header style={{ padding: "16px 32px", background: "#111", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ color: "#f5a623", fontSize: "24px", fontWeight: "bold", textDecoration: "none" }}>
              Addis Eats 🇪🇹
            </Link>
            <nav style={{ display: "flex", gap: "20px" }}>
              <Link href="/menu" style={{ color: "#fff", textDecoration: "none" }}>Menu</Link>
              <Link href="/checkout" style={{ color: "#fff", textDecoration: "none" }}>Checkout / Order</Link>
            </nav>
          </header>

          <main style={{ minHeight: "80vh" }}>{children}</main>

          <footer style={{ padding: "20px", textAlign: "center", background: "#f4f4f4", borderTop: "1px solid #ddd" }}>
            <p>© 2026 Addis Eats - Built for IBT College Capstone</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}