// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import HomePage from './pages/HomePage'
import FeaturedProducts from './components/featured-products'
import About from './components/about'
import Contact from './components/contact'
import Header from './components/header'
import Footer from './components/footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProductsPage from './pages/ProductsPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProductPage from './pages/ProductPage'
import AdminDashboard from './pages/AdminDashboard'
import DeliveryDashboard from './pages/DeliveryDashboard'
import Toaster from 'react-hot-toast'
function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/delivery"
                  element={
                    <ProtectedRoute allowedRoles={['delivery']}>
                      <DeliveryDashboard />
                    </ProtectedRoute>
                  }
                  />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['delivery', 'user', 'admin']}>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App