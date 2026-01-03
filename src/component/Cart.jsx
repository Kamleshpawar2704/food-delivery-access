import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, placeOrder, loading, error }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (!deliveryAddress || deliveryAddress.trim().length < 10) {
      alert('Please enter a valid delivery address (at least 10 characters).');
      return;
    }
    placeOrder(deliveryAddress);
    setShowModal(false);
    setDeliveryAddress('');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-icon">
        <i className="bi bi-bag"></i>
        <span className="cart-count">0</span>
      </div>
    );
  }

  return (
    <>
      <div className="cart-icon" onClick={() => setShowModal(true)}>
        <i className="bi bi-bag"></i>
        <span className="cart-count">{cart.length}</span>
      </div>

      {showModal && (
        <div className="cart-modal">
          <div className="cart-modal-content">
            <div className="cart-modal-header">
              <h5>Your Cart</h5>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <img src={item.image || '/Image/Illustration/default-food.png'} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h6>{item.name}</h6>
                    <p>Rs.{item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <strong>Total: Rs.{totalAmount}</strong>
            </div>
            <div className="delivery-address">
              <label>Delivery Address:</label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
                required
              />
            </div>
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;