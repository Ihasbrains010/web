import React from 'react';
import { useCart } from '../context/CartContext'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './CartPage.css'; 

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (cartItemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(cartItemId, newQuantity);
    }
  };

  const handleRemoveItem = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const formatPrice = (price) => {
    // Expects a number, formats to ₹ (e.g., ₹199)
    // Using toLocaleString for potentially better formatting based on locale, though simple concatenation works for INR.
    // We don't have decimal prices right now, so no .toFixed(2) is needed.
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <p>Please add some items to your cart to proceed with checkout.</p>
          <Link to="/products" className="browse-products-link">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.cartItemId} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  {item.size && <p className="cart-item-size">Size: {item.size}</p>}
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${item.cartItemId}`}>Qty:</label>
                    <input
                      id={`quantity-${item.cartItemId}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.cartItemId, e)}
                      className="quantity-input"
                    />
                  </div>
                  <p className="cart-item-subtotal">
                    Subtotal: {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.cartItemId)}
                  className="remove-item-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p><span>Total Items:</span> <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span></p>
            <p className="total-price"><span>Total Price:</span> <span>{formatPrice(cartTotal)}</span></p>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
            <p className="cart-note">Shipping & taxes calculated at checkout.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
