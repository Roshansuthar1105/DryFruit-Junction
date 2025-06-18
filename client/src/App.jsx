import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
// import ProductsPage from './pages/ProductsPage'
// import AboutPage from './pages/AboutPage'
// import ContactPage from './pages/ContactPage'
import FeaturedProducts from './components/featured-products'
import About from './components/about'
import Contact from './components/contact'
import Header from './components/header'
import Footer from './components/footer'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<FeaturedProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App