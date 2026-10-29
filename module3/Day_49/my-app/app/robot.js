export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/checkout" },
    sitemap: "https://addis-eats.vercel.app/sitemap.xml",
  };
}