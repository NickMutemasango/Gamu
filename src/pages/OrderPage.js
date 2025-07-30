import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { textToSpeech } from '../utils/textToSpeech';
import '../styles/order.css';

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    delivery: false,
    address: '',
    specialInstructions: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('restaurantCart', JSON.stringify(newCart));
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    updateCart(newCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const newCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    console.log('Order submitted:', { cart, orderInfo });
    localStorage.removeItem('restaurantCart');
    navigate('/order-confirmation');
  };

  return (
    <div className="order-page" role="main" aria-label="Order page">
      <h1>Your Order</h1>
      
      <div className="order-container">
        <div className="cart-section">
          <h2>Your Items</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul className="cart-items">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <div className="item-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                      aria-label={`Remove ${item.name} from order`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          <h2>Order Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={orderInfo.name}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={orderInfo.phone}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="delivery"
              name="delivery"
              checked={orderInfo.delivery}
              onChange={handleInputChange}
            />
            <label htmlFor="delivery">Delivery (instead of pickup)</label>
          </div>

          {orderInfo.delivery && (
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                value={orderInfo.address}
                onChange={handleInputChange}
                required={orderInfo.delivery}
                aria-required={orderInfo.delivery}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="specialInstructions">Special Instructions</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={orderInfo.specialInstructions}
              onChange={handleInputChange}
              placeholder="Allergies, dietary restrictions, etc."
            />
          </div>

          <button 
            type="submit" 
            className="submit-order"
            disabled={cart.length === 0}
            aria-disabled={cart.length === 0}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;