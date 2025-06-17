// import React from 'react';

// export default function ProductCard({ product, cartItems, setCartItems }) {
//   const addToCart = () => {
//     setCartItems([...cartItems, product]);
//   };

//   return (
//     <div
//       className="rounded-2xl shadow-md p-4 text-white"
//       style={{ background: product.gradient || 'linear-gradient(to right, #f43f5e, #f97316)' }}
//     >
//       <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-xl mb-4" />
//       <h2 className="text-xl font-bold">{product.title}</h2>
//       <div className="mt-2 text-lg">
//         ₹{product.discountedPrice}{' '}
//         <span className="line-through text-sm text-gray-200">₹{product.originalPrice}</span>
//       </div>
//       <button
//         className="mt-4 w-full bg-white text-black py-2 rounded-xl hover:bg-gray-100 font-semibold"
//         onClick={addToCart}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }
import React from 'react';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className={`rounded-xl shadow-lg bg-gradient-to-br ${product.bgGradient} p-4 text-center hover:scale-105 transition-transform duration-300`}>
      <img src={product.imageUrl} alt={product.title} className="h-32 mx-auto mb-2 object-contain" />
      <h4 className="font-bold text-lg text-gray-800 mb-1">{product.title}</h4>
      <div className="text-gray-700 text-sm">
        <span className="font-semibold text-lg">₹ {product.price}</span>
        {product.originalPrice && (
          <span className="line-through ml-2 text-gray-500">₹ {product.originalPrice}</span>
        )}
      </div>
      <button
        className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700"
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
}
