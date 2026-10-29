// app/menu/page.js
import { getDishes } from "@/app/lib/dishes";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";

// Strategy: Incremental Static Regeneration (re-evaluates every hour)

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <div>
      <h1>Our Restaurant Menu</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {dishes.map((dish) => (
          <div key={dish.id} style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "16px" }}>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p><strong>{dish.price} ETB</strong></p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link href={`/menu/${dish.id}`} style={{ padding: "8px 12px", background: "#eee", borderRadius: "4px", textDecoration: "none" }}>
                Details
              </Link>
              <AddToCartBtn dish={dish} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}