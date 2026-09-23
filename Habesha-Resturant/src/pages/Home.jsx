import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward, IoFlame } from 'react-icons/io5';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdDeliveryDining } from 'react-icons/md';
import Header from '../components/Header';
import DishCard from '../components/DishCard';
import BottomNav from '../components/BottomNav';
import { dishes, categories } from '../data/mockData';
import mesobFeastImg from '../assets/images/mesob_feast.png';
import royalPlatterImg from '../assets/images/royal_platter.png';
import './Home.css';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDishes = useMemo(() => {
    if (activeCategory === 'all') return dishes;
    return dishes.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  const todayHighlight = dishes.find((d) => d.id === 1); // Royal Doro Wat

  return (
    <div className="home-page">
      <Header />

      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="promo-content">
          <span className="promo-tag">YOUR FIRST TIME</span>
          <span className="promo-offer">FREE DELIVERY ON 1ST ORDER</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge-row">
          <span className="hero-special-badge">✦ SPECIAL SELECTION</span>
          <span className="hero-order-badge">ORDER BY +1</span>
        </div>
        <h1 className="hero-title">
          Communal Warmth,<br />
          Slow-Cooked Heritage
        </h1>
        <p className="hero-subtitle">
          Handcrafted with legacy spices, organic injera, locally butchered meats, and
          seasonal vegetables
        </p>
        <div className="hero-tags">
          <span className="hero-tag">🌿 Organic Injera</span>
          <span className="hero-tag">🔥 Heritage Spices</span>
          <span className="hero-tag">🥩 Local Meats</span>
        </div>
      </section>

      {/* Grand Mesob Feast */}
      <section className="feast-section">
        <div className="feast-card">
          <div className="feast-img-wrap">
            <img src={mesobFeastImg} alt="The Grand Mesob Feast" className="feast-img" />
            <div className="feast-overlay" />
          </div>
          <div className="feast-info">
            <span className="feast-icon">🍽️</span>
            <h2 className="feast-title">The Grand Mesob<br />Feast</h2>
            <p className="feast-desc">
              A royal communal spread featuring premium cuts, heritage spices, organic injera, and seasonal vegetables
            </p>
          </div>
        </div>
      </section>

      {/* Royal Food Platter */}
      <section className="platter-section">
        <Link to="/dish/5" className="platter-card">
          <div className="platter-img-wrap">
            <img src={royalPlatterImg} alt="Royal Food Platter" className="platter-img" />
          </div>
          <div className="platter-info">
            <h3 className="platter-name">Royal Food Platter</h3>
            <p className="platter-desc">
              A majestic platter featuring our finest selections elegantly arranged on a grand injera base
            </p>
            <div className="platter-footer">
              <span className="platter-price">ETB 1,200</span>
              <span className="platter-reserve">🪑 Reserve for Table</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2 className="section-title">Curated Categories</h2>
          <button className="filter-btn">
            <HiOutlineAdjustmentsHorizontal size={18} />
          </button>
        </div>
        <div className="category-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Today's Kitchen Highlight */}
      {todayHighlight && (
        <section className="highlight-section">
          <div className="section-header">
            <h2 className="section-title">
              <IoFlame size={18} className="section-icon" /> Today's Kitchen Highlight
            </h2>
            <Link to="/dish/1" className="see-all-link">
              See All <IoChevronForward size={14} />
            </Link>
          </div>
          <DishCard dish={todayHighlight} variant="highlight" />
        </section>
      )}

      {/* Menu Grid */}
      <section className="menu-section">
        <div className="dish-list">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* Spirit of Gursha */}
      <section className="gursha-section">
        <div className="gursha-card">
          <div className="gursha-icon">🤲</div>
          <h3 className="gursha-title">The Spirit of Gursha</h3>
          <p className="gursha-desc">
            In Ethiopian tradition, feeding someone by hand — <em>gursha</em> — is the highest form of love and respect.
          </p>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="delivery-banner">
        <MdDeliveryDining size={28} />
        <div>
          <strong>Free delivery</strong> on orders above ETB 500
        </div>
      </section>

      <div className="bottom-spacer" />
      <BottomNav />
    </div>
  );
}
