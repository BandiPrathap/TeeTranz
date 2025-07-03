import React from 'react';
import { Plus, Minus, X } from 'lucide-react';


const CartPage = ({ cart, onNavigate, onUpdateQuantity, onRemoveFromCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 0 ? 5.00 : 0; // Simple flat rate shipping
  const total = subtotal + shippingCost;

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <button onClick={() => onNavigate('shop')} className="text-indigo-600 hover:underline">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/96x96/E0FFFF/000?text=Item`;
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  <p className="text-md font-bold text-indigo-700">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2 mr-4">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.id, item.selectedSize, item.selectedColor)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t border-gray-200 pt-4 mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold mt-8 hover:bg-indigo-700 transition-colors shadow-md"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg text-lg font-semibold mt-4 hover:bg-indigo-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;