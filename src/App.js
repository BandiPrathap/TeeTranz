import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Shirt, Search, User, ChevronLeft, ChevronRight, Star, Plus, Minus, CheckCircle, Truck, CreditCard, Package, Heart, Filter, MapPin, Phone, Mail } from 'lucide-react';
import HomePage from './Pages/HomePage';
import ShopPage from './Pages/ShopPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import MiniCartSnackbar from './components/MiniCartSnackbar';
import Logo from './images/Logo.jpg';


// --- Main App Component ---
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // home, shop, productDetail, cart, checkout
  const [selectedProductId, setSelectedProductId] = useState(null);
    const [cart, setCart] = useState(() => {
    // ✅ Load cart from localStorage on initial render
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [initialShopFilters, setInitialShopFilters] = useState({});
  const [showMiniCartSnackbar, setShowMiniCartSnackbar] = useState(false);
  const [miniCartTimeoutId, setMiniCartTimeoutId] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    if (page === 'productDetail' && params.productId) {
      setSelectedProductId(params.productId);
    } else {
      setSelectedProductId(null);
    }
    if (page === 'shop' && params.category) {
      setInitialShopFilters({ category: params.category });
    } else {
      setInitialShopFilters({});
    }
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === productToAdd.id &&
          item.selectedSize === productToAdd.selectedSize &&
          item.selectedColor === productToAdd.selectedColor
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += productToAdd.quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...productToAdd }];
      }
    });

    // Show mini cart snackbar
    setShowMiniCartSnackbar(true);
    // Clear any existing timeout
    if (miniCartTimeoutId) {
      clearTimeout(miniCartTimeoutId);
    }
    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      setShowMiniCartSnackbar(false);
    }, 10000); // 10 seconds
    setMiniCartTimeoutId(newTimeoutId);
  };

  const handleUpdateQuantity = (productId, size, color, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter(
          (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
        );
      }
      return prevCart.map((item) =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const handleRemoveFromCart = (productId, size, color) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };


  return (
    <div className="font-sans antialiased bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 md:px-12 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-extrabold text-indigo-700 cursor-pointer" onClick={() => navigateTo('home')}>
            <img src={Logo} height={50} width={50} className='rounded-full shadow object-cover'/>
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a onClick={() => navigateTo('home')} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 cursor-pointer">Home</a>
            <a onClick={() => navigateTo('shop')} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 cursor-pointer">Shop</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">About Us</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">Contact</a>
          </nav>

          {/* Icons: Search, User, Cart */}
          <div className="flex items-center space-x-6">
            {/* <button className="text-gray-700 hover:text-indigo-600 hidden md:block">
              <Search size={24} />
            </button>
            <button className="text-gray-700 hover:text-indigo-600 hidden md:block">
              <User size={24} />
            </button> */}
            <button onClick={() => navigateTo('cart')} className="text-gray-700 hover:text-indigo-600 relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-once">
                  {cart.length}
                </span>
              )}
            </button>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 bg-white border-t border-gray-200 py-4">
            <a onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }} className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200">Home</a>
            <a onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }} className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200">Shop</a>
            <a href="#" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200">About Us</a>
            <a href="#" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200">Contact</a>
            <div className="border-t border-gray-200 mt-2 pt-2">
              <a href="#" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"><Search size={20} className="mr-2" /> Search</a>
              <a href="#" className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"><User size={20} className="mr-2" /> Account</a>
            </div>
          </nav>
        )}
      </header>

      {/* Page Content */}
      <div className="min-h-[calc(100vh-250px)]"> {/* Ensures content pushes footer down */}
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} onProductClick={(id) => navigateTo('productDetail', { productId: id })} />}
        {currentPage === 'shop' && <ShopPage onNavigate={navigateTo} onProductClick={(id) => navigateTo('productDetail', { productId: id })} initialFilters={initialShopFilters} />}
        {currentPage === 'productDetail' && <ProductDetailPage productId={selectedProductId} onNavigate={navigateTo} onAddToCart={handleAddToCart} onProductClick={(id) => navigateTo('productDetail', { productId: id })} />}
        {currentPage === 'cart' && <CartPage cart={cart} onNavigate={navigateTo} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />}
        {currentPage === 'checkout' && <CheckoutPage onNavigate={navigateTo} cart={cart} setCart={setCart} />}
      </div>

      {/* Mini Cart Snackbar */}
      {showMiniCartSnackbar && cart.length > 0 && (
        <MiniCartSnackbar
          cartItems={cart}
          onNavigate={navigateTo}
          onClose={() => setShowMiniCartSnackbar(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About Arklin</h3>
            <p className="text-sm leading-relaxed">
              At Arklin, we believe your clothing should reflect your unique personality.
              We offer high-quality, stylish t-shirts for every trendsetter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a onClick={() => navigateTo('shop')} className="text-gray-300 hover:text-indigo-500 transition-colors duration-200 cursor-pointer">Shop All Tees</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-500 transition-colors duration-200">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-500 transition-colors duration-200">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-indigo-500 transition-colors duration-200">Shipping & Returns</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-indigo-500" />
                <span>456 Style Ave, Fashion City, 67890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-indigo-500" />
                <span>+91 91234 56789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-indigo-500" />
                <span>support@teetrendz.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" className="text-gray-300 hover:text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
              <a href="#" className="text-gray-300 hover:text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2 1.1-.9 1.8-2.2 2.2-3.7C7.1 16 4 17 4 17s2.1.8 4.9-2c2.7-2.8 5.7-8.6 5.7-8.6s-.7-.5 1.5-1.4c1.8-.9 2.8-2 2.8-2z"/></svg></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TeeTrendz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};


export default App;
