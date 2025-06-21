// HomePage.jsx
import { useState } from 'react';
import Hero from "../components/hero"
import FeaturedProducts from "../components/featured-products"
import About from "../components/about"
import Contact from "../components/contact"
import BrandStory from "../components/BrandStory"; // New component

export default function HomePage() {
  const [showBrandStory, setShowBrandStory] = useState(false);

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <About onShowBrandStory={() => setShowBrandStory(true)} />
      {showBrandStory && (
        <BrandStory onClose={() => setShowBrandStory(false)} />
      )}
      <Contact />
    </main>
  )
}