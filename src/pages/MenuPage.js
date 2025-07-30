import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { textToSpeech } from '../utils/textToSpeech';
import '../styles/menu.css';

const MenuPage = ({ audioEnabled }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();

  useEffect(() => {
    // Simulate API call
    const fetchMenu = async () => {
      // In a real app, this would be an API call
      const data = {
        categories: ['appetizers', 'mains', 'desserts', 'beverages'],
        items: [
          { id: 1, name: 'Garlic Bread', description: 'Freshly baked with garlic butter', price: 5.99, category: 'appetizers', allergens: 'wheat, dairy' },
          { id: 2, name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', price: 8.99, category: 'appetizers', allergens: 'dairy, eggs' },
          { id: 3, name: 'Grilled Salmon', description: 'With lemon butter sauce', price: 18.99, category: 'mains', allergens: 'fish' },
          { id: 4, name: 'Chocolate Cake', description: 'Rich chocolate dessert', price: 7.99, category: 'desserts', allergens: 'wheat, dairy, eggs' },
          { id: 5, name: 'Iced Tea', description: 'Freshly brewed', price: 3.99, category: 'beverages', allergens: 'none' }
        ]
      };
      
      setCategories(data.categories);
      setMenuItems(data.items);

      // Check for deep link to specific item
      const params = new URLSearchParams(location.search);
      const itemId = params.get('item');
      if (itemId && audioEnabled) {
        const item = data.items.find(i => i.id === Number(itemId));
        if (item) {
          textToSpeech(`Featured item: ${item.name}. ${item.description}. Price: $${item.price}`);
        }
      }
    };

    fetchMenu();
  }, [location.search, audioEnabled]);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (audioEnabled) {
      textToSpeech(`Showing ${category} category`);
    }
  };

  const speakItemDescription = (item) => {
    if (audioEnabled) {
      textToSpeech(`${item.name}. ${item.description}. Price: $${item.price}. ${item.allergens !== 'none' ? 'Contains: ' + item.allergens : 'No common allergens'}`);
    }
  };

  return (
    <div className="menu-page" role="main" aria-label="Menu page">
      <h1>Our Menu</h1>
      
      <div className="category-filters" role="tablist" aria-label="Menu categories">
        <button
          role="tab"
          aria-selected={activeCategory === 'all'}
          onClick={() => handleCategoryChange('all')}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category}
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="menu-item"
            onClick={() => speakItemDescription(item)}
            onKeyDown={(e) => e.key === 'Enter' && speakItemDescription(item)}
            tabIndex="0"
            role="button"
            aria-label={`${item.name}. ${item.description}. Price $${item.price}`}
          >
            <div className="item-info">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              {item.allergens !== 'none' && (
                <p className="allergen-warning">Contains: {item.allergens}</p>
              )}
              <div className="item-footer">
                <span className="price">${item.price.toFixed(2)}</span>
                <button className="add-to-cart">Add to Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;