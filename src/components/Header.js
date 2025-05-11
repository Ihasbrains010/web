import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 
import './Header.css';

function Header() {
  const { cartCount } = useCart(); 

  return (
    <header className="app-header">
      <div className="logo">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Claudia</NavLink>
      </div>
      <nav>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'active cart-link' : 'cart-link'}> 
              Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>} 
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
