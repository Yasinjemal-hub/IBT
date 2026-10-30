import { getDishById } from "@/app/lib/dishes";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartBtn from "../AddToCartBtn";

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) notFound();

  return (
    <div className="detail-page">
      <Link href="/menu" className="secondary-btn small-btn back-link">
        ← Back to menu
      </Link>

      <div className="detail-layout">
        <img src={dish.image} alt={dish.name} className="detail-image" />

        <div className="detail-content">
          <p className="eyebrow">{dish.category}</p>
          <h1>{dish.name}</h1>
          <div className="detail-meta">
            <span>{dish.spicy} spice</span>
            <span>{dish.price} ETB</span>
          </div>
          <p>{dish.description}</p>
          <AddToCartBtn dish={dish} />
        </div>
      </div>
    </div>
  );
}
