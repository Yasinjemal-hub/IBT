import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoHome, IoSearchOutline, IoSearch, IoCartOutline, IoCart, IoPersonOutline, IoPerson } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import './BottomNav.css';

export default function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
        {({ isActive }) => (
          <>
            <span className="nav-icon-sparkle">{isActive ? '✨' : '✨'}</span>
            <span>Specials</span>
          </>
        )}
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        {({ isActive }) => (
          <>
            <div className="nav-icon-fork">
              {isActive ? '🍽️' : '🍽️'}
            </div>
            <span>Menu</span>
          </>
        )}
      </NavLink>
      <NavLink to="/basket" className={({ isActive }) => `nav-item cart-nav-item ${isActive ? 'active' : ''}`}>
        {({ isActive }) => (
          <>
            <div className="cart-nav-icon-wrap">
              {isActive ? <IoCart size={24} /> : <IoCartOutline size={24} />}
              {itemCount > 0 && <span className="cart-nav-badge">{itemCount}</span>}
            </div>
            <span>Cart</span>
          </>
        )}
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        {({ isActive }) => (
          <>
            {isActive ? <IoPerson size={22} /> : <IoPersonOutline size={22} />}
            <span>Account</span>
          </>
        )}
      </NavLink>
    </nav>
  );
}
