import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts'; 

function HomePage() {
  return (
    <div>
      <HeroSection /> 
      <FeaturedProducts /> 
      {/* Optional: Add other sections below */}
      <div style={{ textAlign: 'center', padding: '2rem' }}> 
        <h2>Featured Collections</h2>
        <p>Explore our curated selections.</p>
        {/* Add featured product components or links here */} 
      </div>
    </div>
  );
}

export default HomePage;
