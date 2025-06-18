import { useState } from "react"
// import Link from "next/link"
import { Menu, X, ShoppingBag, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <nav className="hidden md:flex items-center space-x-8">
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
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Order Now</span>
            </button>
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
              <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 w-full">
                <ShoppingBag className="h-4 w-4" />
                <span>Order Now</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
