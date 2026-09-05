import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { cartReducer, initialState } from './cartReducer';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const total = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [state.items]);

  // Memoize provider value to prevent unnecessary re-renders on consumers
  const value = useMemo(() => ({
    items: state.items,
    dispatch,
    total,
  }), [state.items, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);