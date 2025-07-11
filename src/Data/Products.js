import f1 from '../images/products/f1.jpg';
import f2 from '../images/products/f2.jpg';
import f3 from '../images/products/f3.jpg';
import f4 from '../images/products/f4.jpg';
import f5 from '../images/products/f5.jpg';
import f6 from '../images/products/f6.jpg';
import n1 from '../images/products/n1.jpg';
import n2 from '../images/products/n2.jpg';
import n3 from '../images/products/n3.jpg';
import n4 from '../images/products/n4.jpg';
import n5 from '../images/products/n5.jpg';

const allProducts = [
  {
    id: 'tshirt-001',
    name: 'Vintage Sunset Tee',
    category: 'graphic',
    gender: 'men',
    price: 24.99,
    images: [
      f1,
      f2,
      f3
    ],
    description: 'Embrace the retro vibes with our Vintage Sunset Tee. Made from 100% premium combed cotton, featuring a unique distressed graphic print that captures the essence of classic Americana. Perfect for a relaxed, everyday look.',
    details: {
      Material: "100% Cotton",
      Fit: 'Regular',
      Neck: 'Crew Neck',
      Sleeve: 'Short Sleeve',
      Care: 'Machine Wash Cold'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Heather Grey'],
    reviews: [
      { rating: 5, comment: 'Love this tee! The print is amazing and the fabric is super soft.', user: 'Rahul K.' },
      { rating: 4, comment: 'Great fit and quality. Arrived quickly.', user: 'Priya S.' },
    ],
    rating: 4.5,
    numReviews: 2,
  },
  {
    id: 'tshirt-002',
    name: 'Minimalist Wave Tee',
    category: 'graphic',
    gender: 'women',
    price: 22.50,
    images: [
      f4,
      f5,
    ],
    description: 'A serene and stylish tee featuring a minimalist wave design. Crafted for comfort and elegance, this t-shirt is a versatile addition to any wardrobe. Its soft fabric ensures all-day comfort.',
    details: {
      Material: 'Cotton Blend',
      Fit: 'Relaxed',
      Neck: 'Round Neck',
      Sleeve: 'Short Sleeve',
      Care: 'Machine Wash'
    },
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Navy', 'White', 'Blush Pink'],
    reviews: [
      { rating: 5, comment: 'Beautiful design and very comfortable. My new favorite!', user: 'Anjali D.' },
    ],
    rating: 5,
    numReviews: 1,
  },
  {
    id: 'tshirt-003',
    name: 'Adventure Awaits Tee',
    category: 'graphic',
    gender: 'unisex',
    price: 26.75,
    images: [
      f6,
      n1,
    ],
    description: 'Inspire your next journey with the Adventure Awaits Tee. Durable and comfortable, perfect for outdoor enthusiasts. The unique graphic is printed using eco-friendly inks.',
    details: {
      Material: 'Organic Cotton',
      Fit: 'Regular',
      Neck: 'Crew Neck',
      Sleeve: 'Short Sleeve',
      Care: 'Machine Wash'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Forest Green', 'Sand', 'Charcoal'],
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
  {
    id: 'tshirt-004',
    name: 'Classic Plain White Tee',
    category: 'plain',
    gender: 'men',
    price: 18.00,
    images: [
      n2,
      n3
    ],
    description: 'The essential wardrobe staple. Our Classic Plain White Tee is made from ultra-soft, breathable cotton for ultimate comfort and versatility. Perfect for layering or wearing on its own.',
    details: {
      Material: "100% Cotton",
      Fit: "Classic",
      Neck: "Crew Neck",
      Sleeve: 'Short Sleeve',
      Care: 'Machine Wash'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White'],
    reviews: [
      { rating: 5, comment: 'Excellent quality for a basic tee. Very soft.', user: 'Amit P.' },
      { rating: 5, comment: 'Exactly what I needed. Fits perfectly.', user: 'Deepa R.' },
      { rating: 4, comment: 'Good value for money.', user: 'Vikram J.' },
    ],
    rating: 4.7,
    numReviews: 3,
  },
  {
    id: 'tshirt-005',
    name: 'Kids Dino Roar Tee',
    category: 'kids',
    gender: 'kids',
    price: 15.00,
    images: [
      n4,
      n5
    ],
    description: 'A fun and vibrant t-shirt for your little dinosaur enthusiast! Made with soft, durable fabric to withstand all their adventures.',
    details: {
      Material: "Cotton Blend", 
      Fit: "Kids Regular", 
      Neck: "Crew Neck",
      Sleeve: "Short Sleeve",
      Care: "Machine Wash"
    },
    sizes: ['2T', '3T', '4T', '5T', 'Youth S', 'Youth M'],
    colors: ['Blue', 'Green'],
    reviews: [],
    rating: 0,
    numReviews: 0,
  },
];

export default allProducts;