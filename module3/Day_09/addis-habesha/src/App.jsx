import React from 'react';
import { CartProvider } from './componet/cart/CartProvider';
import Menu from './Menu';

export default function App() {
  return (
    <CartProvider>
      <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <Menu />
      </main>
    </CartProvider>
  );
}