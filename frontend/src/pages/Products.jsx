// File: src/pages/Products.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //   fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
    fetch(`http://localhost:5000/api/products`)
      .then(res => res.json())
      .then(data => {console.log(data.data);setProducts(data.data)})
      .catch((err)=>console.log("Error in products page : ",err))
      
  }, []);

  return (
    <div className="px-6 pt-4">
      {/* Banner */}
      <div className="w-full bg-gradient-to-br from-orange-100 to-red-200 rounded-xl mb-8 p-6 text-center">
        <h1 className="text-4xl font-bold text-red-700">HOT SAUCES</h1>
        <p className="text-lg text-gray-600">Mild. Spicy. Fiery.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-6">
        <aside className="w-1/4 hidden md:block">
          <div className="bg-white p-4 shadow rounded-xl">
            <h3 className="font-semibold text-lg mb-4">Filter</h3>
            {/* Add price slider, category checkboxes, etc. */}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {products.map(product => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Explore Categories */}
      <section className="bg-green-100 my-10 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Explore other Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-4 rounded-xl shadow">Combos</div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow">Dips</div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow">Dressings</div>
        </div>
      </section>

      {/* You Might Also Like */}
      <section className="my-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">You Might Also Like</h2>
        <div className="overflow-x-auto flex gap-4">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
