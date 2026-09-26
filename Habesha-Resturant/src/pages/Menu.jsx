import { useState, useMemo, useEffect } from 'react';
import { IoOptionsOutline, IoStar, IoAdd } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SearchAutocomplete from '../components/SearchAutocomplete';
import { dishes } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('All Dishes');
  const { addItem, items, grandTotal, itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const tabs = [
    { label: 'All Dishes', count: dishes.length },
    { label: '🌾 100% Pure Teff Injera', count: null },
    { label: '🌿 Fasting / Tsom Friendly', count: null },
    { label: 'Traditional Stews & Wat', count: null }
  ];

  const filteredDishes = useMemo(() => {
    let result = dishes;

    // Filter by tab
    if (activeTab === '🌿 Fasting / Tsom Friendly') {
      result = result.filter(d => d.category === 'vegetarian');
    } else if (activeTab === 'Traditional Stews & Wat') {
      result = result.filter(d => d.category === 'special');
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.nameAmharic.includes(searchQuery) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [searchQuery, activeTab]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="menu-page">
      <Header />
      
      <div className="menu-search-container">
        <SearchAutocomplete onSearch={handleSearch} />
        <button className="filter-button">
          <IoOptionsOutline size={20} />
        </button>
      </div>

      {/* Active search indicator */}
      {searchQuery && (
        <div className="search-active-bar">
          <span className="search-active-text">
            Showing results for "<strong>{searchQuery}</strong>"
          </span>
          <button 
            className="search-clear-filter" 
            onClick={() => setSearchQuery('')}
          >
            Clear
          </button>
        </div>
      )}

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
        {filteredDishes.length === 0 && (
          <div className="menu-empty-state">
            <span className="empty-icon">🍽️</span>
            <h3>No dishes found</h3>
            <p>Try a different search term or browse our categories</p>
          </div>
        )}
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
