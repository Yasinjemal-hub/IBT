import { useState, useMemo } from 'react';
import { IoSearch, IoOptionsOutline, IoStar, IoAdd } from 'react-icons/io5';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { dishes } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Dishes');
  const { addItem, items, grandTotal, itemCount } = useCart();
  const navigate = useNavigate();

  const tabs = [
    { label: 'All Dishes', count: 14 },
    { label: '🌾 100% Pure Teff Injera', count: null },
    { label: '🌿 Fasting / Tsom Friendly', count: null },
    { label: 'Traditional Stews & Wat', count: null }
  ];

  const filteredDishes = useMemo(() => {
    let result = dishes;
    if (searchQuery) {
      result = result.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [searchQuery]);

  // cartItemCount is already populated by context

  return (
    <div className="menu-page">
      <Header />
      
      <div className="menu-search-container">
        <div className="search-input-wrapper">
          <IoSearch className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search dishes (Kitfo, Shiro, Tibs...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <IoOptionsOutline size={20} />
        </button>
      </div>

      <div className="menu-tabs-wrapper">
        {tabs.map((tab) => (
          <button 
            key={tab.label}
            className={`menu-tab ${activeTab === tab.label ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} {tab.count && <span className="tab-count">{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className="menu-promo-banner">
         <div className="menu-promo-icon">
            <span role="img" aria-label="mesob">🧺</span>
         </div>
         <div className="menu-promo-text">
            <h4>Traditional Gursha Experience</h4>
            <p>Fresh roll of pure brown teff injera served with...</p>
         </div>
      </div>

      <div className="menu-dish-list">
        {filteredDishes.map(dish => (
          <div key={dish.id} className="menu-dish-card" onClick={() => navigate(`/dish/${dish.id}`)}>
            <div className="menu-dish-img-wrap">
              <img src={dish.image} alt={dish.name} className="menu-dish-image" />
              {dish.badge && (
                <span className="menu-dish-badge" style={{ backgroundColor: dish.badgeColor }}>
                  {dish.badge}
                </span>
              )}
            </div>
            
            <div className="menu-dish-details">
              <h3 className="menu-dish-title">{dish.name}</h3>
              <div className="menu-dish-pattern-icon">||| ||| |||</div>
              <p className="menu-dish-desc">{dish.description.substring(0, 50)}...</p>
              
              <div className="menu-dish-bottom">
                <div className="menu-dish-price-rating">
                   <div className="menu-dish-rating">
                     <IoStar size={12} color="#972410" /> <span className="rating-val">{dish.rating}</span>
                     <span className="rating-count">({dish.reviews})</span>
                   </div>
                   <div className="menu-dish-price">
                     <small>ETB</small> {dish.price.toLocaleString()}
                   </div>
                </div>
                <button 
                  className="menu-add-btn" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    addItem(dish); 
                  }}
                >
                  <IoAdd size={18} color="#FFF" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {itemCount > 0 && (
        <div className="floating-cart-bar">
          <div className="floating-cart-info">
            <div className="floating-cart-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <div className="floating-cart-badge">{itemCount}</div>
            </div>
            <div className="floating-cart-text">
               <span className="selected-text">Selected {itemCount} items</span>
               <span className="delivery-tax-text">Incl. local delivery + taxes, 32min</span>
            </div>
          </div>
          <div className="floating-cart-price-action">
            <div className="floating-cart-price">
              <small>ETB</small><br/>
              <b>{grandTotal.toLocaleString()}</b>
            </div>
            <button className="view-basket-btn" onClick={() => navigate('/basket')}>
              View Basket <span>+</span>
            </button>
          </div>
        </div>
      )}

      <div className="bottom-spacer" style={{ height: itemCount > 0 ? '140px' : '80px' }} />
      <BottomNav />
    </div>
  );
}
