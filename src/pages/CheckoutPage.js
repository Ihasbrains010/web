// Cascade Test Edit: Confirming file modification capability.

import React, { useState } from 'react'; // <-- Import useState
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // <-- Import Link
import { supabase } from '../supabaseClient'; // <-- Import Supabase client
import './CheckoutPage.css'; // We'll create this next

// --- Configuration (Replace with your actual details!) ---
const YOUR_UPI_ID = '9996889429@fam'; // <-- Updated UPI ID
const YOUR_QR_CODE_IMAGE_PATH = '/qr_code.png'; // <-- Corrected QR Code Image Path
const YOUR_EMAIL_ADDRESS = 'your.email@example.com'; // <-- Replace this!
// --------------------------------------------------------

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState('form'); // 'form', 'payment', 'confirmation'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) { // Simple 10 digit validation
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) { // Simple 6 digit validation
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('payment'); // Move to payment step
    }
  };

  const handlePaymentConfirmation = async () => {
    console.log('<<<--- handlePaymentConfirmation function TRIGGERED --->>>');
    setIsLoading(true);
    setError(null);

    const addressParts = [formData.address, formData.city, formData.state, formData.pincode].filter(part => !!part);
    const fullAddress = addressParts.join(', ');

    const orderData = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      user_address: fullAddress,
      order_items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size || null
      })),
      total_amount: cartTotal,
      payment_confirmed: true
    };

    try {
      console.log("Attempting to insert order via handlePaymentConfirmation:", orderData);

      if (!supabase) {
        console.error('Supabase client is not available in CheckoutPage!');
        throw new Error("Supabase client is not initialized.");
      }
      console.log('Supabase client IS available in CheckoutPage.');

      const { data, error: insertError } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        throw insertError;
      }

      console.log("Order submitted successfully via handlePaymentConfirmation:", data);
      clearCart();
      setStep('confirmation');
      setIsSubmitted(true);

    } catch (submissionError) {
      console.error("Error submitting order:", submissionError);
      setError(`Failed to submit order: ${submissionError.message}. Please try again or contact support.`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    // Expects a number, formats to ₹ (e.g., ₹199)
    // Using toLocaleString for potentially better formatting based on locale, though simple concatenation works for INR.
    // We don't have decimal prices right now, so no .toFixed(2) is needed.
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  const generateMailtoBody = () => {
    let body = 'New Order Details:\n\n';
    body += `Name: ${formData.name}\n`;
    body += `Email: ${formData.email}\n`;
    body += `Phone: ${formData.phone}\n`;
    body += `Address: ${formData.address}, ${formData.city}, ${formData.pincode}\n\n`;
    body += 'Items:\n';
    cartItems.forEach(item => {
      body += `- ${item.name} (ID: ${item.id}) x ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    body += `\nTotal Price: ${formatPrice(cartTotal)}\n`;
    body += '\nStatus: Customer confirmed payment via UPI.';
    return encodeURIComponent(body);
  };

  if (cartItems.length === 0 && step !== 'confirmation') {
    return (
        <div className="checkout-page empty-cart-redirect">
            <h2>Your cart is empty.</h2>
            <p>Please add items to your cart before proceeding to checkout.</p>
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="checkout-page centered-message">
        <h2>Thank You! Your Order is Received!</h2>
        <p>Your order details have been recorded, but require manual confirmation.</p>
        <p className="warning-message"><strong>IMPORTANT:</strong> Your order will NOT be processed until you confirm it by phone.</p>
        <p>Please call <strong>9996889429</strong> now to confirm your order details and finalize the process.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* Step 1: Details Form */}
      {step === 'form' && (
        <form onSubmit={handleFormSubmit} className="checkout-form">
          <h2>Shipping Details</h2>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
              {errors.pincode && <p className="error-text">{errors.pincode}</p>}
            </div>
          </div>
          <button type="submit" className="btn-primary">Proceed to Payment</button>
        </form>
      )}

      {/* Step 2: Payment Instructions */}
      {step === 'payment' && (
        <div className="payment-step">
          <h2>Payment Instructions</h2>
          <div className="order-summary-checkout">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <p key={item.id}>{item.name} x {item.quantity} = {formatPrice(item.price * item.quantity)}</p>
            ))}
            <p className="total">Total: {formatPrice(cartTotal)}</p>
            <hr />
            <h3>Deliver To:</h3>
            <p>{formData.name}</p>
            <p>{formData.email}, {formData.phone}</p>
            <p>{formData.address}, {formData.city} - {formData.pincode}</p>
          </div>
          <div className="upi-details">
            <h3>Pay using UPI</h3>
            <p>Please scan the QR code or use the UPI ID below to pay the total amount: <strong>{formatPrice(cartTotal)}</strong></p>
            <p><strong>UPI ID:</strong> {YOUR_UPI_ID}</p>
            <img src={YOUR_QR_CODE_IMAGE_PATH} alt="UPI QR Code" className="upi-qr-code" />
            <p>After completing the payment, please click the button below to confirm your order.</p>
            <button onClick={handlePaymentConfirmation} className="btn-primary confirm-payment-btn">
              I have paid and want to confirm my order
            </button>
             <button onClick={() => setStep('form')} className="btn-secondary">Edit Details</button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 'confirmation' && (
        <div className="confirmation-step">
          <h2>Thank You For Your Order!</h2>
          <p>Your order details have been recorded. We will contact you shortly to confirm.</p>
          <p>Please keep a record of your payment transaction ID.</p>
          <hr />
          <div className="owner-confirmation-details">
            <h3>Order Details (For Owner Reference)</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {`${formData.address}, ${formData.city} - ${formData.pincode}`}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>{item.name}{item.size && ` (Size: ${item.size})`} (ID: {item.id}) x {item.quantity} - {formatPrice(item.price * item.quantity)}</li>
              ))}
            </ul>
            <p><strong>Total Paid (Expected):</strong> {formatPrice(cartTotal)}</p>
            <hr />
            {/* Mailto link for easy email generation */}
            <a
              href={`mailto:${YOUR_EMAIL_ADDRESS}?subject=New Claudia Order - ${formData.name}&body=${generateMailtoBody()}`}
              className="btn-secondary email-owner-btn"
              target="_blank" rel="noopener noreferrer"
            >
              Send Order Details to Owner Email
            </a>
            <p className="small-note">(Clicking above will open your email client with pre-filled details)</p>
          </div>
          <Link to="/" onClick={clearCart} className="btn-primary back-home-btn">Back to Homepage</Link>
        </div>
      )}

    </div>
  );
}

export default CheckoutPage;
