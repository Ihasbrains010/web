import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import ProductItem from './ProductItem';
import './FeaturedProducts.css';
import { useInView } from 'react-intersection-observer';

function FeaturedProducts() {
  // Select the first 3 products as featured items (adjust as needed)
  const featured = products.slice(0, 3);

  // useInView hook for the section
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when section starts entering viewport
  });

  return (
    // Attach ref and conditionally add 'is-visible' class
    <section ref={ref} className={`featured-products-section ${inView ? 'is-visible' : ''}`}>
      <h2 className="section-title">Featured Products</h2>
      <div className="featured-products-list">
        {featured.map(product => (
          <Link
            key={product.id} 
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }} 
            className="product-link-wrapper" 
          >
            <ProductItem product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
