import React, { useState, useMemo } from 'react';
import { useFetch } from './componet/hooks/useFetch';
import { useCart } from './componet/cart/CartProvider';

export default function Menu() {
  const { data: menuItems, loading, error } = useFetch('/api/menu'); // Update API endpoint as needed
  const { items, dispatch, total } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter and sort items with useMemo to optimize rendering
  const filteredItems = useMemo(() => {
    if (!menuItems) return [];
    if (selectedCategory === 'All') return menuItems;
    return menuItems.filter(item => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);

  const totalCartCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error}</div>;

  return (
    <div>
      {/* Header Badge */}
      <header>
        <h2>Addis Eats</h2>
        <div>Cart Badge: <strong>{totalCartCount}</strong> items</div>
      </header>

      {/* Category Filter */}
      <div>
        <label>Category Filter: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Mains">Mains</option>
          <option value="Drinks">Drinks</option>
          <option value="Desserts">Desserts</option>
        </select>
      </div>

      {/* Dish List */}
      <div>
        <h3>Menu Items</h3>
        {filteredItems.map((dish) => (
          <div key={dish.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
            <h4>{dish.name} - ${dish.price}</h4>
            <p>{dish.category}</p>
            <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: dish })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Checkout Panel */}
      <aside style={{ marginTop: '20px', borderTop: '2px solid #000' }}>
        <h3>Checkout Panel</h3>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <span>{item.name} x {item.quantity} (${item.price * item.quantity})</span>
                <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                  Remove
                </button>
              </div>
            ))}
            <h4>Total: ${total.toFixed(2)}</h4>
            <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear Cart</button>
          </div>
        )}
      </aside>
    </div>
  );
}