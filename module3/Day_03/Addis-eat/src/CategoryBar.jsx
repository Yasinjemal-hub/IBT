import React from 'react';

const categories = ["All", "Breakfast", "Main", "Vegetarian", "Side"];

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={`chip ${activeCategory === category ? "active" : ""}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}