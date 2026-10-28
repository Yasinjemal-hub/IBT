import React, { useState } from 'react';

export default function Dish({ dish, onAddToCart }) {
  const { name, category, spicy, price, description, image } = dish;
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    onAddToCart(price);
  };

  return (
    <div className="dish_item">
      <img className="dish-image" src={image} alt={name} loading="lazy" />
      <div className="dish-content">
        <div className="name">{name}</div>
        <div className="dish-meta">
          <span>{category}</span>
          {spicy && <span className="spicy">🌶️ Spice</span>}
        </div>
        <p className="dish-description">{description}</p>
        <div className="dish-price">{price} ETB</div>
        <button onClick={handleAdd}>Add ({count})</button>
      </div>
    </div>
  );
}