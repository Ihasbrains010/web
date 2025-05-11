import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import products from '../data/products'; // Import sample data
import ProductItem from '../components/ProductItem'; // Import the item component
import './ProductsPage.css'; // Import styles for the page

function ProductsPage() {
  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="product-list"> {/* Container for product items */} 
        {products.map(product => (
          // Wrap ProductItem in Link
          <Link 
            key={product.id} // Key goes on the outermost element
            to={`/products/${product.id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }} // Prevent default link styles
            className="product-link-wrapper" // Optional: Add class for potential styling
          >
            <ProductItem product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
