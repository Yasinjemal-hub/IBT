import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoAddCircle, IoRemoveCircle, IoCheckmarkCircle, IoClose, IoChevronForward, IoInformationCircleOutline } from 'react-icons/io5';
import { MdRestaurant, MdOutlineLocalOffer } from 'react-icons/md';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { diningEtiquette, promoCodes } from '../data/mockData';
import './Basket.css';

export default function Basket() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    deliveryFee,
    promoDiscount,
    grandTotal,
    promo,
    removeItem,
    updateQuantity,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    const code = promoInput.toUpperCase().trim();
    if (promoCodes[code]) {
      applyPromo({ code, ...promoCodes[code] });
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="basket-page">
        <Header title="Your Gursha Basket" showBack />
        <div className="basket-empty">
          <div className="basket-empty-icon">🧺</div>
          <h2>Your basket is empty</h2>
          <p>Start adding some delicious Ethiopian dishes!</p>
          <Link to="/" className="basket-browse-btn">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Header title="" showBack />

      {/* Step indicator */}
      <div className="basket-step-bar">
        <span className="step-badge">🧺 Step 1 of 2</span>
      </div>

      <div className="basket-content">
        <h1 className="basket-title">Your Gursha Basket</h1>
        <p className="basket-subtitle">
          <IoCheckmarkCircle size={14} color="#389E0D" />
          Complimentary Delivery<br />
          <span className="subtitle-note">Estimated: 25-35 mins</span>
        </p>

        {/* Cart Items */}
        <div className="basket-items-section">
          {items.map((item, index) => (
            <div key={index} className="basket-item">
              <div className="basket-item-img-wrap">
                <img src={item.dish.image} alt={item.dish.name} className="basket-item-img" />
              </div>
              <div className="basket-item-info">
                <h3 className="basket-item-name">{item.dish.name}</h3>
                <p className="basket-item-meta">
                  <span className="spice-indicator">🌶️ {item.spiceLevel}</span>
                </p>
                <div className="basket-item-bottom">
                  <span className="basket-item-price">ETB {(item.dish.price * item.quantity).toLocaleString()}</span>
                  <div className="basket-item-qty">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)}>
                      <IoRemoveCircle size={24} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                      <IoAddCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
              <button className="basket-item-remove" onClick={() => removeItem(index)}>
                <IoTrashOutline size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Proceed to Checkout */}
        <Link to="/checkout" className="basket-proceed-btn">
          <span>Proceed to Checkout</span>
          <span className="proceed-total">ETB {subtotal.toLocaleString()}</span>
          <IoChevronForward size={18} />
        </Link>

        {/* Dining Etiquette */}
        <div className="basket-etiquette-section">
          {diningEtiquette.map((section, idx) => (
            <div key={idx} className="etiquette-group">
              <h4 className="etiquette-title">
                <MdRestaurant size={16} />
                {section.title}
              </h4>
              <ul className="etiquette-list">
                {section.items.map((item, iIdx) => (
                  <li key={iIdx}>
                    <IoCheckmarkCircle size={14} color="#8b7a6b" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="basket-promo-section">
          <h4 className="promo-section-title">
            <MdOutlineLocalOffer size={16} />
            Promo Code
          </h4>
          {promo ? (
            <div className="promo-applied">
              <div className="promo-applied-info">
                <IoCheckmarkCircle size={16} color="#389E0D" />
                <span className="promo-code-text">{promo.code}</span>
                <span className="promo-desc">{promo.description}</span>
              </div>
              <button className="promo-remove-btn" onClick={removePromo}>
                <IoClose size={16} />
              </button>
            </div>
          ) : (
            <div className="promo-input-group">
              <input
                type="text"
                className="promo-input"
                placeholder="Enter promo code"
                value={promoInput}
                onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
              />
              <button className="promo-apply-btn" onClick={handleApplyPromo}>
                Apply
              </button>
            </div>
          )}
          {promoError && <span className="promo-error">{promoError}</span>}
        </div>

        {/* Payment Summary */}
        <div className="basket-summary">
          <h4 className="summary-title">Payment Summary</h4>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>ETB {subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>ETB {deliveryFee.toLocaleString()}</span>
          </div>
          {promoDiscount > 0 && (
            <div className="summary-row discount-row">
              <span>Discount</span>
              <span>-ETB {promoDiscount.toLocaleString()}</span>
            </div>
          )}
          <div className="summary-divider" />
          <div className="summary-row total-row">
            <span>Grand Total</span>
            <span className="grand-total">ETB {grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bottom-spacer" />
    </div>
  );
}
