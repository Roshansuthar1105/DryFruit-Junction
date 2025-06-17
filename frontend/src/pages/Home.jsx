// import React, { useEffect, useState } from 'react';
// import ProductCard from '../components/ProductCard';
// import Hero from '../components/Hero';
// import Categories from '../components/Categories';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// export default function Home({ cartItems, setCartItems }) {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('/api/products')
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

//   return (
//     <>
//       <Navbar cartCount={cartItems.length} />
//       <main className="p-4">
//         <Hero />
//         <Categories />
//         <h3 className="text-xl font-semibold my-4">🍩 Popular Sweets</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.map(product => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               cartItems={cartItems}
//               setCartItems={setCartItems}
//             />
//           ))}
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
// File: src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SweetCart</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-500">Products</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-500">Cart</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-100 to-red-100 py-16 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-red-700 mb-4">Delicious Sweets Delivered Fast</h2>
        <p className="text-lg text-gray-600 mb-6">Order your favorite sweets without logging in!</p>
        <Link to="/products" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg">
          Browse Products
        </Link>
      </section>

      {/* Features */}
      <section className="py-12 px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">No Login Needed</h3>
          <p className="text-gray-600">Add to cart & checkout seamlessly.</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Customizable Products</h3>
          <p className="text-gray-600">Choose weight, size, packaging, and more.</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">Mobile-Friendly</h3>
          <p className="text-gray-600">Responsive design for smooth experience.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">© 2025 SweetCart. All rights reserved.</p>
          <div className="space-x-4 mt-2 sm:mt-0">
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
