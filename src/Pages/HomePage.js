import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Shirt, Search, User, ChevronLeft, ChevronRight, Star, Plus, Minus, CheckCircle, Truck, CreditCard, Package, Heart, Filter, MapPin, Phone, Mail } from 'lucide-react';
import allProducts from '../Data/Products';
import categories from '../Data/Categories';
import ProductCard from '../components/Products/ProductCard';

const HomePage = ({ onNavigate, onProductClick }) => {
  const heroImages = [
    { src: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7986e1157917085.6381d9a6482a4.jpg', alt: 'Summer Collection' },
    { src: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/26c0ad196878507.662771f84bb4d.jpg', alt: 'Graphic Tees' },
    { src: 'https://i.pinimg.com/originals/d4/a8/fa/d4a8faa6147ef48adf272d83e2eb279e.jpg', alt: 'Comfort Tees' },
  ];
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const featuredProducts = allProducts.slice(0, 6); // Display first 6 as featured

  return (
    <main>
      {/* Hero Carousel */}
      <section className="relative w-full h-[400px] md:h-[550px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 duration-1000 ease-in-out ${index === currentHeroImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center', objectFit: 'cover' }}
          >
            <div className="absolute inset-0  flex items-center justify-center text-center p-4">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">
                  {image.alt.split(' - ')[0]}
                </h1>
                <p className="text-lg md:text-xl mb-8 object-contain">
                  {image.alt.split(' - ')[1] || 'Discover your next favorite tee.'}
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-white text-indigo-700 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-indigo-50 transition-colors duration-300 transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHeroImageIndex ? 'bg-white w-6' : 'bg-gray-400'}`}
              onClick={() => setCurrentHeroImageIndex(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col items-center justify-center"
                onClick={() => onNavigate('shop', { category: cat.id })}
              >
                <Shirt size={48} className="text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Featured T-Shirts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 animate-pulse">Limited Time Offer!</h2>
          <p className="text-lg md:text-2xl mb-8">Get 20% off on all Graphic Tees. Use code: **GRAPHIC20**</p>
          <button
            onClick={() => onNavigate('shop', { category: 'graphic' })}
            className="bg-white text-purple-700 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-purple-100 transition-all duration-300 transform hover:scale-110"
          >
            Shop Graphic Tees
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;