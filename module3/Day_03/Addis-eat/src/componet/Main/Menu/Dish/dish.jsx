import React, { useState } from 'react';

export default function Dish({ dish, onAddToCart }) {
  const { name, category, spicy, price } = dish; // Add this line
  // ...

  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    onAddToCart(dish.price);
  };

  return (
    <div className="dish_item">
      <div className="name">{dish.name}</div>
      <div>{dish.category}</div>
      {dish.spicy && <p className="spicy">🌶️ Spice</p>}
      <div>{dish.price} ETB</div>
      <button onClick={handleAdd}>Add ({count})</button>
    </div>
  );
}