// app/menu/[id]/page.js
import { DISHES, getDishById } from "@/app/lib/dishes";
import { notFound } from "next/navigation";

// Pre-builds dynamic dish pages at build time
export async function generateStaticParams() {
  return DISHES.map((dish) => ({ id: dish.id }));
}

export default async function DishDetailPage({ params }) {
  const dish = await getDishById(params.id);

  if (!dish) notFound();

  return (
    <div style={{ maxWidth: "600px" }}>
      <h1>{dish.name}</h1>
      <span style={{ background: "#f0f0f0", padding: "4px 8px", borderRadius: "4px" }}>{dish.category}</span>
      <p style={{ fontSize: "1.2rem", marginTop: "16px" }}>{dish.description}</p>
      <h2>Price: {dish.price} ETB</h2>
    </div>
  );
}