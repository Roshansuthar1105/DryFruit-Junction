import React from 'react';

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-pink-600">🍬 SweetCart</h1>
      <div className="text-gray-700">
        🛒 Cart ({cartCount})
      </div>
    </nav>
  );
}
