import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from local storage on initial load
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to create a unique ID for cart items based on product and size
  const generateCartItemId = (productId, size) => {
    return size ? `${productId}-${size}` : `${productId}-default`; // Use '-default' if no size
  };

  // Helper function to parse price string (e.g., "₹199") to a number (e.g., 199)
  const parsePrice = (priceString) => {
    if (typeof priceString === 'string') {
      const numberString = priceString.replace(/[^\d.-]/g, '');
      // If numberString is empty or cannot be parsed, default to 0
      return parseFloat(numberString) || 0;
    }
    // If it's already a number, return it. If undefined, it returns undefined (which might need to be handled if product.price can be undefined)
    // However, product.price from products.js should always be a string like "₹XXX"
    return typeof priceString === 'number' ? priceString : 0; // Default to 0 if not string or number
  };

  const addToCart = (product, quantity = 1, size = null) => {
    const cartItemId = generateCartItemId(product.id, size);
    const numericalPrice = parsePrice(product.price); // Parse the price here

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.cartItemId === cartItemId);

      if (existingItemIndex > -1) {
        // Item with same product ID and size exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item with product details, quantity, size, and cartItemId
        // Store the PARSED numerical price
        return [...prevItems, { ...product, price: numericalPrice, quantity, size, cartItemId }];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: Math.max(1, newQuantity) } : item // Ensure quantity is at least 1
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // cartTotal should now work correctly as item.price in cartItems is a number
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Value provided by the context
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
