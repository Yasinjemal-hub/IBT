import { Link } from 'react-router-dom';
import { IoStar, IoTimeOutline } from 'react-icons/io5';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2';
import { useState } from 'react';
import './DishCard.css';

export default function DishCard({ dish, variant = 'default' }) {
  const [liked, setLiked] = useState(false);

  if (variant === 'highlight') {
    return (
      <Link to={`/dish/${dish.id}`} className="dish-card-highlight">
        <div className="dish-highlight-img-wrap">
          <img src={dish.image} alt={dish.name} className="dish-highlight-img" />
          {dish.badge && (
            <span className="dish-badge" style={{ background: dish.badgeColor }}>
              {dish.badge}
            </span>
          )}
          <button
            className="dish-like-btn"
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          >
            {liked ? <HiHeart size={18} color="#D4380D" /> : <HiOutlineHeart size={18} />}
          </button>
        </div>
        <div className="dish-highlight-info">
          <h3 className="dish-highlight-name">{dish.name}</h3>
          <p className="dish-highlight-desc">{dish.description?.slice(0, 80)}…</p>
          <div className="dish-highlight-meta">
            <div className="dish-rating">
              <IoStar size={14} color="#F5A623" />
              <span>{dish.rating}</span>
              <span className="rating-count">({dish.reviews})</span>
            </div>
            <div className="dish-price-tag">
              ETB {dish.price.toLocaleString()}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/dish/${dish.id}`} className="dish-card">
      <div className="dish-card-img-wrap">
        <img src={dish.image} alt={dish.name} className="dish-card-img" />
        {dish.badge && (
          <span className="dish-badge" style={{ background: dish.badgeColor }}>
            {dish.badge}
          </span>
        )}
        <button
          className="dish-like-btn"
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
        >
          {liked ? <HiHeart size={16} color="#D4380D" /> : <HiOutlineHeart size={16} />}
        </button>
      </div>
      <div className="dish-card-info">
        <div className="dish-card-top-row">
          <h3 className="dish-card-name">{dish.name}</h3>
          <span className="dish-card-amharic">{dish.nameAmharic}</span>
        </div>
        <div className="dish-card-rating">
          <IoStar size={12} color="#F5A623" />
          <span>{dish.rating}</span>
          <span className="rating-dot">•</span>
          <IoTimeOutline size={12} />
          <span>{dish.prepTime}</span>
        </div>
        <div className="dish-card-bottom">
          <span className="dish-card-price">
            ETB {dish.price.toLocaleString()}
            {dish.originalPrice && (
              <span className="dish-original-price">ETB {dish.originalPrice.toLocaleString()}</span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
