import React, { useState } from 'react';

export default function OrderForm({ totalETB }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validates standard 10-digit Ethiopian TeleBirr format starting with 09 or 07
  const isPhoneValid = /^(09|07)\d{8}$/.test(form.phone);
  const isFormValid = form.name.trim() !== '' && form.area.trim() !== '' && isPhoneValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order submitted for ${form.name}! Total: ${totalETB} ETB`);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Delivery Form</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="TeleBirr Number (09... or 07...)"
        value={form.phone}
        onChange={handleChange}
      />
      {!isPhoneValid && form.phone.length > 0 && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          Must start with 09 or 07 and be 10 digits
        </p>
      )}
      <input
        type="text"
        name="area"
        placeholder="Delivery Area"
        value={form.area}
        onChange={handleChange}
      />
      <button type="submit" disabled={!isFormValid}>
        Order Now
      </button>
    </form>
  );
}