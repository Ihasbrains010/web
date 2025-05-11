import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import heroImage from './a group.jpg'; // Import the image from components dir

function HeroSection() {
  // Use the imported image
  const heroImageUrl = heroImage;

  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroImageUrl})` }}>
      <div className="hero-content">
        <h1 className="hero-headline">Timeless Elegance, Modern Style</h1>
        <p className="hero-subheadline">Discover the new collection from Claudia.</p>
        <Link to="/products" className="hero-cta-button">Shop Now</Link>
      </div>
    </div>
  );
}

export default HeroSection;
