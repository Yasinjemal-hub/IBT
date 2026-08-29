import React, { useState } from 'react';
import Main from './Main';
import SideBar from '../SideBar/SideBar';
import CategoryBar from '../../../CategoryBar';
import { dishes } from '../../../data';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [totalETB, setTotalETB] = useState(0);

  const handleAddToCart = (price) => {
    setTotalETB((prev) => prev + price);
  };

  const filteredDishes =
    selectedCategory === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="menu-container">
      <CategoryBar
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="main">
        <Main dishes={filteredDishes} onAddToCart={handleAddToCart} />
        <SideBar totalETB={totalETB} />
      </div>
    </div>
  );
}