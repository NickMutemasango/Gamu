import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navigation.css';

const Navigation = () => {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/order" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            My Order
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/order-history" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Order History
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
