import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const MiniCartSnackbar = ({ cartItems, onNavigate, onClose }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Auto-disappear after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts or closes manually
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl p-6 w-80 transform transition-all duration-500 ease-out animate-slide-in-up">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <CheckCircle size={24} className="text-green-500 mr-2" /> Item added to cart!
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      <div className="max-h-40 overflow-y-auto pr-2 mb-4 custom-scrollbar">
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex justify-between items-center text-sm text-gray-700 py-1">
            <span>{item.name} ({item.selectedSize}, {item.selectedColor}) x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total ({totalItems} items):</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={() => { onNavigate('cart'); onClose(); }}
          className="bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
        >
          View Cart
        </button>
        <button
          onClick={() => { onNavigate('checkout'); onClose(); }}
          className="border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};
export default MiniCartSnackbar;