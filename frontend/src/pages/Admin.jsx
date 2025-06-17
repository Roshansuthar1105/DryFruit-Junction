// File: src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Product Management */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product._id} className="bg-white p-4 rounded shadow text-center">
              <img src={product.image} alt={product.title} className="h-24 mx-auto mb-2" />
              <p className="font-bold text-sm">{product.title}</p>
              <p className="text-gray-500 text-xs">₹{product.price}</p>
              <button className="mt-2 text-xs text-red-600 hover:underline">
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Order Management */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Orders</h2>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-green-50 p-4 rounded-lg shadow">
              <p className="font-medium">Customer: {order.name}</p>
              <p className="text-sm text-gray-600">Email: {order.email}</p>
              <p className="text-sm text-gray-600">Phone: {order.phone}</p>
              <p className="text-sm text-gray-600">Items: {order.products.length}</p>
              <p className="text-sm text-gray-600">Location: {order.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}