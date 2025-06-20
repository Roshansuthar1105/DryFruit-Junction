import { Star, Award, Clock } from "lucide-react"
// import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Handcrafted
                </span>
                <br />
                <span className="text-gray-800">Sweet Delights</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Indulge in our artisan-made confections, crafted with premium ingredients and generations of family
                recipes. Every bite tells a story of passion and tradition.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-pink-600" />
                </div>
                <span className="text-gray-700 font-medium">Award Winning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-gray-700 font-medium">5-Star Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Fresh Daily</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Shop Our Sweets
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-pink-500 hover:text-pink-600 transition-all duration-300">
                View Menu
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 px-5">
              <img
                src="https://images.unsplash.com/photo-1695568181747-f54dff1d4654?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwc3dlZXRzfGVufDB8fDB8fHww"
                alt="Delicious handcrafted sweets and confections"
                width={500}
                height={600}
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
