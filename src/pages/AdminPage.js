import React, { useState, useEffect } from 'react';
import '../styles/admin.css';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'appetizers',
    allergens: ''
  });

  useEffect(() => {
    // Simulate fetching orders
    const fetchOrders = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setOrders([
          { id: 1, customer: 'John Doe', items: ['Burger', 'Fries'], total: 15.98, status: 'pending' },
          { id: 2, customer: 'Jane Smith', items: ['Salad', 'Soup'], total: 12.50, status: 'preparing' },
          { id: 3, customer: 'Mike Johnson', items: ['Pizza'], total: 14.99, status: 'delivered' }
        ]);
      }, 500);
    };

    // Simulate fetching menu items
    const fetchMenuItems = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setMenuItems([
          { id: 1, name: 'Burger', price: 10.99, category: 'mains' },
          { id: 2, name: 'Fries', price: 4.99, category: 'sides' },
          { id: 3, name: 'Salad', price: 8.99, category: 'appetizers' }
        ]);
      }, 500);
    };

    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'menu') fetchMenuItems();
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    const item = {
      id: menuItems.length + 1,
      ...newItem,
      price: parseFloat(newItem.price)
    };
    setMenuItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: 'appetizers',
      allergens: ''
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="admin-page" role="main" aria-label="Admin page">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'menu'}
          onClick={() => setActiveTab('menu')}
        >
          Menu Management
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="orders-section" role="tabpanel">
          <h2>Recent Orders</h2>
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <span className={`status ${order.status}`}>
                    {order.status}
                  </span>
                </div>
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Items:</strong> {order.items.join(', ')}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <div className="order-actions">
                  {order.status === 'pending' && (
                    <button onClick={() => updateOrderStatus(order.id, 'preparing')}>
                      Start Preparing
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button onClick={() => updateOrderStatus(order.id, 'ready')}>
                      Mark as Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button onClick={() => updateOrderStatus(order.id, 'delivered')}>
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="menu-section" role="tabpanel">
          <div className="menu-management">
            <div className="current-menu">
              <h2>Current Menu Items</h2>
              <ul className="menu-list">
                {menuItems.map(item => (
                  <li key={item.id} className="menu-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <span className="item-category">{item.category}</span>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleAddItem} className="add-item-form">
              <h2>Add New Menu Item</h2>
              <div className="form-group">
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                >
                  <option value="appetizers">Appetizers</option>
                  <option value="mains">Main Courses</option>
                  <option value="sides">Sides</option>
                  <option value="desserts">Desserts</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="allergens">Allergens</label>
                <input
                  type="text"
                  id="allergens"
                  name="allergens"
                  value={newItem.allergens}
                  onChange={handleInputChange}
                  placeholder="e.g., nuts, dairy, gluten"
                />
              </div>
              <button type="submit" className="add-btn">
                Add Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;