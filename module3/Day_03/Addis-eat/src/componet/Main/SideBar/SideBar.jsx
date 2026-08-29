import React from 'react';
import OrderForm from './OrderForm';

export default function SideBar({ totalETB }) {
  return (
    <div className="cart">
      <h2>Total: {totalETB} ETB</h2>
      <OrderForm totalETB={totalETB} />
    </div>
  );
}