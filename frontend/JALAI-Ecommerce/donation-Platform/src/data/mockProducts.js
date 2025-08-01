// Mock product data following the database Product model structure
// This data follows the Product schema with proper fields like id, name, description, price, condition, status, categoryId, etc.

// Mock category IDs (these would normally come from the database)
export const CATEGORIES = {
  CLOTHING: 'clothing-cat-id-001',
  FOOTWEAR: 'footwear-cat-id-002', 
  ELECTRONICS: 'electronics-cat-id-003',
  FURNITURE: 'furniture-cat-id-004',
  UTENSILS: 'utensils-cat-id-005'
};

// Mock seller ID (this would normally come from authenticated user)
const MOCK_SELLER_ID = 'seller-id-001';

// Clothing Products
export const clothingProducts = [
  {
    id: 'prod-clothing-001',
    name: 'Elegant Evening Dress',
    description: 'Beautiful evening dress perfect for special occasions. Made from high-quality fabric with excellent craftsmanship.',
    price: 15000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/dress-2.webp',
    imageName: 'dress-2.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 45,
    featured: true,
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 'prod-clothing-002',
    name: 'Casual Summer Dress',
    description: 'Light and comfortable summer dress, perfect for casual outings and warm weather.',
    price: 8500,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/dress-3.webp',
    imageName: 'dress-3.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 32,
    featured: false,
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 'prod-clothing-003',
    name: 'Vintage Style Dress',
    description: 'Classic vintage-style dress with timeless appeal. Great condition and unique design.',
    price: 12000,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/dress-4.webp',
    imageName: 'dress-4.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 28,
    featured: false,
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date('2024-01-25').toISOString()
  },
  {
    id: 'prod-clothing-004',
    name: 'Modern Casual Dress',
    description: 'Contemporary casual dress suitable for everyday wear. Comfortable and stylish.',
    price: 9500,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/dress-5.avif',
    imageName: 'dress-5.avif',
    imageType: 'image/avif',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 38,
    featured: false,
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString()
  },
  {
    id: 'prod-clothing-005',
    name: 'Formal Business Dress',
    description: 'Professional business dress perfect for office wear and formal meetings.',
    price: 18000,
    condition: 'NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/dress-6.avif',
    imageName: 'dress-6.avif',
    imageType: 'image/avif',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 52,
    featured: true,
    createdAt: new Date('2024-02-05').toISOString(),
    updatedAt: new Date('2024-02-05').toISOString()
  },
  {
    id: 'prod-clothing-006',
    name: 'Stylish Party Dress',
    description: 'Eye-catching party dress perfect for celebrations and social events.',
    price: 14500,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/dress-8.webp',
    imageName: 'dress-8.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 41,
    featured: false,
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString()
  },
  {
    id: 'prod-clothing-007',
    name: 'Classic Jacket',
    description: 'Timeless jacket design that never goes out of style. Perfect for layering.',
    price: 22000,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/jacket1.jpg',
    imageName: 'jacket1.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 35,
    featured: false,
    createdAt: new Date('2024-02-12').toISOString(),
    updatedAt: new Date('2024-02-12').toISOString()
  },
  {
    id: 'prod-clothing-008',
    name: 'Elegant Evening Gown',
    description: 'Sophisticated evening gown for special occasions and formal events.',
    price: 25000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/dress-9.jpg',
    imageName: 'dress-9.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.CLOTHING,
    views: 67,
    featured: true,
    createdAt: new Date('2024-02-15').toISOString(),
    updatedAt: new Date('2024-02-15').toISOString()
  }
];

// Footwear Products
export const footwearProducts = [
  {
    id: 'prod-footwear-001',
    name: 'Classic High Heels',
    description: 'Elegant high heels perfect for formal occasions and professional settings.',
    price: 18000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/Footwears/heel1.jpg',
    imageName: 'heel1.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FOOTWEAR,
    views: 43,
    featured: true,
    createdAt: new Date('2024-01-18').toISOString(),
    updatedAt: new Date('2024-01-18').toISOString()
  },
  {
    id: 'prod-footwear-002',
    name: 'Stylish Evening Heels',
    description: 'Beautiful evening heels that add elegance to any outfit.',
    price: 16500,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/Footwears/heel2.jpg',
    imageName: 'heel2.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FOOTWEAR,
    views: 38,
    featured: false,
    createdAt: new Date('2024-01-22').toISOString(),
    updatedAt: new Date('2024-01-22').toISOString()
  },
  {
    id: 'prod-footwear-003',
    name: 'Comfortable Block Heels',
    description: 'Comfortable block heels that provide style without sacrificing comfort.',
    price: 14000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/Footwears/heel3.jpg',
    imageName: 'heel3.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FOOTWEAR,
    views: 29,
    featured: false,
    createdAt: new Date('2024-01-28').toISOString(),
    updatedAt: new Date('2024-01-28').toISOString()
  },
  {
    id: 'prod-footwear-004',
    name: 'Designer High Heels',
    description: 'Premium designer high heels for special occasions and luxury events.',
    price: 28000,
    condition: 'NEW',
    status: 'ACTIVE',
    imageUrl: '/Footwears/heel4.jpg',
    imageName: 'heel4.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FOOTWEAR,
    views: 56,
    featured: true,
    createdAt: new Date('2024-02-02').toISOString(),
    updatedAt: new Date('2024-02-02').toISOString()
  },
  {
    id: 'prod-footwear-005',
    name: 'Casual Sneakers',
    description: 'Comfortable casual sneakers perfect for everyday wear and light activities.',
    price: 12000,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/Footwears/sneaker1.jpg',
    imageName: 'sneaker1.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FOOTWEAR,
    views: 34,
    featured: false,
    createdAt: new Date('2024-02-08').toISOString(),
    updatedAt: new Date('2024-02-08').toISOString()
  },
  {
    id: 'prod-footwear-006',
    name: 'Sport Sneakers',
    description: 'High-performance sport sneakers ideal for running and athletic activities.',
    price: 15500,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/Footwears/sneaker2.jpg',
    imageName: 'sneaker2.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FOOTWEAR,
    views: 47,
    featured: false,
    createdAt: new Date('2024-02-12').toISOString(),
    updatedAt: new Date('2024-02-12').toISOString()
  }
];

// Furniture Products
export const furnitureProducts = [
  {
    id: 'prod-furniture-001',
    name: 'Modern Sofa Set',
    description: 'Contemporary sofa set perfect for modern living rooms. Comfortable and stylish.',
    price: 85000,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/sofa-1.webp',
    imageName: 'sofa-1.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FURNITURE,
    views: 78,
    featured: true,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString()
  },
  {
    id: 'prod-furniture-002',
    name: 'Luxury Couch',
    description: 'Premium luxury couch with high-quality upholstery and excellent comfort.',
    price: 120000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/couch-1.webp',
    imageName: 'couch-1.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FURNITURE,
    views: 92,
    featured: true,
    createdAt: new Date('2024-01-12').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString()
  },
  {
    id: 'prod-furniture-003',
    name: 'Comfortable Sectional',
    description: 'Spacious sectional sofa perfect for large families and entertaining guests.',
    price: 95000,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/couch-2.webp',
    imageName: 'couch-2.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FURNITURE,
    views: 65,
    featured: false,
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString()
  },
  {
    id: 'prod-furniture-004',
    name: 'Dining Table Set',
    description: 'Beautiful dining table set with chairs, perfect for family meals and gatherings.',
    price: 75000,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/table-1.webp',
    imageName: 'table-1.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FURNITURE,
    views: 54,
    featured: false,
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 'prod-furniture-005',
    name: 'Modern Coffee Table',
    description: 'Sleek modern coffee table that complements any contemporary living space.',
    price: 35000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/table-2.webp',
    imageName: 'table-2.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FURNITURE,
    views: 41,
    featured: false,
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date('2024-01-25').toISOString()
  },
  {
    id: 'prod-furniture-006',
    name: 'Classic Wooden Table',
    description: 'Traditional wooden table with timeless design and excellent craftsmanship.',
    price: 45000,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/table-3.jpeg',
    imageName: 'table-3.jpeg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.FURNITURE,
    views: 37,
    featured: false,
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString()
  }
];

// Electronics Products
export const electronicsProducts = [
  {
    id: 'prod-electronics-001',
    name: 'Portable Fan',
    description: 'Compact and efficient portable fan perfect for personal cooling and small spaces.',
    price: 8500,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/fan-1.jpg',
    imageName: 'fan-1.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.ELECTRONICS,
    views: 32,
    featured: false,
    createdAt: new Date('2024-01-14').toISOString(),
    updatedAt: new Date('2024-01-14').toISOString()
  },
  {
    id: 'prod-electronics-002',
    name: 'Desktop Fan',
    description: 'Powerful desktop fan with multiple speed settings for optimal air circulation.',
    price: 12000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/fan-2.jpg',
    imageName: 'fan-2.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.ELECTRONICS,
    views: 28,
    featured: false,
    createdAt: new Date('2024-01-18').toISOString(),
    updatedAt: new Date('2024-01-18').toISOString()
  },
  {
    id: 'prod-electronics-003',
    name: 'Tower Fan',
    description: 'Sleek tower fan with remote control and timer function for modern homes.',
    price: 18500,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/fan-3.webp',
    imageName: 'fan-3.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.ELECTRONICS,
    views: 45,
    featured: true,
    createdAt: new Date('2024-01-22').toISOString(),
    updatedAt: new Date('2024-01-22').toISOString()
  },
  {
    id: 'prod-electronics-004',
    name: 'Hair Dryer',
    description: 'Professional hair dryer with multiple heat and speed settings for salon-quality results.',
    price: 15000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/dryer-1.webp',
    imageName: 'dryer-1.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.ELECTRONICS,
    views: 39,
    featured: false,
    createdAt: new Date('2024-01-26').toISOString(),
    updatedAt: new Date('2024-01-26').toISOString()
  },
  {
    id: 'prod-electronics-005',
    name: 'Compact Hair Dryer',
    description: 'Travel-friendly compact hair dryer with foldable design and dual voltage.',
    price: 9500,
    condition: 'GOOD',
    status: 'ACTIVE',
    imageUrl: '/clothings/dryer-2.webp',
    imageName: 'dryer-2.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.ELECTRONICS,
    views: 26,
    featured: false,
    createdAt: new Date('2024-02-02').toISOString(),
    updatedAt: new Date('2024-02-02').toISOString()
  },
  {
    id: 'prod-electronics-006',
    name: 'LED Torch Light',
    description: 'High-brightness LED torch light with long battery life and durable construction.',
    price: 3500,
    condition: 'NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/torch-1.webp',
    imageName: 'torch-1.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.ELECTRONICS,
    views: 22,
    featured: false,
    createdAt: new Date('2024-02-06').toISOString(),
    updatedAt: new Date('2024-02-06').toISOString()
  },
  {
    id: 'prod-electronics-007',
    name: 'Rechargeable Torch',
    description: 'Eco-friendly rechargeable torch with USB charging and emergency features.',
    price: 5500,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/torch-2.jpg',
    imageName: 'torch-2.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.ELECTRONICS,
    views: 31,
    featured: false,
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString()
  }
];

// Utensils Products
export const utensilsProducts = [
  {
    id: 'prod-utensils-001',
    name: 'Complete Utensil Set',
    description: 'Comprehensive kitchen utensil set with all essential cooking tools for modern kitchens.',
    price: 25000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/utensil-set-1.jpg',
    imageName: 'utensil-set-1.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.UTENSILS,
    views: 48,
    featured: true,
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString()
  },
  {
    id: 'prod-utensils-002',
    name: 'Premium Cooking Set',
    description: 'High-quality cooking utensil set made from durable materials for professional cooking.',
    price: 35000,
    condition: 'NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/utensil-set-3.jpg',
    imageName: 'utensil-set-3.jpg',
    imageType: 'image/jpeg',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.UTENSILS,
    views: 62,
    featured: true,
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 'prod-utensils-003',
    name: 'Stainless Steel Utensil Set',
    description: 'Elegant stainless steel utensil set that combines functionality with modern design.',
    price: 28000,
    condition: 'LIKE_NEW',
    status: 'ACTIVE',
    imageUrl: '/clothings/utensil-set-5.webp',
    imageName: 'utensil-set-5.webp',
    imageType: 'image/webp',
    sellerId: MOCK_SELLER_ID,
    categoryId: CATEGORIES.UTENSILS,
    views: 41,
    featured: false,
    createdAt: new Date('2024-01-24').toISOString(),
    updatedAt: new Date('2024-01-24').toISOString()
  }
];

// Combined products for easy access
export const allProducts = [
  ...clothingProducts,
  ...footwearProducts,
  ...furnitureProducts,
  ...electronicsProducts,
  ...utensilsProducts
];

// Helper functions
export const getProductsByCategory = (categoryId) => {
  return allProducts.filter(product => product.categoryId === categoryId);
};

export const getFeaturedProducts = () => {
  return allProducts.filter(product => product.featured);
};

export const getProductById = (id) => {
  return allProducts.find(product => product.id === id);
};
