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
        {showBack && (
          <Link to={-1} className="header-back-btn mobile-only" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
            <IoArrowBack size={22} />
          </Link>
        )}
        <Link to="/" className={`header-logo ${showBack ? 'desktop-flex' : ''}`} style={{ textDecoration: 'none' }}>
          <span className="logo-text" style={{ display: 'flex', flexDirection: 'column', color: '#972410', fontWeight: 'bold' }}>
            <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>Mesob</span>
            <small style={{ fontSize: '0.65rem', letterSpacing: '1px',color: '#B08945' }}>HABESHA HOUSE</small>
          </span>
        </Link>
      </div>
      
      <nav className="desktop-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/search" className={location.pathname.startsWith('/search') ? 'active' : ''}>Menu</Link>
        <Link to="/profile" className={location.pathname.startsWith('/profile') ? 'active' : ''}>Profile</Link>
      </nav>

      <div className="header-center mobile-only">
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
