import Link from "next/link";
import { DISHES } from "@/app/lib/dishes";

export default function Home() {
  const featured = DISHES.slice(0, 3);

  return (
    <div className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Authentic Ethiopian cuisine</p>
          <h1>Freshly made, richly spiced, and deeply comforting.</h1>
          <p className="subtitle">
            Addis Eats brings you vibrant family recipes, warm hospitality, and a menu filled with unforgettable flavors.
          </p>
          <div className="action-row">
            <Link href="/menu" className="primary-btn">Explore Menu</Link>
            <Link href="/checkout" className="secondary-btn">View Basket</Link>
          </div>
          <ul className="feature-list">
            <li>Freshly baked injera</li>
            <li>Slow-cooked Ethiopian stews</li>
            <li>Traditional coffee service</li>
          </ul>
        </div>

        <div className="hero-card">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
            alt="Ethiopian dishes"
          />
          <div className="mini-badge">Chef’s special</div>
        </div>
      </section>

      <section className="spotlight">
        <div className="section-header">
          <p className="eyebrow">Best sellers</p>
          <h2>Our most-loved plates</h2>
        </div>

        <div className="dish-grid">
          {featured.map((dish) => (
            <article key={dish.id} className="dish-card home-card">
              <img src={dish.image} alt={dish.name} />
              <div className="card-body">
                <div className="card-head">
                  <h3>{dish.name}</h3>
                  <span>{dish.price} ETB</span>
                </div>
                <p>{dish.description}</p>
                <Link href={`/menu/${dish.id}`} className="text-link">See details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
