import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, ArrowLeft, Clock } from 'react-feather';
import { useParams, useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call to fetch product data
    const fetchProduct = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/products/${id}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockProduct = {
          _id: id,
          name: 'Artisan Dark Chocolate Truffles',
          description: 'Handcrafted dark chocolate truffles with a velvety smooth ganache center, dusted with premium cocoa powder. Made with single-origin 70% dark chocolate for a rich, complex flavor profile with notes of red fruit and a hint of spice.',
          price: 24.99,
          category: 'Chocolates',
          image: 'https://picsum.photos/id/20/500/500',
          rating: 4.7,
          stock: 8,
          createdAt: new Date().toISOString()
        };
        
        setProduct(mockProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 text-yellow-400 fill-current opacity-50" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found</div>;
  }

  return (
    <>
      <section className="relative py-12 overflow-hidden bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-pink-600 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to shop
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="relative">
              <div className="relative z-10 bg-white p-6 rounded-3xl shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-pink-100 text-pink-800 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mt-4">
                  {product.name}
                </h1>
                <div className="flex items-center mt-3">
                  <div className="flex mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-600">({product.rating.toFixed(1)})</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </div>

              <div className="text-lg text-gray-600 leading-relaxed">
                <p>{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-pink-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-pink-600"
                  >
                    +
                  </button>
                </div>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                    product.stock > 0
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-pink-500 hover:text-pink-600 transition-all duration-300">
                  Wishlist
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-pink-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-pink-600" />
                    </div>
                    <span className="text-gray-700">Freshly made daily</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">100% Natural Ingredients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            More from our{' '}
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              {product.category}
            </span>{' '}
            collection
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* These would be actual related products in a real app */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-4">
                  <img
                    src={`https://picsum.photos/id/${100 + item}/500/300`}
                    alt={`Related product ${item}`}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Premium {product.category.slice(0, -1)} {item}</h3>
                      <p className="text-gray-600 mt-1">Delicious artisan creation</p>
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full">
                      ${(product.price + item * 2).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/product/${100 + item}`)}
                    className="mt-4 w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;