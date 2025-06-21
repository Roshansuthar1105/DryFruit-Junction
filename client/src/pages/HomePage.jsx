import Hero from "../components/hero"
import FeaturedProducts from "../components/featured-products"
import About from "../components/about"
import Contact from "../components/contact"
import ProductsPage from "./ProductsPage"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      {/* <ProductsPage /> */}
      <About />
      <Contact />
    </main>
  )
}
