import React from 'react';
import Dish from './Dish/Dish';

export default function Main({ dishes, onAddToCart }) {
  return (
    <div className="card">
      {dishes.map((item) => (
        <Dish key={item.id} dish={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)