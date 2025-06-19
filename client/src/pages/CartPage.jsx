// src/pages/CartPage.jsx
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-pink-50 to-orange-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Your <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">Sweet Cart</span>
            </h2>
            {cartCount === 0 ? (
              <p className="text-xl text-gray-600">Your cart is empty</p>
            ) : (
              <p className="text-xl text-gray-600">{cartCount} items in your cart</p>
            )}
          </div>

          {cartCount > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                <div className="divide-y divide-gray-200">
                  {cart.map(item => (
                    <div key={item._id} className="py-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-gray-400 hover:text-pink-600"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-lg font-bold text-gray-800">
                            ${(parseFloat(typeof item.price === 'string'
                              ? parseFloat(item.price.replace(/[^0-9.-]/g, ''))
                              : item.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-pink-600 hover:text-pink-800 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-gray-800">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to={user ? "/checkout" : "/login"}
                  className="mt-6 w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Proceed to Checkout</span>
                </Link>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  or <Link to="/products" className="text-pink-600 hover:underline">Continue Shopping</Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-medium text-gray-800">Your cart is empty</h3>
              <p className="mt-2 text-gray-600">Start adding some sweet treats!</p>
              <Link
                to="/products"
                className="mt-6 inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}