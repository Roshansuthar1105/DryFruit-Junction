// File: src/pages/UserDashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function UserDashboard() {
  const { cartItems } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch(`${import.meta.env.VITE_API_BASE_URL}/favorites`)
      .then(res => res.json())
      .then(data => setFavorites(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      {/* Orders */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Previous Orders</h2>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders placed yet.</p>
          ) : (
            orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow p-4">
                <p className="font-medium">Name: {order.name}</p>
                <p className="text-sm text-gray-600">Items: {order.products.length}</p>
                <p className="text-sm text-gray-600">Location: {order.location}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Favorites */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Favorites</h2>
        <div className="flex flex-wrap gap-4">
          {favorites.length === 0 ? (
            <p className="text-gray-500">No favorite products yet.</p>
          ) : (
            favorites.map(fav => (
              <div key={fav._id} className="bg-yellow-50 p-4 rounded-xl w-48 text-center shadow">
                <p className="font-medium">{fav.title}</p>
                <img src={fav.image} alt={fav.title} className="h-24 object-contain mx-auto mt-2" />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Cart Summary */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Current Cart</h2>
        <div className="bg-white rounded-xl p-4 shadow">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="list-disc ml-6 space-y-1">
              {cartItems.map(item => (
                <li key={item._id}>{item.title} × {item.quantity}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
