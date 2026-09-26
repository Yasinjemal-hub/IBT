import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCallOutline, IoLocationOutline, IoCheckmarkCircle, IoChevronDown, IoAlertCircle } from 'react-icons/io5';
import { MdDeliveryDining, MdStorefront, MdOutlinePayment } from 'react-icons/md';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { paymentMethods, deliveryZones } from '../data/mockData';
import { checkoutFormSchema, validateForm } from '../validation/schemas';
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shakeFields, setShakeFields] = useState({});

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/basket');
    }
  }, [items.length, orderPlaced, navigate]);

  if (items.length === 0 && !orderPlaced) {
    return null;
  }

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFormData = () => ({
    recipient: {
      name: recipient.name,
      phone: recipient.phone,
    },
    deliveryType,
    deliveryAddress: deliveryType === 'delivery' ? {
      city: deliveryAddress.city,
      subCity: deliveryAddress.subCity,
      kebele: deliveryAddress.kebele,
      building: deliveryAddress.building || undefined,
    } : undefined,
    paymentMethod: paymentMethod || '',
    telebirrPhone: paymentMethod === 'telebirr' ? phoneInput : undefined,
  });

  const doValidation = () => {
    const result = validateForm(checkoutFormSchema, getFormData());
    setErrors(result.errors);
    return result.success;
  };

  const handlePlaceOrder = () => {
    // Touch all fields
    setTouched({
      'recipient.name': true,
      'recipient.phone': true,
      paymentMethod: true,
      'deliveryAddress.subCity': true,
      'deliveryAddress.kebele': true,
      telebirrPhone: true,
    });

    if (!doValidation()) {
      // Trigger shake animation on error fields
      const result = validateForm(checkoutFormSchema, getFormData());
      const newShake = {};
      Object.keys(result.errors).forEach((key) => { newShake[key] = true; });
      setShakeFields(newShake);
      setTimeout(() => setShakeFields({}), 600);
      return;
    }

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  // Real-time validation on change
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      doValidation();
    }
  }, [recipient.name, recipient.phone, deliveryType, deliveryAddress, paymentMethod, phoneInput]);

  const getError = (field) => {
    return touched[field] ? errors[field] : null;
  };

  const fieldClass = (field) => {
    const err = getError(field);
    const shake = shakeFields[field];
    return `form-input ${err ? 'input-error' : ''} ${shake ? 'shake' : ''}`;
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
              className={fieldClass('recipient.name')}
              placeholder="Abebe Bekele"
              value={recipient.name}
              onChange={(e) => setRecipient({ name: e.target.value })}
              onBlur={() => markTouched('recipient.name')}
              id="checkout-recipient-name"
            />
            {getError('recipient.name') && (
              <span className="field-error">
                <IoAlertCircle size={13} /> {getError('recipient.name')}
              </span>
            )}
          </div>
          <div className="form-group phone-group">
            <span className="phone-prefix">🇪🇹 +251</span>
            <input
              type="tel"
              className={`${fieldClass('recipient.phone')} phone-input`}
              placeholder="9XX XXX XXXX"
              value={recipient.phone}
              onChange={(e) => setRecipient({ phone: e.target.value })}
              onBlur={() => markTouched('recipient.phone')}
              id="checkout-recipient-phone"
            />
          </div>
          {getError('recipient.phone') && (
            <span className="field-error">
              <IoAlertCircle size={13} /> {getError('recipient.phone')}
            </span>
          )}
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
                id="checkout-city"
              />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  className={fieldClass('deliveryAddress.subCity')}
                  placeholder="Sub-City / Metropolitanship"
                  value={deliveryAddress.subCity}
                  onChange={(e) => setDeliveryAddress({ subCity: e.target.value })}
                  onBlur={() => markTouched('deliveryAddress.subCity')}
                  id="checkout-subcity"
                />
                {getError('deliveryAddress.subCity') && (
                  <span className="field-error">
                    <IoAlertCircle size={13} /> {getError('deliveryAddress.subCity')}
                  </span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="text"
                  className={fieldClass('deliveryAddress.kebele')}
                  placeholder="Kebele/Ally / Take/Flat area"
                  value={deliveryAddress.kebele}
                  onChange={(e) => setDeliveryAddress({ kebele: e.target.value })}
                  onBlur={() => markTouched('deliveryAddress.kebele')}
                  id="checkout-kebele"
                />
                {getError('deliveryAddress.kebele') && (
                  <span className="field-error">
                    <IoAlertCircle size={13} /> {getError('deliveryAddress.kebele')}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Behind CompAut/Dep Bldg (Landmark...)"
                value={deliveryAddress.building}
                onChange={(e) => setDeliveryAddress({ building: e.target.value })}
                id="checkout-building"
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
          {getError('paymentMethod') && (
            <span className="field-error" style={{ marginBottom: 8, display: 'block' }}>
              <IoAlertCircle size={13} /> {getError('paymentMethod')}
            </span>
          )}
          <div className="payment-methods">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`payment-option ${paymentMethod === method.id ? 'active' : ''}`}
                onClick={() => { setPaymentMethod(method.id); markTouched('paymentMethod'); }}
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
                className={`${fieldClass('telebirrPhone')} phone-input`}
                placeholder="9XX XXX XXXX"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                onBlur={() => markTouched('telebirrPhone')}
                id="checkout-telebirr-phone"
              />
            </div>
          )}
          {getError('telebirrPhone') && (
            <span className="field-error">
              <IoAlertCircle size={13} /> {getError('telebirrPhone')}
            </span>
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
        >
          <HiOutlineCreditCard size={20} />
          Place Order · ETB {grandTotal.toLocaleString()}
        </button>
      </div>

      <div className="bottom-spacer" />
    </div>
  );
}
