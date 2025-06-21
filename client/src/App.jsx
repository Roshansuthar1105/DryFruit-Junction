import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Create a wrapper component to handle layout
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDeliveryRoute = location.pathname.startsWith('/delivery');

  return (
    <>
      {!isAdminRoute && !isDeliveryRoute && <Header />}
      {children}
      {!isAdminRoute && !isDeliveryRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={
                    <LayoutWrapper>
                      <HomePage />
                    </LayoutWrapper>
                  } />
                  <Route path="/products" element={
                    <LayoutWrapper>
                      <ProductsPage />
                    </LayoutWrapper>
                  } />
                  <Route path="/products/:id" element={
                    <LayoutWrapper>
                      <ProductPage />
                    </LayoutWrapper>
                  } />
                  <Route path="/login" element={
                    <LayoutWrapper>
                      <Login />
                    </LayoutWrapper>
                  } />
                  <Route path="/signup" element={
                    <LayoutWrapper>
                      <Signup />
                    </LayoutWrapper>
                  } />
                  <Route path="/cart" element={
                    <LayoutWrapper>
                      <CartPage />
                    </LayoutWrapper>
                  } />
                  <Route path="/about" element={
                    <LayoutWrapper>
                      <About />
                    </LayoutWrapper>
                  } />
                  <Route path="/contact" element={
                    <LayoutWrapper>
                      <Contact />
                    </LayoutWrapper>
                  } />

                  {/* Protected Routes */}
                  <Route path="/checkout" element={
                    <LayoutWrapper>
                      <ProtectedRoute allowedRoles={['user', 'admin', 'delivery']}>
                        <CheckoutPage />
                      </ProtectedRoute>
                    </LayoutWrapper>
                  } />

                  <Route path="/dashboard" element={
                    <LayoutWrapper>
                      <UserDashboard />
                    </LayoutWrapper>
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
                  <Route path="*" element={
                    <LayoutWrapper>
                      <NotFound />
                    </LayoutWrapper>
                  } />
                </Routes>
              </Suspense>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;