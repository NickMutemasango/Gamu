import React, { useState, useEffect } from 'react';
import { textToSpeech } from '../utils/textToSpeech';
import '../styles/orderHistory.css';

const OrderHistory = ({ audioEnabled }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch order history
    const fetchOrderHistory = async () => {
      try {
        // In a real app, this would be an API call to your backend
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockOrders = [
          {
            id: 'ORD-1001',
            date: '2023-05-15',
            items: ['Signature Burger', 'Fries', 'Soda'],
            total: 24.97,
            status: 'delivered'
          },
          {
            id: 'ORD-1002',
            date: '2023-05-10',
            items: ['Vegetarian Pizza', 'Garlic Bread'],
            total: 28.98,
            status: 'delivered'
          },
          {
            id: 'ORD-1003',
            date: '2023-05-05',
            items: ['Caesar Salad', 'Iced Tea'],
            total: 15.98,
            status: 'cancelled'
          }
        ];
        
        setOrders(mockOrders);
        setLoading(false);
        
        if (audioEnabled) {
          textToSpeech(`Loaded ${mockOrders.length} past orders`);
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [audioEnabled]);

  const speakOrderDetails = (order) => {
    if (audioEnabled) {
      textToSpeech(
        `Order ${order.id} from ${order.date}. Items: ${order.items.join(', ')}. ` +
        `Total: $${order.total}. Status: ${order.status}`
      );
    }
  };

  return (
    <div className="order-history" role="main" aria-label="Order history">
      <h1>Order History</h1>
      
      {loading ? (
        <p className="loading">Loading your order history...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div 
              key={order.id} 
              className="order-card"
              onClick={() => speakOrderDetails(order)}
              onKeyDown={(e) => e.key === 'Enter' && speakOrderDetails(order)}
              tabIndex="0"
              role="button"
              aria-label={`Order ${order.id} from ${order.date}`}
            >
              <div className="order-header">
                <h2>Order #{order.id}</h2>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <p className="order-date">Date: {order.date}</p>
              <div className="order-items">
                <h3>Items:</h3>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="order-footer">
                <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                <button className="reorder-btn">Reorder</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;