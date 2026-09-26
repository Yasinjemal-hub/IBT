import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch, IoCloseCircle, IoTimeOutline, IoFlame } from 'react-icons/io5';
import { dishes } from '../data/mockData';
import './SearchAutocomplete.css';

const RECENT_SEARCHES_KEY = 'habesha_recent_searches';
const MAX_RECENT = 5;

function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query) {
  const recent = getRecentSearches().filter((q) => q !== query);
  recent.unshift(query);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

const trendingSearches = ['Doro Wat', 'Kitfo', 'Shiro', 'Tibs', 'Beyaynetu'];

export default function SearchAutocomplete({ onSearch, onClose, isOverlay = false }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fuzzy-match dishes
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return dishes
      .filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.nameAmharic.includes(query) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.tags?.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query]);

  const showDropdown = focused && (query.trim() || recentSearches.length > 0);

  // Highlight match text
  const highlightMatch = useCallback(
    (text) => {
      if (!query.trim()) return text;
      const idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx < 0) return text;
      return (
        <>
          {text.slice(0, idx)}
          <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
          {text.slice(idx + query.length)}
        </>
      );
    },
    [query]
  );

  const handleSelect = (dish) => {
    saveRecentSearch(dish.name);
    setRecentSearches(getRecentSearches());
    setQuery('');
    setFocused(false);
    navigate(`/dish/${dish.id}`);
  };

  const handleSearchSubmit = (searchText) => {
    const q = (searchText || query).trim();
    if (!q) return;
    saveRecentSearch(q);
    setRecentSearches(getRecentSearches());
    setQuery('');
    setFocused(false);
    if (onSearch) {
      onSearch(q);
    } else {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleKeyDown = (e) => {
    const totalItems = results.length || (query.trim() ? 0 : recentSearches.length);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => (i < totalItems - 1 ? i + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : totalItems - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && results[highlightIndex]) {
        handleSelect(results[highlightIndex]);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === 'Escape') {
      setFocused(false);
      inputRef.current?.blur();
      onClose?.();
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (isOverlay && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOverlay]);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [query]);

  return (
    <div className={`search-autocomplete ${isOverlay ? 'overlay' : ''}`} ref={dropdownRef}>
      <div className="search-input-bar">
        <IoSearch className="search-bar-icon" size={18} />
        <input
          ref={inputRef}
          type="text"
          className="search-bar-input"
          placeholder="Search dishes (Kitfo, Shiro, Tibs...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          id="search-autocomplete-input"
        />
        {query && (
          <button className="search-clear-btn" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
            <IoCloseCircle size={18} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="search-dropdown" role="listbox">
          {/* Search results */}
          {query.trim() && results.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">
                <span>Dishes</span>
                <span className="search-result-count">{results.length} found</span>
              </div>
              {results.map((dish, idx) => (
                <button
                  key={dish.id}
                  className={`search-result-item ${highlightIndex === idx ? 'highlighted' : ''}`}
                  onClick={() => handleSelect(dish)}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  role="option"
                  aria-selected={highlightIndex === idx}
                >
                  <div className="search-result-img">
                    <img src={dish.image} alt={dish.name} />
                  </div>
                  <div className="search-result-info">
                    <span className="search-result-name">{highlightMatch(dish.name)}</span>
                    <span className="search-result-meta">
                      {dish.nameAmharic} · ETB {dish.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="search-result-rating">
                    ⭐ {dish.rating}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="search-no-results">
              <span className="no-results-emoji">🍽️</span>
              <span>No dishes found for "{query}"</span>
              <span className="no-results-hint">Try searching for Kitfo, Shiro, or Doro Wat</span>
            </div>
          )}

          {/* Recent Searches */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">
                <span><IoTimeOutline size={14} /> Recent</span>
                <button className="clear-recent-btn" onClick={handleClearRecent}>Clear All</button>
              </div>
              {recentSearches.map((term, idx) => (
                <button
                  key={term}
                  className={`search-recent-item ${highlightIndex === idx ? 'highlighted' : ''}`}
                  onClick={() => { setQuery(term); handleSearchSubmit(term); }}
                  onMouseEnter={() => setHighlightIndex(idx)}
                >
                  <IoTimeOutline size={14} className="recent-icon" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {!query.trim() && (
            <div className="search-section trending-section">
              <div className="search-section-header">
                <span><IoFlame size={14} color="#D4380D" /> Trending</span>
              </div>
              <div className="trending-tags">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    className="trending-tag"
                    onClick={() => { setQuery(term); handleSearchSubmit(term); }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
