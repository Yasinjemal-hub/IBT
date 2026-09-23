import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import DishDetail from './pages/DishDetail';
import Basket from './pages/Basket';
import Checkout from './pages/Checkout';
import Menu from './pages/Menu';
import Account from './pages/Account';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dish/:id" element={<DishDetail />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<Menu />} />
          <Route path="/profile" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
