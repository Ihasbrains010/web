import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products'; // Import the product data
import { useCart } from '../context/CartContext';
import CountdownTimer from '../components/CountdownTimer'; // Import the CountdownTimer component
import './ProductDetailPage.css'; // We will create this CSS file next

function ProductDetailPage() {
  const { productId } = useParams(); // Get productId from URL
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity selection
  const [selectedSize, setSelectedSize] = useState(''); // State for selected size
  const [isAdded, setIsAdded] = useState(false); // State for button feedback

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id.toString() === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default size if sizes exist
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  }, [productId, navigate]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (product) {
      // Pass product, quantity, and selectedSize to the updated context function
      // Use null if no size is selected or available (though we default it)
      addToCart(product, quantity, selectedSize || null);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }
  };

  // Prices are already strings like "₹304"
  const sellingPrice = product?.price;
  const mrpPrice = product?.mrp_price;

  let discountPercentage = 0;
  if (mrpPrice && sellingPrice) {
    const mrp = parseFloat(mrpPrice.replace(/[^\d.-]/g, ''));
    const selling = parseFloat(sellingPrice.replace(/[^\d.-]/g, ''));
    if (mrp > selling) {
      discountPercentage = Math.round(((mrp - selling) / mrp) * 100);
    }
  }

  if (!product) {
    // Display a loading message or a 'product not found' message
    return <div className="product-detail-page loading">Loading product details...</div>;
    // Or return <div className="product-detail-page not-found">Product not found. <Link to="/products">Go back to products</Link></div>;
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.name}
      </div>
      <div className="product-detail-content">
        <div className="product-image-gallery">
          {/* Placeholder for potential multiple images/gallery */}
          <img src={product.imageUrl} alt={product.name} className="main-product-image" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          {/* Price display updated here */}
          <div className="product-price-container-detail">
            <span className="selling-price-detail">{sellingPrice}</span>
            {mrpPrice && sellingPrice && parseFloat(mrpPrice.replace(/[^\d.-]/g, '')) > parseFloat(sellingPrice.replace(/[^\d.-]/g, '')) && (
              <span className="mrp-price-detail">{mrpPrice}</span>
            )}
            {discountPercentage > 0 && (
              <span className="discount-percentage-detail">({discountPercentage}% off)</span>
            )}
          </div>
          {/* Display CountdownTimer if offer_ends_at is present */}
          {product.offer_ends_at && <CountdownTimer targetDate={product.offer_ends_at} />}

          <p className="product-description-detail">{product.description}</p>

          {/* Size Selector - Conditionally Rendered */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="size-selector">
              <label htmlFor="size">Select Size:</label>
              <select id="size" name="size" value={selectedSize} onChange={handleSizeChange}>
                {product.sizes.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className={`add-to-cart-btn-detail ${isAdded ? 'added' : ''}`}
              disabled={isAdded}
            >
              {isAdded ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
          {/* Optional: Add category link */}
          {/* <p className="product-category">Category: <Link to={`/category/${product.category}`}>{product.category}</Link></p> */}
        </div>
      </div>

      {/* Reviews Section - Conditionally Rendered */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section">
          <h2 className="reviews-title">Customer Reviews</h2>
          {product.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <span className="review-author">{review.user}</span>
                {review.rating && (
                  <span className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                )}
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
