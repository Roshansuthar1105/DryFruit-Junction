// import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Chocolate Truffles",
    description: "Rich, velvety chocolate truffles dusted with cocoa powder",
    price: "$24.99",
    image: "https://picsum.photos/id/11/2500/1667",
    category: "Chocolates",
  },
  {
    id: 2,
    name: "Artisan Macarons",
    description: "Delicate French macarons in assorted flavors",
    price: "$18.99",
    image: "https://picsum.photos/id/11/2500/1667",
    category: "Macarons",
  },
  {
    id: 3,
    name: "Gourmet Fudge",
    description: "Creamy homemade fudge with premium ingredients",
    price: "$16.99",
    image: "https://picsum.photos/id/11/2500/1667",
    category: "Fudge",
  },
  {
    id: 4,
    name: "Caramel Bonbons",
    description: "Smooth caramel centers wrapped in fine chocolate",
    price: "$22.99",
    image: "https://picsum.photos/id/11/2500/1667",
    category: "Bonbons",
  },
  {
    id: 5,
    name: "Fruit Jellies",
    description: "Natural fruit jellies bursting with real fruit flavors",
    price: "$14.99",
    image: "https://picsum.photos/id/11/2500/1667",
    category: "Jellies",
  },
  {
    id: 6,
    name: "Praline Collection",
    description: "Assorted pralines with nuts and caramel",
    price: "$26.99",
    image: "https://picsum.photos/id/11/2500/1667",
    category: "Pralines",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our Sweet{" "}
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of handcrafted confections, each made with the finest ingredients
            and traditional techniques.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-pink-500" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}
