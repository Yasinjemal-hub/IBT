import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoArrowBack, IoCartOutline } from 'react-icons/io5';
import { HiOutlineHeart } from 'react-icons/hi2';
import './Header.css';

export default function Header({ title, showBack = false, transparent = false }) {
  const location = useLocation();
  const { itemCount } = useCart();
  const isHome = location.pathname === '/';

  return (
    <header className={`app-header ${transparent ? 'transparent' : ''} ${isHome ? 'home-header' : ''}`}>
      <div className="header-left">
        {showBack ? (
          <Link to={-1} className="header-back-btn" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
            <IoArrowBack size={22} />
          </Link>
        ) : (
          <div className="header-logo">
            <span className="logo-icon">🍽️</span>
            <span className="logo-text">Meswob<br /><small>ምስዎብ</small></span>
          </div>
        )}
      </div>
      <div className="header-center">
        {title && <h1 className="header-title">{title}</h1>}
      </div>
      <div className="header-right">
        <button className="header-icon-btn wishlist-btn">
          <HiOutlineHeart size={22} />
        </button>
        <Link to="/basket" className="header-icon-btn cart-btn">
          <IoCartOutline size={22} />
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
      </div>
    </header>
  );
}
