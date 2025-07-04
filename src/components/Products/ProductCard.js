import React from 'react';
import { Heart } from 'lucide-react';
import StarRating from './StarRating'; // Assuming you have a StarRating component

const ProductCard = ({ product, onProductClick }) => (
  <div
    className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer flex flex-col"
    onClick={() => onProductClick(product.id)}
  >
    <div className="relative w-full h-60 overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.name}
        style={{ objectFit: 'cover', objectPosition: 'center' , width: '100%', height: '100%',backgroundSize: 'cover'}}
        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x600/E0FFFF/000?text=${encodeURIComponent(product.name)}`;
        }}
      />
      <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-red-500 hover:scale-110 transition-transform duration-200">
        <Heart size={20} />
      </button>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-2 capitalize">{product.category} T-Shirt</p>
      <div className="flex items-center mb-3">
        <StarRating rating={product.rating} />
        {/* {product.numReviews > 0 && <span className="text-sm text-gray-600 ml-2">({product.numReviews})</span>} */}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-bold text-indigo-700">${product.price.toFixed(2)}</span>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200 shadow-md">
          View More
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;