// src/components/ProductCard.jsx
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { user } = useAuth()

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product._id}`}>
          <img
            src={product?.images?.[0]?.url}
            alt={product?.images?.[0]?.alt || product.name}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>
        <button
          onClick={() => {
            if (user) {
              toggleFavorite(product)
            } else {
              // Optionally show a toast/modal suggesting to login
            }
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isFavorite(product._id)
              ? 'bg-pink-100 text-pink-600'
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-pink-50'
            }`}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite(product._id) ? 'fill-pink-600' : ''
              }`}
          />
        </button>
      </div>

      <div className="p-6">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
            ₹{product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="cursor-pointer bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}