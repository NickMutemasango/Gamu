import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = ({ audioEnabled }) => {
  const featuredItems = [
    {
      id: 1,
      name: 'Signature Burger',
      description: 'Juicy beef patty with special sauce',
      price: 12.99,
      image: '/images/burger.jpg'
    },
    {
      id: 2,
      name: 'Vegetarian Pizza',
      description: 'Fresh veggies on our house-made dough',
      price: 14.99,
      image: '/images/pizza.jpg'
    }
  ];

  return (
    <div className="dashboard" role="main" aria-label="Dashboard">
      <section className="hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading">Welcome to Mouth-Watering Restaurant</h1>
        <p>Delicious food made accessible for everyone</p>
        <Link to="/menu" className="cta-button">Browse Menu</Link>
      </section>

      <section className="featured" aria-labelledby="featured-heading">
        <h2 id="featured-heading">Today's Specials</h2>
        <div className="featured-grid">
          {featuredItems.map(item => (
            <div key={item.id} className="featured-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">${item.price.toFixed(2)}</span>
              <Link to={`/menu?item=${item.id}`} className="order-button">Order Now</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="accessibility-info" aria-labelledby="accessibility-heading">
        <h2 id="accessibility-heading">Our Accessibility Features</h2>
        <ul>
          <li>Screen reader compatible</li>
          <li>Adjustable text sizes</li>
          <li>High contrast mode</li>
          <li>Keyboard navigation</li>
          <li>Audio descriptions</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;