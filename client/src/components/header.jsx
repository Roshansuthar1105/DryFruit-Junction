// src/components/header.jsx
import { useState } from "react"
import { Menu, X, ShoppingBag, Heart, User, LogIn } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cartCount } = useCart()

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Sweet Delights
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Contact
            </Link>
            
            {/* Conditional auth links */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors">
                  <User className="h-5 w-5 mr-1" />
                  Account
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors">
                  <LogIn className="h-5 w-5 mr-1" />
                  Login
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-pink-600 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Cart */}
            <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-pink-600 transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Products
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                Contact
              </Link>
              
              {/* Conditional auth links */}
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                    My Account
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-700 hover:text-pink-600 transition-colors font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                    Login
                  </Link>
                  <Link to="/signup" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
                    Sign Up
                  </Link>
                </>
              )}
              
              <Link to="/cart" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors font-medium">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}