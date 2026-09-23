import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCallOutline, IoLocationOutline, IoCheckmarkCircle, IoCardOutline, IoChevronDown } from 'react-icons/io5';
import { MdDeliveryDining, MdStorefront, MdOutlinePayment } from 'react-icons/md';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { paymentMethods, deliveryZones } from '../data/mockData';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    deliveryFee,
    promoDiscount,
    grandTotal,
    deliveryType,
    deliveryZone,
    paymentMethod,
    recipient,
    deliveryAddress,
    setDeliveryType,
    setDeliveryZone,
    setPaymentMethod,
    setRecipient,
    setDeliveryAddress,
    clearCart,
  } = useCart();

  const [showZones, setShowZones] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/basket');
    }
  }, [items.length, orderPlaced, navigate]);

  if (items.length === 0 && !orderPlaced) {
    return null;
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-animation">
            <IoCheckmarkCircle size={72} color="#389E0D" />
          </div>
          <h2>Order Confirmed! 🎉</h2>
          <p>Your delicious Habesha dishes are being prepared with love.</p>
          <p className="success-note">Estimated delivery: 25-35 mins</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header title="Checkout" showBack />

      <div className="checkout-content">
        {/* Delivery Type Toggle */}
        <div className="delivery-toggle">
          <button
            className={`toggle-btn ${deliveryType === 'delivery' ? 'active' : ''}`}
            onClick={() => setDeliveryType('delivery')}
          >
            <MdDeliveryDining size={20} />
            Pickup/Delivery
          </button>
          <button
            className={`toggle-btn ${deliveryType === 'pickup' ? 'active' : ''}`}
            onClick={() => setDeliveryType('pickup')}
          >
            <MdStorefront size={20} />
            Dine-in Pickup
          </button>
        </div>

        {/* Recipient Info */}
        <div className="checkout-section">
          <div className="section-label">
            <IoCallOutline size={18} />
            <span>Recipient Contact</span>
          </div>
          <div className="section-sublabel">Full name, phone & Telegram (Or alternate contact)</div>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Abebe Bekele"
              value={recipient.name}
              onChange={(e) => setRecipient({ name: e.target.value })}
            />
          </div>
          <div className="form-group phone-group">
            <span className="phone-prefix">🇪🇹 +251</span>
            <input
              type="tel"
              className="form-input phone-input"
              placeholder="9XX XXX XXXX"
              value={recipient.phone}
              onChange={(e) => setRecipient({ phone: e.target.value })}
            />
          </div>
        </div>

        {/* Delivery Destination */}
        {deliveryType === 'delivery' && (
          <div className="checkout-section">
            <div className="section-label">
              <IoLocationOutline size={18} />
              <span>Delivery Destination</span>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Addis Ababa"
                value={deliveryAddress.city}
                onChange={(e) => setDeliveryAddress({ city: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Sub-City / Metropolitanship"
                  value={deliveryAddress.subCity}
                  onChange={(e) => setDeliveryAddress({ subCity: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Kebele/Ally / Take/Flat area"
                  value={deliveryAddress.kebele}
                  onChange={(e) => setDeliveryAddress({ kebele: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Behind CompAut/Dep Bldg (Landmark...)"
                value={deliveryAddress.building}
                onChange={(e) => setDeliveryAddress({ building: e.target.value })}
              />
            </div>

            {/* Delivery Zone */}
            <div className="zone-selector">
              <button className="zone-selector-btn" onClick={() => setShowZones(!showZones)}>
                <span>{deliveryZone?.name || 'Optimize Delivery'}</span>
                <IoChevronDown size={16} className={showZones ? 'rotated' : ''} />
              </button>
              {showZones && (
                <div className="zone-dropdown">
                  {deliveryZones.map((zone) => (
                    <button
                      key={zone.id}
                      className={`zone-option ${deliveryZone?.id === zone.id ? 'active' : ''}`}
                      onClick={() => { setDeliveryZone(zone); setShowZones(false); }}
                    >
                      <span>{zone.name}</span>
                      <span className="zone-fee">ETB {zone.fee}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confirm Order & Pay */}
        <div className="checkout-section pay-section">
          <div className="pay-header">
            <span className="pay-label">Confirm Order & Pay</span>
            <span className="pay-amount">ETB {grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="checkout-section">
          <div className="section-label">
            <MdOutlinePayment size={18} />
            <span>Payment Method</span>
          </div>
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`payment-option ${paymentMethod === method.id ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="payment-option-left">
                  <span className="payment-icon">{method.icon}</span>
                  <span className="payment-name">{method.name}</span>
                </div>
                {paymentMethod === method.id && (
                  <IoCheckmarkCircle size={20} color="#D4380D" />
                )}
              </button>
            ))}
          </div>

          {paymentMethod === 'telebirr' && (
            <div className="payment-phone-input">
              <span className="phone-prefix">🇪🇹 +251</span>
              <input
                type="tel"
                className="form-input phone-input"
                placeholder="9XX XXX XXXX"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="checkout-section summary-section">
          <h4 className="summary-heading">Order Summary</h4>
          {items.map((item, index) => (
            <div key={index} className="summary-item-row">
              <span className="summary-item-name">
                {item.dish.name} ×{item.quantity}
              </span>
              <span className="summary-item-price">
                ETB {(item.dish.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="checkout-summary-divider" />
          <div className="summary-item-row">
            <span>Subtotal</span>
            <span>ETB {subtotal.toLocaleString()}</span>
          </div>
          {deliveryType === 'delivery' && (
            <div className="summary-item-row">
              <span>Highest Surcharge Dist.</span>
              <span>ETB {deliveryFee.toLocaleString()}</span>
            </div>
          )}
          {promoDiscount > 0 && (
            <div className="summary-item-row discount">
              <span>Discount</span>
              <span>-ETB {promoDiscount.toLocaleString()}</span>
            </div>
          )}
          <div className="checkout-summary-divider" />
          <div className="summary-item-row total">
            <span>Estimated Total</span>
            <span>ETB {grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Place Order */}
        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={!paymentMethod}
        >
          <HiOutlineCreditCard size={20} />
          Place Order · ETB {grandTotal.toLocaleString()}
        </button>
      </div>

      <div className="bottom-spacer" />
    </div>
  );
}
