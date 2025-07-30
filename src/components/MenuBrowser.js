import React, { useState, useEffect } from 'react';
import { textToSpeech } from '../utils/textToSpeech';
import { getMenuItems } from '../utils/api';

const MenuBrowser = ({ audioEnabled }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const items = await getMenuItems();
      setMenuItems(items);
    };
    fetchMenu();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (audioEnabled) {
      textToSpeech(`${item.name}. ${item.description}. Contains ${item.allergens || 'no common allergens'}. Price: ${item.price}`);
    }
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="menu-browser" role="region" aria-label="Menu browser">
      <input
        type="text"
        placeholder="Search menu..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Search menu items"
      />
      
      <div className="menu-grid">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className={`menu-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
            onClick={() => handleItemClick(item)}
            onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item)}
            tabIndex="0"
            role="button"
            aria-label={`${item.name}. ${item.description}. Price ${item.price}`}
          >
            <img 
              src={item.image} 
              alt={item.name} 
              aria-hidden="true"
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="item-details">
              <span>${item.price}</span>
              {item.allergens && <span className="allergen-alert">!</span>}
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="item-detail-view" role="region" aria-label="Selected item details">
          <h2>{selectedItem.name}</h2>
          <p>{selectedItem.description}</p>
          <p><strong>Price:</strong> ${selectedItem.price}</p>
          {selectedItem.allergens && (
            <p className="allergen-warning">
              <strong>Contains:</strong> {selectedItem.allergens}
            </p>
          )}
          <button 
            className="add-to-order"
            aria-label={`Add ${selectedItem.name} to order`}
          >
            Add to Order
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuBrowser;
