// File: src/pages/Cart.jsx
import React from 'react';

export default function Cart({ cartItems, removeFromCart, clearCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded" />
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-500">₹ {item.price} x {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <h3 className="text-xl font-bold">Total: ₹ {total.toFixed(2)}</h3>
            <div className="space-x-2">
              <button onClick={clearCart} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Clear Cart
              </button>
              <a href="/checkout" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Checkout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
