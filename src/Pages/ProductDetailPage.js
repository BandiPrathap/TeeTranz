import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, CheckCircle,Minus,Plus } from 'lucide-react';
import allProducts from '../Data/Products';
import ProductCard from '../components/Products/ProductCard';
import StarRating from '../components/Products/StarRating'; // Assuming you have a StarRating component


const ProductDetailPage = ({ productId, onNavigate, onAddToCart, onProductClick }) => { // Added onProductClick here
  const product = allProducts.find(p => p.id === productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartConfirmation, setShowAddToCartConfirmation] = useState(false);

  useEffect(() => {
    // Reset selections when product changes
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
      setQuantity(1);
      setSelectedImageIndex(0);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="container mx-auto px-6 md:px-12 py-16 text-center text-gray-600">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => onNavigate('shop')} className="text-indigo-600 hover:underline">
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color.'); // Using alert for simplicity as per instructions
      return;
    }
    onAddToCart({ ...product, selectedSize, selectedColor, quantity });
    setShowAddToCartConfirmation(true);
    setTimeout(() => setShowAddToCartConfirmation(false), 2000); // Hide after 2 seconds
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const recommendedProducts = allProducts.filter(p => p.id !== productId && p.category === product.category).slice(0, 3);

  return (
    <div className="container mx-auto px-6 md:px-12 py-8">
      <button onClick={() => onNavigate('shop')} className="flex items-center text-indigo-600 hover:underline mb-6">
        <ChevronLeft size={20} className="mr-1" /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-lg">
        {/* Product Image Gallery */}
        <div>
          <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={product.images[selectedImageIndex]}
              alt={`${product.name} - View ${selectedImageIndex + 1}`}
              style={{ objectFit: 'cover', objectPosition: 'center' ,width: '100%', height: '100%' ,backgroundSize: 'cover'}}
              className="max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x600/E0FFFF/000?text=${encodeURIComponent(product.name)}`;
              }}
            />
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev + 1) % product.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${index === selectedImageIndex ? 'border-indigo-600 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                onClick={() => setSelectedImageIndex(index)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/80x80/E0FFFF/000?text=Img${index + 1}`;
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-2 capitalize">{product.category} T-Shirt</p>
          <div className="flex items-center mb-4">
            <StarRating rating={product.rating} />
            {product.numReviews > 0 ? (
              <span className="text-sm text-gray-600 ml-2">({product.numReviews} Reviews)</span>
            ) : (
              <span className="text-sm text-gray-600 ml-2">No Reviews Yet</span>
            )}
          </div>
          <p className="text-5xl font-extrabold text-indigo-700 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Size:</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-3 rounded-lg border-2 text-lg font-medium transition-all duration-200 ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-800 border-gray-300 hover:border-indigo-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Color:</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${selectedColor === color ? 'border-indigo-600 shadow-md' : 'border-gray-300 hover:border-indigo-400'}`}
                  style={{ backgroundColor: color.toLowerCase().replace(/\s/g, '') }} // Simple color mapping
                  title={color}
                >
                  {/* For white color, add a border to make it visible */}
                  {color.toLowerCase() === 'white' && <div className="absolute inset-0 rounded-full border border-gray-300"></div>}
                  {selectedColor === color && <CheckCircle size={24} className="text-white drop-shadow-lg" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity:</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors duration-200"
              >
                <Minus size={20} />
              </button>
              <span className="text-2xl font-bold text-gray-800 w-10 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors duration-200"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full bg-indigo-600 text-white py-4 rounded-lg text-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 transform ${showAddToCartConfirmation ? 'scale-105' : ''}`}
          >
            {showAddToCartConfirmation ? (
              <>
                <CheckCircle size={24} />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={24} />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Product Details & Reviews */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{product.details}</p>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews ({product.numReviews})</h3>
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <StarRating rating={review.rating} />
                      <span className="font-semibold text-gray-800 ml-3">{review.user}</span>
                    </div>
                    <p className="text-gray-700 italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      {recommendedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;