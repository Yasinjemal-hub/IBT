import { getDishes } from "@/app/lib/dishes";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <div className="menu-page">
      <div className="menu-header">
        <p className="eyebrow">Restaurant menu</p>
        <h1>Our signature dishes</h1>
      </div>

      <div className="dish-grid">
        {dishes.map((dish) => (
          <article key={dish.id} className="dish-card">
            <img src={dish.image} alt={dish.name} />
            <div className="card-body">
              <div className="card-head">
                <div>
                  <h3>{dish.name}</h3>
                  <span className="category-tag">{dish.category}</span>
                </div>
                <strong>{dish.price} ETB</strong>
              </div>

              <p>{dish.description}</p>

              <div className="card-actions">
                <Link href={`/menu/${dish.id}`} className="secondary-btn small-btn">Details</Link>
                <AddToCartBtn dish={dish} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}