import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getAllOrders();
        setOrders(response.data);
      } catch (err) {
        setError('Failed to load order history');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center my-5">Loading order history...</div>;
  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card order-card">
                <div className="card-header">
                  <h5>Order #{order._id.slice(-8)}</h5>
                  <span className={`badge ${order.status === 'delivered' ? 'bg-success' : order.status === 'pending' ? 'bg-warning' : 'bg-info'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="card-body">
                  <p><strong>Customer:</strong> {order.customerName}</p>
                  <p><strong>Email:</strong> {order.customerEmail}</p>
                  <p><strong>Address:</strong> {order.deliveryAddress}</p>
                  <p><strong>Total:</strong> Rs.{order.totalAmount}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <div className="order-items">
                    <h6>Items:</h6>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.food?.name || 'Unknown Item'} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;