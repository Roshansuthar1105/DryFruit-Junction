import Hero from "../components/Hero"
import FeaturedProducts from "../components/Featured-products"
import About from "../components/About"
import Contact from "../components/Contact"
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
