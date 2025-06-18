// import Link from "next/link"
import { Heart, Facebook, Instagram, Twitter, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Sweet Delights
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Crafting exceptional confections with love and tradition for over three generations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-pink-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/catering" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Catering
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Sweets</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/chocolates" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Chocolates
                </Link>
              </li>
              <li>
                <Link to="/macarons" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Macarons
                </Link>
              </li>
              <li>
                <Link to="/fudge" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Fudge
                </Link>
              </li>
              <li>
                <Link to="/bonbons" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Bonbons
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-gray-400 hover:text-pink-400 transition-colors">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>123 Sweet Street</p>
              <p>Sweet City, SC 12345</p>
              <p>(555) 123-SWEET</p>
              <p>hello@sweetdelights.com</p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-white mb-2">Store Hours</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Mon-Fri: 8AM - 8PM</p>
                <p>Sat: 9AM - 9PM</p>
                <p>Sun: 10AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Sweet Delights. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-pink-400 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
