import React, { useState, useEffect } from 'react';

export default function CheckoutForm({ cartItems, clearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
  });

  useEffect(() => {
    // Auto-fetch location (dummy for now)
    navigator.geolocation?.getCurrentPosition(pos => {
      setFormData(prev => ({
        ...prev,
        location: `Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`,
      }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = { ...formData, items: cartItems };
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    if (res.ok) {
      alert('Order placed successfully!');
      clearCart();
    } else {
      alert('Failed to place order.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded-xl">
      {['name', 'phone', 'email'].map(field => (
        <input
          key={field}
          type="text"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full mb-2 p-2 rounded border"
          required
        />
      ))}
      <textarea
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full mb-2 p-2 rounded border"
      />
      <button
        type="submit"
        className="bg-green-600 w-full text-white py-2 rounded-xl hover:bg-green-700"
      >
        Place Order
      </button>
    </form>
  );
}
