import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoStar, IoTimeOutline, IoPeopleOutline, IoAddCircle, IoRemoveCircle, IoCheckmarkCircle } from 'react-icons/io5';
import { HiOutlineHeart, HiHeart, HiShare } from 'react-icons/hi2';
import { MdOutlineLocalFireDepartment } from 'react-icons/md';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { dishes, spiceLevels } from '../data/mockData';
import './DishDetail.css';

export default function DishDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const dish = useMemo(() => dishes.find((d) => d.id === Number(id)), [id]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState('traditional');
  const [selectedInjera, setSelectedInjera] = useState(0);
  const [liked, setLiked] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!dish) {
    return (
      <div className="dish-detail-page">
        <Header title="Dish Detail" showBack />
        <div className="dish-not-found">
          <p>Dish not found</p>
        </div>
      </div>
    );
  }

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    addItem(dish, quantity, selectedSpice, dish.ingredients.base.items[selectedInjera]?.name);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const totalPrice = dish.price * quantity;

  return (
    <div className="dish-detail-page">
      <Header title="Dish Detail" showBack />

      {/* Hero Image */}
      <div className="dish-detail-hero">
        <img src={dish.image} alt={dish.name} className="dish-detail-hero-img" />
        <div className="dish-detail-hero-overlay" />
        {dish.badge && (
          <div className="dish-detail-badge" style={{ background: dish.badgeColor }}>
            <span className="badge-label">{dish.badge}</span>
          </div>
        )}
        {dish.tags && (
          <div className="dish-detail-tags-row">
            {dish.tags.map((tag) => (
              <span key={tag} className="dish-detail-tag">{tag}</span>
            ))}
          </div>
        )}
        <div className="dish-detail-hero-actions">
          <button className="hero-action-btn" onClick={() => setLiked(!liked)}>
            {liked ? <HiHeart size={20} color="#D4380D" /> : <HiOutlineHeart size={20} color="#fff" />}
          </button>
          <button className="hero-action-btn">
            <HiShare size={20} color="#fff" />
          </button>
        </div>
        <div className="dish-detail-price-badge">
          <span className="price-label">ETB {dish.price.toLocaleString()}</span>
          {dish.originalPrice && (
            <span className="price-original">ETB {dish.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="dish-detail-content">
        <div className="dish-detail-header">
          <div>
            <h1 className="dish-detail-name">{dish.name}</h1>
            <span className="dish-detail-amharic">{dish.nameAmharic}</span>
          </div>
          <div className="dish-detail-rating-wrap">
            <IoStar size={16} color="#F5A623" />
            <span className="dish-detail-rating">{dish.rating}</span>
            <span className="dish-detail-reviews">({dish.reviews})</span>
          </div>
        </div>

        <div className="dish-detail-meta">
          <div className="meta-item">
            <IoTimeOutline size={16} />
            <span>{dish.prepTime}</span>
          </div>
          <div className="meta-item">
            <IoPeopleOutline size={16} />
            <span>Serves {dish.serves}</span>
          </div>
        </div>

        <p className="dish-detail-desc">{dish.description}</p>

        {/* Spice Level */}
        <div className="detail-section">
          <h3 className="detail-section-title">
            <MdOutlineLocalFireDepartment size={18} className="section-fire-icon" />
            Heat & Spice Level
          </h3>
          <div className="spice-options">
            {spiceLevels.map((spice) => (
              <button
                key={spice.id}
                className={`spice-option ${selectedSpice === spice.id ? 'active' : ''}`}
                onClick={() => setSelectedSpice(spice.id)}
              >
                <span className="spice-emoji">{spice.emoji}</span>
                <span className="spice-label">{spice.label}</span>
                {spice.popular && <span className="spice-popular">★ POPULAR</span>}
                {selectedSpice === spice.id && (
                  <IoCheckmarkCircle size={18} className="spice-check" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Injera Base */}
        <div className="detail-section">
          <h3 className="detail-section-title">Traditional Injera Base</h3>
          <div className="injera-options">
            {dish.ingredients.base.items.map((item, idx) => (
              <button
                key={idx}
                className={`injera-option ${selectedInjera === idx ? 'active' : ''}`}
                onClick={() => setSelectedInjera(idx)}
              >
                <span className="injera-icon">{item.icon}</span>
                <span className="injera-name">{item.name}</span>
                {selectedInjera === idx && (
                  <IoCheckmarkCircle size={18} className="injera-check" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Teff & Barley Blend info */}
        <div className="detail-section">
          <div className="blend-info">
            <span className="blend-icon">🌾</span>
            <span className="blend-text">Standard Teff & Barley Blend</span>
          </div>
        </div>

        {/* Side Accents */}
        <div className="detail-section">
          <h3 className="detail-section-title">Side Accents</h3>
          <div className="accents-list">
            {dish.ingredients.sideAccents.map((accent, idx) => (
              <div key={idx} className="accent-item">
                <IoCheckmarkCircle size={16} color="#389E0D" />
                <span>{accent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extras */}
        {dish.ingredients.extras && dish.ingredients.extras.length > 0 && (
          <div className="detail-section">
            <h3 className="detail-section-title">Extra Enhancements</h3>
            <div className="extras-list">
              {dish.ingredients.extras.map((extra, idx) => (
                <button
                  key={idx}
                  className={`extra-item ${selectedExtras.includes(extra) ? 'active' : ''}`}
                  onClick={() => toggleExtra(extra)}
                >
                  <span>{extra}</span>
                  {selectedExtras.includes(extra) ? (
                    <IoCheckmarkCircle size={18} color="#D4380D" />
                  ) : (
                    <IoAddCircle size={18} color="#ccc" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Traditional Pairings */}
        {dish.pairings && dish.pairings.length > 0 && (
          <div className="detail-section">
            <h3 className="detail-section-title">Traditional Pairings</h3>
            <div className="pairings-list">
              {dish.pairings.map((pairing, idx) => (
                <div key={idx} className="pairing-item">
                  <span className="pairing-icon">🍯</span>
                  <span className="pairing-name">{pairing.name}</span>
                  <span className="pairing-type">{pairing.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="dish-detail-bottom-bar">
        <div className="quantity-control">
          <button
            className="qty-btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <IoRemoveCircle size={28} />
          </button>
          <span className="qty-value">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <IoAddCircle size={28} />
          </button>
        </div>
        <button
          className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {addedToCart ? (
            <>
              <IoCheckmarkCircle size={20} />
              Added!
            </>
          ) : (
            <>Add to Basket · ETB {totalPrice.toLocaleString()}</>
          )}
        </button>
      </div>
    </div>
  );
}
