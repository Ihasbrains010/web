import React, { useState } from 'react'; // Import useState
import { useCart } from '../context/CartContext'; // Import the useCart hook
import './ProductItem.css'; // Styles for this component
import { useInView } from 'react-intersection-observer'; // Import the hook
import CountdownTimer from './CountdownTimer'; // Import the CountdownTimer component

function ProductItem({ product }) {
  const { addToCart } = useCart(); // Get the addToCart function from context

  // useInView hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1, // Trigger when 10% of the item is visible
  });

  const [isAdded, setIsAdded] = useState(false); // State to track if added

  const handleAddToCart = () => {
    addToCart(product); // Add the current product to the cart
    setIsAdded(true); // Set added state to true
    // Revert back after a short delay
    setTimeout(() => {
      setIsAdded(false);
    }, 1500); // Revert after 1.5 seconds
    console.log(`${product.name} added to cart`); // Simple console log for now
  };

  // Prices are already strings like "₹304"
  const sellingPrice = product.price;
  const mrpPrice = product.mrp_price;

  let discountPercentage = 0;
  if (mrpPrice && sellingPrice) {
    const mrp = parseFloat(mrpPrice.replace(/[^\d.-]/g, ''));
    const selling = parseFloat(sellingPrice.replace(/[^\d.-]/g, ''));
    if (mrp > selling) {
      discountPercentage = Math.round(((mrp - selling) / mrp) * 100);
    }
  }

  return (
    // Attach ref and conditionally add 'is-visible' class
    <div ref={ref} className={`product-item ${inView ? 'is-visible' : ''}`}>
      <div className="product-image-container"> 
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <div className="product-price-container">
        <span className="selling-price">{sellingPrice}</span>
        {mrpPrice && sellingPrice && parseFloat(mrpPrice.replace(/[^\d.-]/g, '')) > parseFloat(sellingPrice.replace(/[^\d.-]/g, '')) && (
          <span className="mrp-price">{mrpPrice}</span>
        )}
        {discountPercentage > 0 && (
          <span className="discount-percentage">({discountPercentage}% off)</span>
        )}
      </div>
      {/* Display CountdownTimer if offer_ends_at is present */}
      {product.offer_ends_at && <CountdownTimer targetDate={product.offer_ends_at} />}
      {/* <p className="product-description">{product.description}</p> */}
      {/* Conditionally change button text and add class */}
      <button
        onClick={handleAddToCart}
        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
        disabled={isAdded} // Disable button briefly after adding
      >
        {isAdded ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductItem;
