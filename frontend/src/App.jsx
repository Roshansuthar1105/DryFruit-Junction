// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import UserDashboard from './pages/UserDashboard';
import UserDetails from './pages/UserDetails';
import Admin from './pages/Admin';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <Routes>
        <Route
          path="/"
          element={<Home cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/products"
          element={<Products cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/auth" element={<UserDetails />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
