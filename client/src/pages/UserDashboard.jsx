import { useState, useEffect } from 'react'
import { Heart, ShoppingBag, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import axios from 'axios'

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const { favorites } = useFavorites()
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [errorOrders, setErrorOrders] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true)
      const VITE_API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
      try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`${VITE_API_BASE_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log("daat",data)
        setOrders(data.reverse()) // show latest first
      } catch (error) {
        console.log(error)
        setErrorOrders(
          error.response?.data?.message || 'Failed to load orders'
        )
      }
      setLoadingOrders(false)
    }

    fetchOrders()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'orders'
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'favorites'
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className="h-5 w-5" />
                <span>Favorites ({favorites.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'account'
                    ? 'bg-pink-50 text-pink-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Account Settings</span>
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
                {loadingOrders ? (
                  <p className="text-gray-500">Loading orders...</p>
                ) : errorOrders ? (
                  <p className="text-red-500">{errorOrders}</p>
                ) : orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order._id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            {/* <h3 className="font-bold text-gray-800">Order #{order.orderNumber}</h3> */}
                            <h3 className="font-bold text-gray-800">Order #{order._id}</h3>
                            {/* <h3 className="font-bold text-gray-800">Order #{order._id.slice(-6)}</h3> */}
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.orderStatus === 'delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {order.orderStatus || 'Processing'}
                            </span>
                            <span className="font-bold text-gray-800">
                              ₹{order.totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="bg-gray-100 w-12 h-12 rounded-lg" />
                                <div>
                                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="text-gray-800">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-2 text-gray-500">Your order history will appear here</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>
                {favorites.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(product => (
                      <div key={product._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="bg-gray-100 h-40 rounded-lg mb-4"></div>
                        <h3 className="font-bold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="font-bold text-pink-600">{product.price}</span>
                          <button className="text-pink-600 hover:text-pink-800">
                            <Heart className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No favorites yet</h3>
                    <p className="mt-2 text-gray-500">Save your favorite products here</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'account' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        defaultValue={user?.firstName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        defaultValue={user?.lastName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-md transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}