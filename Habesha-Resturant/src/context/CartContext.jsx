import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.dish.id === action.payload.dish.id &&
          item.spiceLevel === action.payload.spiceLevel &&
          item.injera === action.payload.injera
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      const newItems = [...state.items];
      if (action.payload.quantity <= 0) {
        newItems.splice(action.payload.index, 1);
      } else {
        newItems[action.payload.index] = {
          ...newItems[action.payload.index],
          quantity: action.payload.quantity,
        };
      }
      return { ...state, items: newItems };
    }
    case 'SET_DELIVERY_TYPE':
      return { ...state, deliveryType: action.payload };
    case 'SET_DELIVERY_ZONE':
      return { ...state, deliveryZone: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'APPLY_PROMO':
      return { ...state, promo: action.payload };
    case 'REMOVE_PROMO':
      return { ...state, promo: null };
    case 'SET_RECIPIENT':
      return { ...state, recipient: { ...state.recipient, ...action.payload } };
    case 'SET_DELIVERY_ADDRESS':
      return { ...state, deliveryAddress: { ...state.deliveryAddress, ...action.payload } };
    case 'CLEAR_CART':
      return { ...initialState };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  deliveryType: 'delivery', // 'delivery' | 'pickup'
  deliveryZone: null,
  paymentMethod: null,
  promo: null,
  recipient: {
    name: '',
    phone: '',
  },
  deliveryAddress: {
    city: 'Addis Ababa',
    subCity: '',
    kebele: '',
    building: '',
    floor: '',
  },
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((dish, quantity = 1, spiceLevel = 'traditional', injera = 'teff') => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { dish, quantity, spiceLevel, injera },
    });
  }, []);

  const removeItem = useCallback((index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  }, []);

  const updateQuantity = useCallback((index, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  }, []);

  const setDeliveryType = useCallback((type) => {
    dispatch({ type: 'SET_DELIVERY_TYPE', payload: type });
  }, []);

  const setDeliveryZone = useCallback((zone) => {
    dispatch({ type: 'SET_DELIVERY_ZONE', payload: zone });
  }, []);

  const setPaymentMethod = useCallback((method) => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  }, []);

  const applyPromo = useCallback((promo) => {
    dispatch({ type: 'APPLY_PROMO', payload: promo });
  }, []);

  const removePromo = useCallback(() => {
    dispatch({ type: 'REMOVE_PROMO' });
  }, []);

  const setRecipient = useCallback((data) => {
    dispatch({ type: 'SET_RECIPIENT', payload: data });
  }, []);

  const setDeliveryAddress = useCallback((data) => {
    dispatch({ type: 'SET_DELIVERY_ADDRESS', payload: data });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  const deliveryFee = state.deliveryType === 'pickup' ? 0 : (state.deliveryZone?.fee || 60);

  const promoDiscount = state.promo
    ? state.promo.type === 'percent'
      ? Math.round(subtotal * (state.promo.discount / 100))
      : state.promo.discount
    : 0;

  const grandTotal = subtotal + deliveryFee - promoDiscount;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        subtotal,
        deliveryFee,
        promoDiscount,
        grandTotal,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        setDeliveryType,
        setDeliveryZone,
        setPaymentMethod,
        applyPromo,
        removePromo,
        setRecipient,
        setDeliveryAddress,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
