import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__icon" aria-hidden="true">
        🍛
      </div>
      <h1 className="home__title">Welcome to Addis Eats</h1>
      <p className="home__text">
        Your restaurant delivery analytics dashboard for Addis Ababa. Track
        revenue by neighbourhood, monitor daily orders, and manage all
        deliveries.
      </p>
      <div className="home__actions">
        <Link href="/dashboard" className="home__btn home__btn--primary">
          📊 View Dashboard
        </Link>
        <Link href="/orders" className="home__btn home__btn--secondary">
          📋 View Orders
        </Link>
      </div>
    </div>
  );
}
