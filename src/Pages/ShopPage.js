import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, X, Search } from 'lucide-react';
import allProducts from '../Data/Products';
import categories from '../Data/Categories';
import ProductCard from '../components/Products/ProductCard';


const ShopPage = ({ onNavigate, onProductClick, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: initialFilters.category || '',
    gender: '',
    minPrice: '',
    maxPrice: '',
    size: '',
    color: '',
    search: '',
  });
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [sortOrder, setSortOrder] = useState('default');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // Controls desktop sidebar visibility

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortOrder]); // Re-apply whenever filters or sort order change

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFiltersAndSort = () => {
    let tempProducts = [...allProducts];

    // Apply filters
    if (filters.category) {
      tempProducts = tempProducts.filter(p => p.category === filters.category);
    }
    if (filters.gender) {
      tempProducts = tempProducts.filter(p => p.gender === filters.gender || p.gender === 'unisex');
    }
    if (filters.minPrice) {
      tempProducts = tempProducts.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      tempProducts = tempProducts.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    if (filters.size) {
      tempProducts = tempProducts.filter(p => p.sizes.includes(filters.size));
    }
    if (filters.color) {
      tempProducts = tempProducts.filter(p => p.colors.includes(filters.color));
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (sortOrder === 'price-asc') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name-asc') {
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(tempProducts);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      gender: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      color: '',
      search: '',
    });
    setSortOrder('default');
  };

  // Extract unique sizes and colors from all products for filter options
  const uniqueSizes = [...new Set(allProducts.flatMap(p => p.sizes))].sort();
  const uniqueColors = [...new Set(allProducts.flatMap(p => p.colors))].sort();

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Collection</h1>

      {/* Mobile Filter Toggle & Desktop Sort */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)} // Toggle on click
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors md:hidden"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>

        {/* Desktop Filter Toggle Button */}
        <button
          onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
          className="hidden md:flex bg-gray-200 text-gray-700 px-4 py-2 rounded-lg items-center space-x-2 hover:bg-gray-300 transition-colors"
        >
          <Filter size={20} />
          <span>{isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
        </button>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 pr-8 appearance-none bg-white text-gray-700"
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 w-64 bg-white p-6 shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isFilterSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:shadow-none md:w-64 md:flex-shrink-0
          ${!isFilterSidebarOpen && 'md:hidden'} /* Hide on desktop if closed */
        `}>
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
            <button onClick={() => setIsFilterSidebarOpen(false)} className="text-gray-600 hover:text-gray-900">
              <X size={28} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Search</h3>
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Category</h3>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Gender</h3>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Genders</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Price Range</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span>-</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setFilters(prev => ({ ...prev, size: prev.size === size ? '' : size }))}
                  className={`px-4 py-2 rounded-full border transition-colors duration-200 ${filters.size === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueColors.map(color => (
                <button
                  key={color}
                  onClick={() => setFilters(prev => ({ ...prev, color: prev.color === color ? '' : color }))}
                  className={`px-4 py-2 rounded-full border transition-colors duration-200 ${filters.color === color ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isFilterSidebarOpen ? 'md:ml-8' : 'md:ml-0'}`}>
          {/* Removed redundant desktop sort, now combined with mobile sort button */}
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 py-20">
              <p className="text-xl mb-4">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;