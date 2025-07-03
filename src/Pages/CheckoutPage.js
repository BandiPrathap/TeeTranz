import React, { useState, useEffect } from 'react';
import { Truck, Package } from 'lucide-react';

const CheckoutPage = ({ onNavigate, cart, setCart }) => {
  const totalSteps = 2;

  // 🔄 Load from localStorage on first render
  const savedData = JSON.parse(localStorage.getItem('checkoutData')) || {};
  const [currentStep, setCurrentStep] = useState(savedData.currentStep || 1);
  const [fullName, setFullName] = useState(savedData.fullName || '');
  const [address, setAddress] = useState(savedData.address || '');
  const [city, setCity] = useState(savedData.city || '');
  const [zip, setZip] = useState(savedData.zip || '');

  // 🔁 Sync form data to localStorage whenever it changes
  useEffect(() => {
    const checkoutData = {
      currentStep,
      fullName,
      address,
      city,
      zip
    };
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
  }, [currentStep, fullName, address, city, zip]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      const locationQuery = `${address}, ${city}, ${zip}`;
      const mapsURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`;

      const itemList = cart.map(
        item => `- ${item.name} (${item.selectedSize}, ${item.selectedColor}) x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const message = `
📦 *New T-Shirt Order*
👤 *Name:* ${fullName}
🏠 *Address:* ${address}, ${city}, ${zip}

📍 *Location:* ${mapsURL}

🛍️ *Items Ordered:*
${itemList}

💰 *Total:* $${calculateTotal()}
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      const phone = "919573188570";
      const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

      window.open(whatsappURL, "_blank");

      localStorage.removeItem('cart');
      localStorage.removeItem('checkoutData'); // 🧹 Clear checkout info

      setCart([]);
      onNavigate('home');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('cart');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20 text-xl font-medium text-gray-700">
        Your cart is empty. <button className="text-indigo-600 underline" onClick={() => onNavigate('shop')}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>

      {/* Progress */}
      <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
            1
          </div>
          <span className="text-sm mt-2 text-gray-700">Shipping</span>
        </div>
        <div className={`flex-1 h-1 bg-gray-300 mx-2 ${currentStep > 1 ? 'bg-indigo-400' : ''}`}></div>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
            2
          </div>
          <span className="text-sm mt-2 text-gray-700">Review</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Truck size={24} className="mr-3" /> Shipping Information
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded w-full py-2 px-3"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                    placeholder="Anytown"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="border rounded w-full py-2 px-3"
                    placeholder="12345"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Package size={24} className="mr-3" /> Order Review
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Shipping To:</strong> {fullName}, {address}, {city}, {zip}</p>

              <div className="flex justify-between items-center mb-2 mt-6">
                <h3 className="text-xl font-bold">Items:</h3>
                <button
                  onClick={() => onNavigate('cart')}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  Edit Items
                </button>
              </div>

              <ul className="list-disc pl-5 space-y-2">
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.name} ({item.selectedSize}, {item.selectedColor}) x {item.quantity} - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            {currentStep === 1 ? 'Back to Cart' : 'Previous'}
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentStep === totalSteps ? 'Place Order' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
