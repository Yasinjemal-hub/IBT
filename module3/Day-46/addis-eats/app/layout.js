import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Addis Eats Dashboard",
  description:
    "Restaurant delivery analytics dashboard for Addis Ababa neighbourhoods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <Link href="/" className="nav__brand">
            <span className="nav__brand-icon" aria-hidden="true">
              🍛
            </span>
            Addis Eats
          </Link>
          <ul className="nav__links">
            <li>
              <Link href="/dashboard" className="nav__link">
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link href="/orders" className="nav__link">
                📋 Orders
              </Link>
            </li>
          </ul>
        </nav>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
