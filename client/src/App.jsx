// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load main components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const About = lazy(() => import('./components/about'));
const Contact = lazy(() => import('./components/contact'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const DeliveryDashboard = lazy(() => import('./pages/DeliveryDashboard'));
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Header />
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Protected Routes */}
                  <Route path="/checkout" element={
                    <ProtectedRoute allowedRoles={['user', 'admin','delivery']}>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/dashboard" element={
                    <ProtectedRoute allowedRoles={['user', 'admin', 'delivery']}>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />

                  <Route path="/delivery" element={
                    <ProtectedRoute allowedRoles={['delivery']}>
                      <DeliveryDashboard />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/*" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminRoutes />
                    </ProtectedRoute>
                  } />

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Footer />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;