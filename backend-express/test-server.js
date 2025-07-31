// Simple Express server for testing
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration for deployment
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'https://jalai-2.vercel.app'],
  credentials: true
}));

// In-memory storage for submitted products (organized by user ID)
const userProducts = {};

// In-memory storage for user notifications (organized by user ID)
const userNotifications = {};

// In-memory storage for other data
const clients = [];
const orders = [];
const orphanages = [];
const donations = [];
const reviews = [];
const payments = [];

// Initialize with some sample data if needed
const initializeSampleData = () => {
  // Add sample data for admin sections (orders, orphanages, donations, reviews, payments)
  // This helps demonstrate the admin interface functionality

  // Sample orders
  if (orders.length === 0) {
    orders.push(
      {
        id: 'order-1',
        userId: 'user-123',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        items: [
          { productId: 'prod-1', productName: 'Sample Product', quantity: 1, price: 25000 }
        ],
        totalAmount: 25000,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        shippingAddress: '123 Main St, Douala, Cameroon',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'order-2',
        userId: 'user-456',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        items: [
          { productId: 'prod-2', productName: 'Another Product', quantity: 2, price: 15000 }
        ],
        totalAmount: 30000,
        status: 'COMPLETED',
        paymentStatus: 'PAID',
        shippingAddress: '456 Oak Ave, Yaounde, Cameroon',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      }
    );
  }

  // Sample orphanages
  if (orphanages.length === 0) {
    orphanages.push(
      {
        id: 'orphanage-1',
        name: 'Hope Children\'s Home',
        description: 'A loving home for children in need',
        location: 'Douala, Cameroon',
        contactEmail: 'contact@hopechildrenshome.org',
        contactPhone: '+237 123 456 789',
        capacity: 50,
        currentChildren: 35,
        needsDescription: 'Food, clothing, educational materials',
        imageUrl: '/assets/orphanage-1.jpg',
        images: [
          '/assets/orphanage-1.jpg',
          '/assets/orphanage-2.jpg',
          '/assets/orphanage-3.jpg',
          '/assets/orphanage-4.jpg'
        ],
        coordinates: { lat: 4.0511, lng: 9.7679 },
        verified: true,
        createdAt: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
        updatedAt: new Date().toISOString()
      },
      {
        id: 'orphanage-2',
        name: 'Sunshine Orphanage',
        description: 'Providing care and education for orphaned children',
        location: 'Yaounde, Cameroon',
        contactEmail: 'info@sunshineorphanage.org',
        contactPhone: '+237 987 654 321',
        capacity: 30,
        currentChildren: 28,
        needsDescription: 'Medical supplies, books, toys',
        imageUrl: '/assets/orphanage-2.jpg',
        images: [
          '/assets/orphanage-2.jpg',
          '/assets/orphanage-3.jpg',
          '/assets/orphanage-4.jpg',
          '/assets/orphanage-1.jpg'
        ],
        coordinates: { lat: 3.8480, lng: 11.5021 },
        verified: true,
        createdAt: new Date(Date.now() - 1296000000).toISOString(), // 15 days ago
        updatedAt: new Date().toISOString()
      }
    );
  }

  // Sample donations
  if (donations.length === 0) {
    donations.push(
      {
        id: 'donation-1',
        donorId: 'user-789',
        donorName: 'Alice Johnson',
        donorEmail: 'alice@example.com',
        orphanageId: 'orphanage-1',
        orphanageName: 'Hope Children\'s Home',
        amount: 50000,
        currency: 'XAF',
        type: 'MONETARY',
        message: 'Hope this helps the children',
        status: 'COMPLETED',
        paymentMethod: 'MOBILE_MONEY',
        transactionId: 'txn-12345',
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        completedAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 'donation-2',
        donorId: 'user-101',
        donorName: 'Bob Wilson',
        donorEmail: 'bob@example.com',
        orphanageId: 'orphanage-2',
        orphanageName: 'Sunshine Orphanage',
        amount: 25000,
        currency: 'XAF',
        type: 'MONETARY',
        message: 'For educational materials',
        status: 'PENDING',
        paymentMethod: 'BANK_TRANSFER',
        transactionId: 'txn-67890',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        completedAt: null
      }
    );
  }

  // Sample reviews
  if (reviews.length === 0) {
    reviews.push(
      {
        id: 'review-1',
        userId: 'user-123',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        productId: 'prod-1',
        productName: 'Sample Product',
        rating: 5,
        title: 'Excellent product!',
        comment: 'Very satisfied with the quality and fast delivery.',
        status: 'APPROVED',
        helpful: 12,
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        updatedAt: new Date().toISOString()
      },
      {
        id: 'review-2',
        userId: 'user-456',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        productId: 'prod-2',
        productName: 'Another Product',
        rating: 4,
        title: 'Good value for money',
        comment: 'Product as described, would recommend.',
        status: 'PENDING',
        helpful: 3,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      }
    );
  }

  // Sample payments
  if (payments.length === 0) {
    payments.push(
      {
        id: 'payment-1',
        orderId: 'order-1',
        userId: 'user-123',
        userName: 'John Doe',
        amount: 25000,
        currency: 'XAF',
        method: 'MOBILE_MONEY',
        provider: 'MTN_MOMO',
        status: 'COMPLETED',
        transactionId: 'mtn-12345',
        reference: 'REF-001',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      },
      {
        id: 'payment-2',
        orderId: 'order-2',
        userId: 'user-456',
        userName: 'Jane Smith',
        amount: 30000,
        currency: 'XAF',
        method: 'BANK_TRANSFER',
        provider: 'COMMERCIAL_BANK',
        status: 'PENDING',
        transactionId: 'bank-67890',
        reference: 'REF-002',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        completedAt: null
      }
    );
  }

  console.log('Server initialized with sample data for admin sections');
  console.log(`- Orders: ${orders.length}`);
  console.log(`- Orphanages: ${orphanages.length}`);
  console.log(`- Donations: ${donations.length}`);
  console.log(`- Reviews: ${reviews.length}`);
  console.log(`- Payments: ${payments.length}`);
};

// Basic middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'JALAI API is running',
    timestamp: new Date().toISOString(),
    environment: 'development'
  });
});

// Mock API endpoints for testing
// Get all products endpoint
app.get('/api/products', (req, res) => {
  console.log('Fetching all products');

  // Get all products from all users
  const allProducts = Object.entries(userProducts).flatMap(([userId, products]) =>
    products.map(product => ({
      ...product,
      sellerId: userId,
      // Add proper image handling
      imageUrl: product.imageUrl || product.image,
      imageUrlThumbnail: product.imageUrl || product.image,
      // Ensure proper status mapping
      status: product.status === 'PENDING_APPROVAL' ? 'pending' :
              product.status === 'APPROVED' ? 'active' :
              product.status?.toLowerCase() || 'pending',
      isApproved: product.status === 'APPROVED',
      categoryName: product.category,
      stock: product.stock || 1,
      sales: product.sales || 0
    }))
  );

  console.log(`Found ${allProducts.length} products total`);

  res.json({
    success: true,
    data: allProducts,
    totalPages: 1,
    currentPage: 0
  });
});

app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets' },
      { id: '2', name: 'Clothing', description: 'Clothing and fashion items' },
      { id: '3', name: 'Books', description: 'Books and educational materials' },
      { id: '4', name: 'Home & Garden', description: 'Home and garden items' },
      { id: '5', name: 'Sports & Recreation', description: 'Sports and recreational equipment' }
    ]
  });
});

// Create product endpoint
app.post('/api/products', (req, res) => {
  const { name, description, price, condition, categoryId, imageData, imageName, imageType, sellerId } = req.body;

  console.log('Product creation request:', { name, description, price, condition, categoryId, imageName, imageType, sellerId });

  // Find category name from categoryId
  const categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Books' },
    { id: '4', name: 'Home & Garden' },
    { id: '5', name: 'Sports & Recreation' }
  ];

  const category = categories.find(cat => cat.id === categoryId);

  // Create the new product
  const newProduct = {
    id: Date.now().toString(),
    name,
    description,
    price: parseFloat(price),
    condition,
    category: category ? category.name : 'Unknown',
    categoryId,
    status: 'PENDING_APPROVAL',
    featured: false,
    imageUrl: imageData ? `data:image/jpeg;base64,${imageData}` : 'https://via.placeholder.com/300x300?text=Product',
    createdAt: new Date().toISOString(),
    sellerId: sellerId || 'unknown'
  };

  // Store the product in memory organized by user ID
  if (!userProducts[sellerId]) {
    userProducts[sellerId] = [];
  }
  userProducts[sellerId].push(newProduct);

  console.log('Created product:', newProduct);
  console.log('User products now:', userProducts[sellerId]);

  res.status(201).json({
    success: true,
    message: 'Product created successfully and is pending approval',
    data: newProduct
  });
});

// Public categories endpoint
app.get('/api/categories/public', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets' },
      { id: '2', name: 'Clothing', description: 'Clothing and fashion items' },
      { id: '3', name: 'Books', description: 'Books and educational materials' },
      { id: '4', name: 'Home & Garden', description: 'Home and garden items' },
      { id: '5', name: 'Sports & Recreation', description: 'Sports and recreational equipment' }
    ]
  });
});

// Mock auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password: '***' });

  if (email === 'admin@jalai.com' && password === 'admin123') {
    const user = {
      id: '1',
      email: 'admin@jalai.com',
      firstName: 'Admin',
      lastName: 'User',
      name: 'Admin User',
      role: 'ADMIN',
      userType: 'ADMIN'
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: user,
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      data: {
        user: user
      }
    });
  } else if (email === 'client@jalai.com' && password === 'client123') {
    const user = {
      id: '2',
      email: 'client@jalai.com',
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      phoneNumber: '+237 6XX XXX XXX',
      role: 'CLIENT',
      userType: 'CLIENT'
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: user,
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      data: {
        user: user
      }
    });
  } else if (email === 'orphanage@jalai.com' && password === 'orphanage123') {
    const user = {
      id: '3',
      email: 'orphanage@jalai.com',
      firstName: 'Hope',
      lastName: 'Orphanage',
      name: 'Hope Orphanage',
      phoneNumber: '+237 6XX XXX XXX',
      role: 'ORPHANAGE',
      userType: 'ORPHANAGE'
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: user,
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      data: {
        user: user
      }
    });
  } else if (email === 'moforbei@gmail.com' && password === 'password123') {
    const user = {
      id: '4',
      email: 'moforbei@gmail.com',
      firstName: 'Mofor',
      lastName: 'Bei',
      name: 'Mofor Bei',
      phoneNumber: '+237 6XX XXX XXX',
      role: 'CLIENT',
      userType: 'CLIENT'
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: user,
      accessToken: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      data: {
        user: user
      }
    });
  } else {
    // Check if it's a registered user from our in-memory storage
    // For now, we'll just reject unknown credentials
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: {
        id: '3',
        email,
        firstName,
        lastName,
        role: 'CLIENT'
      }
    }
  });
});

// Client registration endpoint (specific route that frontend is calling)
app.post('/api/auth/register/client', (req, res) => {
  const { email, password, firstName, lastName, phone, name } = req.body;

  console.log('Client registration request:', { email, firstName, lastName, phone, name });

  const newUser = {
    id: Date.now().toString(),
    email,
    firstName: firstName || name?.split(' ')[0] || 'User',
    lastName: lastName || name?.split(' ')[1] || '',
    name: name || `${firstName || 'User'} ${lastName || ''}`.trim(),
    phone,
    role: 'CLIENT',
    userType: 'CLIENT',
    isVerified: false,
    createdAt: new Date().toISOString()
  };

  const token = 'mock-jwt-token-' + Date.now();

  res.status(201).json({
    success: true,
    message: 'Client registration successful',
    user: newUser,
    accessToken: token,
    refreshToken: 'mock-refresh-token-' + Date.now(),
    data: {
      user: newUser
    }
  });
});

// Get current user profile
app.get('/api/auth/me', (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: '2',
        email: 'client@jalai.com',
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        phoneNumber: '+237 6XX XXX XXX',
        role: 'CLIENT',
        userType: 'CLIENT'
      }
    }
  });
});

// Token refresh endpoint
app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: 'Refresh token is required'
    });
  }

  res.json({
    success: true,
    accessToken: 'new-mock-jwt-token-' + Date.now(),
    refreshToken: 'new-mock-refresh-token-' + Date.now()
  });
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Notifications endpoints
app.get('/api/notifications/client/:userId/latest', (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching notifications for user: ${userId}`);

  // Get notifications for this user
  const notifications = userNotifications[userId] || [];

  console.log(`Found ${notifications.length} notifications for user ${userId}`);

  res.json({
    success: true,
    data: notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  });
});

// Mark notification as read
app.put('/api/notifications/:notificationId/read', (req, res) => {
  res.json({
    success: true,
    message: 'Notification marked as read'
  });
});

// Mark all notifications as read
app.put('/api/notifications/client/:userId/read-all', (req, res) => {
  res.json({
    success: true,
    message: 'All notifications marked as read'
  });
});

// Get all notifications (for admin)
app.get('/api/notifications/all', (req, res) => {
  console.log('Fetching all notifications for admin');

  // Collect all notifications from all users
  const allNotifications = [];

  for (const [userId, notifications] of Object.entries(userNotifications)) {
    notifications.forEach(notification => {
      allNotifications.push({
        ...notification,
        userId, // Add user ID for admin reference
        userName: `User ${userId.slice(-4)}` // Simple user identifier
      });
    });
  }

  // Sort by creation date (newest first)
  allNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  console.log(`Found ${allNotifications.length} total notifications across all users`);

  res.json({
    success: true,
    data: allNotifications
  });
});

// Additional endpoints for dashboard
app.get('/api/products/user/:userId', (req, res) => {
  const { userId } = req.params;

  console.log('Fetching products for user:', userId);
  console.log('Available user products:', Object.keys(userProducts));

  // Get products for this user, or empty array if none exist
  const products = userProducts[userId] || [];

  console.log('Returning products:', products);

  res.json({
    success: true,
    data: products
  });
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  console.log(`Fetching product with ID: ${productId}`);

  // Find product across all users
  let foundProduct = null;
  let sellerId = null;

  for (const [userId, products] of Object.entries(userProducts)) {
    const product = products.find(p => p.id === productId);
    if (product) {
      foundProduct = product;
      sellerId = userId;
      break;
    }
  }

  if (!foundProduct) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  // Return product with proper formatting
  const formattedProduct = {
    ...foundProduct,
    sellerId,
    imageUrl: foundProduct.imageUrl || foundProduct.image,
    imageUrlThumbnail: foundProduct.imageUrl || foundProduct.image,
    status: foundProduct.status === 'PENDING_APPROVAL' ? 'pending' :
            foundProduct.status === 'APPROVED' ? 'active' :
            foundProduct.status?.toLowerCase() || 'pending',
    isApproved: foundProduct.status === 'APPROVED',
    categoryName: foundProduct.category,
    stock: foundProduct.stock || 1,
    sales: foundProduct.sales || 0
  };

  res.json({
    success: true,
    data: formattedProduct
  });
});

// Approve product endpoint
app.put('/api/products/:id/approve', (req, res) => {
  const productId = req.params.id;
  const { reason } = req.body;

  console.log(`Approving product ${productId} with reason: ${reason || 'No reason provided'}`);

  // Find and update product
  let updated = false;
  let sellerId = null;

  for (const [userId, products] of Object.entries(userProducts)) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      userProducts[userId][productIndex].status = 'APPROVED';
      userProducts[userId][productIndex].approvedAt = new Date().toISOString();
      userProducts[userId][productIndex].approvalReason = reason;
      sellerId = userId;
      updated = true;
      break;
    }
  }

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  // Add notification for the seller
  if (!userNotifications[sellerId]) {
    userNotifications[sellerId] = [];
  }

  userNotifications[sellerId].push({
    id: Date.now().toString(),
    type: 'PRODUCT_APPROVED',
    title: 'Product Approved',
    message: `Your product has been approved${reason ? `: ${reason}` : ''}`,
    productId,
    createdAt: new Date().toISOString(),
    read: false
  });

  console.log(`Product ${productId} approved successfully. Notification sent to user ${sellerId}`);

  res.json({
    success: true,
    message: 'Product approved successfully'
  });
});

// Reject product endpoint
app.put('/api/products/:id/reject', (req, res) => {
  const productId = req.params.id;
  const { reason } = req.body;

  if (!reason || !reason.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Rejection reason is required'
    });
  }

  console.log(`Rejecting product ${productId} with reason: ${reason}`);

  // Find and update product
  let updated = false;
  let sellerId = null;

  for (const [userId, products] of Object.entries(userProducts)) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      userProducts[userId][productIndex].status = 'REJECTED';
      userProducts[userId][productIndex].rejectedAt = new Date().toISOString();
      userProducts[userId][productIndex].rejectionReason = reason;
      sellerId = userId;
      updated = true;
      break;
    }
  }

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  // Add notification for the seller
  if (!userNotifications[sellerId]) {
    userNotifications[sellerId] = [];
  }

  userNotifications[sellerId].push({
    id: Date.now().toString(),
    type: 'PRODUCT_REJECTED',
    title: 'Product Rejected',
    message: `Your product has been rejected: ${reason}`,
    productId,
    createdAt: new Date().toISOString(),
    read: false
  });

  console.log(`Product ${productId} rejected successfully. Notification sent to user ${sellerId}`);

  res.json({
    success: true,
    message: 'Product rejected successfully'
  });
});

app.get('/api/orders/user/:userId', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

app.get('/api/purchases/user/:userId', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Admin dashboard stats endpoint
app.get('/api/admin/dashboard/stats', (req, res) => {
  console.log('Fetching admin dashboard stats');
  console.log('Current userProducts keys:', Object.keys(userProducts));
  console.log('Total users with products:', Object.keys(userProducts).length);

  // Calculate real statistics from stored data
  const totalProducts = Object.values(userProducts).reduce((total, products) => total + products.length, 0);
  const totalClients = Object.keys(userProducts).length; // Count unique users who have submitted products
  const totalOrders = orders.length;
  const totalOrphanages = orphanages.length;
  const totalDonations = donations.length;
  const totalReviews = reviews.length;
  const totalPayments = payments.length;

  // Calculate total revenue from products (assuming all are sold at their listed price)
  const totalRevenue = Object.values(userProducts)
    .flat()
    .reduce((total, product) => total + (product.price || 0), 0);

  const stats = {
    totalClients,
    totalProducts,
    totalOrders,
    totalOrphanages,
    totalDonations,
    totalReviews,
    totalPayments,
    totalRevenue
  };

  console.log('Admin dashboard stats:', stats);

  // Also log some sample products for debugging
  const allProducts = Object.values(userProducts).flat();
  console.log('Sample products:', allProducts.slice(0, 2).map(p => ({ name: p.name, sellerId: p.sellerId, price: p.price })));

  res.json({
    success: true,
    data: stats
  });
});

// Admin endpoints for getting all data
app.get('/api/admin/clients', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  // Get all unique users who have submitted products
  const allClients = Object.keys(userProducts).map(userId => ({
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    status: 'ACTIVE',
    joinDate: new Date().toISOString(),
    totalProducts: userProducts[userId].length
  }));

  const startIndex = page * size;
  const endIndex = startIndex + parseInt(size);
  const paginatedClients = allClients.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedClients,
    totalElements: allClients.length,
    totalPages: Math.ceil(allClients.length / size),
    currentPage: parseInt(page)
  });
});

app.get('/api/admin/products', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  // Get all products from all users
  const allProducts = Object.values(userProducts).flat();

  const startIndex = page * size;
  const endIndex = startIndex + parseInt(size);
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedProducts,
    totalElements: allProducts.length,
    totalPages: Math.ceil(allProducts.length / size),
    currentPage: parseInt(page)
  });
});

app.get('/api/admin/orders', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  res.json({
    success: true,
    data: orders,
    totalElements: orders.length,
    totalPages: Math.ceil(orders.length / size),
    currentPage: parseInt(page)
  });
});

// Public orphanages endpoint (for homepage)
app.get('/api/orphanages', (req, res) => {
  console.log('Fetching public orphanages');

  // Only return verified orphanages for public view
  const verifiedOrphanages = orphanages.filter(orphanage => orphanage.verified === true);

  console.log(`Found ${verifiedOrphanages.length} verified orphanages out of ${orphanages.length} total`);

  res.json({
    success: true,
    data: verifiedOrphanages
  });
});

// Get single orphanage details endpoint
app.get('/api/orphanages/:id', (req, res) => {
  const orphanageId = req.params.id;
  console.log(`Fetching orphanage details for ID: ${orphanageId}`);

  const orphanage = orphanages.find(o => o.id === orphanageId);

  if (!orphanage) {
    return res.status(404).json({
      success: false,
      message: 'Orphanage not found'
    });
  }

  // Only return verified orphanages for public view (unless it's admin)
  if (!orphanage.verified) {
    return res.status(404).json({
      success: false,
      message: 'Orphanage not found or not yet verified'
    });
  }

  console.log(`Found orphanage: ${orphanage.name}`);

  res.json({
    success: true,
    data: orphanage
  });
});

// Create new orphanage endpoint
app.post('/api/orphanages', (req, res) => {
  const { name, email, phoneNumber, location, approximateChildren, description, needsDescription, images } = req.body;

  console.log('Creating new orphanage:', { name, email, location, approximateChildren, imagesCount: images?.length || 0 });

  // For demo purposes, we'll use placeholder images
  // In a real app, you'd handle file uploads properly
  const defaultImages = [
    '/assets/orphanage-1.jpg',
    '/assets/orphanage-2.jpg',
    '/assets/orphanage-3.jpg',
    '/assets/orphanage-4.jpg'
  ];

  const newOrphanage = {
    id: `orphanage-${Date.now()}`,
    name,
    contactEmail: email,
    contactPhone: phoneNumber,
    location,
    currentChildren: parseInt(approximateChildren) || 0,
    capacity: Math.ceil((parseInt(approximateChildren) || 0) * 1.2), // 20% more capacity
    description: description || `Orphanage located in ${location}`,
    needsDescription: needsDescription || 'General support needed',
    verified: false, // New orphanages start as unverified
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: defaultImages[0], // Main cover image
    images: defaultImages, // All images for gallery
    coordinates: getCoordinatesForLocation(location) // Add coordinates for map
  };

  // Add to orphanages array
  orphanages.push(newOrphanage);

  console.log(`Orphanage ${name} created successfully. Total orphanages: ${orphanages.length}`);

  res.json({
    success: true,
    message: 'Orphanage registration submitted successfully! It will be reviewed by administrators.',
    data: newOrphanage
  });
});

// Helper function to get coordinates for locations (for demo purposes)
function getCoordinatesForLocation(location) {
  const locationCoords = {
    'Douala, Cameroon': { lat: 4.0511, lng: 9.7679 },
    'Yaoundé, Cameroon': { lat: 3.8480, lng: 11.5021 },
    'Yaoundé - Centre': { lat: 3.8480, lng: 11.5021 },
    'Yaoundé - Mfoundi': { lat: 3.8600, lng: 11.5200 },
    'Yaoundé - Nlongkak': { lat: 3.8700, lng: 11.5100 },
    'Yaoundé - Bastos': { lat: 3.8550, lng: 11.5150 },
    'Douala - Akwa': { lat: 4.0600, lng: 9.7700 },
    'Douala - Bonanjo': { lat: 4.0500, lng: 9.7600 },
    'Douala - Deido': { lat: 4.0400, lng: 9.7800 }
  };

  return locationCoords[location] || { lat: 3.8480, lng: 11.5021 }; // Default to Yaoundé
}

// Approve orphanage endpoint
app.put('/api/orphanages/:id/approve', (req, res) => {
  const orphanageId = req.params.id;
  const { reason } = req.body;

  console.log(`Approving orphanage ${orphanageId} with reason: ${reason || 'No reason provided'}`);

  // Find and update orphanage
  const orphanageIndex = orphanages.findIndex(o => o.id === orphanageId);

  if (orphanageIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Orphanage not found'
    });
  }

  orphanages[orphanageIndex].verified = true;
  orphanages[orphanageIndex].approvedAt = new Date().toISOString();
  orphanages[orphanageIndex].approvalReason = reason;

  console.log(`Orphanage ${orphanages[orphanageIndex].name} approved successfully`);

  res.json({
    success: true,
    message: 'Orphanage approved successfully'
  });
});

// Reject orphanage endpoint
app.put('/api/orphanages/:id/reject', (req, res) => {
  const orphanageId = req.params.id;
  const { reason } = req.body;

  if (!reason || !reason.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Rejection reason is required'
    });
  }

  console.log(`Rejecting orphanage ${orphanageId} with reason: ${reason}`);

  // Find and update orphanage
  const orphanageIndex = orphanages.findIndex(o => o.id === orphanageId);

  if (orphanageIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Orphanage not found'
    });
  }

  orphanages[orphanageIndex].verified = false;
  orphanages[orphanageIndex].rejected = true;
  orphanages[orphanageIndex].rejectedAt = new Date().toISOString();
  orphanages[orphanageIndex].rejectionReason = reason;

  console.log(`Orphanage ${orphanages[orphanageIndex].name} rejected successfully`);

  res.json({
    success: true,
    message: 'Orphanage rejected successfully'
  });
});

app.get('/api/admin/orphanages', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  res.json({
    success: true,
    data: orphanages,
    totalElements: orphanages.length,
    totalPages: Math.ceil(orphanages.length / size),
    currentPage: parseInt(page)
  });
});

app.get('/api/admin/donations', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  res.json({
    success: true,
    data: donations,
    totalElements: donations.length,
    totalPages: Math.ceil(donations.length / size),
    currentPage: parseInt(page)
  });
});

app.get('/api/admin/reviews', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  res.json({
    success: true,
    data: reviews,
    totalElements: reviews.length,
    totalPages: Math.ceil(reviews.length / size),
    currentPage: parseInt(page)
  });
});

app.get('/api/admin/payments', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  res.json({
    success: true,
    data: payments,
    totalElements: payments.length,
    totalPages: Math.ceil(payments.length / size),
    currentPage: parseInt(page)
  });
});

app.get('/api/admin/categories', (req, res) => {
  const { page = 0, size = 10 } = req.query;

  const categories = [
    { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 2592000000).toISOString() },
    { id: '2', name: 'Clothing', description: 'Clothing and fashion items', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 2592000000).toISOString() },
    { id: '3', name: 'Books', description: 'Books and educational materials', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 2592000000).toISOString() },
    { id: '4', name: 'Home & Garden', description: 'Home and garden items', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 2592000000).toISOString() },
    { id: '5', name: 'Sports & Recreation', description: 'Sports and recreational equipment', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 2592000000).toISOString() },
    { id: '6', name: 'Furniture', description: 'Furniture and home decor', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 1296000000).toISOString() },
    { id: '7', name: 'Utensils', description: 'Kitchen and dining utensils', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 1296000000).toISOString() },
    { id: '8', name: 'Footwear', description: 'Shoes and footwear', productCount: 0, status: 'ACTIVE', createdAt: new Date(Date.now() - 1296000000).toISOString() }
  ];

  res.json({
    success: true,
    data: categories,
    totalElements: categories.length,
    totalPages: Math.ceil(categories.length / size),
    currentPage: parseInt(page)
  });
});

// Donation endpoints
app.post('/api/donations', (req, res) => {
  const donationData = req.body;
  console.log('Donation submission received:', donationData);

  const donation = {
    id: 'donation-' + Date.now(),
    ...donationData,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  donations.push(donation);

  // Create notification for admin
  const adminNotification = {
    id: 'notif-' + Date.now(),
    userId: '1', // Admin user ID
    type: 'donation_received',
    title: 'New Donation Received',
    message: `${donation.donorName} wants to donate to ${donation.orphanageName}`,
    data: { donationId: donation.id },
    read: false,
    createdAt: new Date().toISOString()
  };

  if (!userNotifications['1']) {
    userNotifications['1'] = [];
  }
  userNotifications['1'].push(adminNotification);

  console.log('Donation created:', donation.id);
  console.log('Admin notification created');

  res.json({
    success: true,
    message: 'Donation submitted successfully',
    data: donation
  });
});

// Get donations for admin
app.get('/api/admin/donations', (req, res) => {
  console.log('Fetching donations for admin');
  console.log(`Found ${donations.length} donations`);

  res.json({
    success: true,
    data: donations
  });
});

// Get donations for user
app.get('/api/user/donations', (req, res) => {
  const userId = req.query.userId || req.headers['user-id'];
  console.log('Fetching donations for user:', userId);

  // For demo, we'll match by email since we don't have proper auth
  const userEmail = req.query.email;
  const userDonations = donations.filter(d => d.donorEmail === userEmail);

  console.log(`Found ${userDonations.length} donations for user`);

  res.json({
    success: true,
    data: userDonations
  });
});

// Update donation status (admin only)
app.put('/api/admin/donations/:id/status', (req, res) => {
  const donationId = req.params.id;
  const { status, message } = req.body;

  console.log(`Updating donation ${donationId} status to: ${status}`);

  const donation = donations.find(d => d.id === donationId);
  if (!donation) {
    return res.status(404).json({
      success: false,
      message: 'Donation not found'
    });
  }

  donation.status = status;
  donation.adminMessage = message;
  donation.updatedAt = new Date().toISOString();

  // Create notification for donor
  const donorNotification = {
    id: 'notif-' + Date.now(),
    userId: donation.donorEmail, // Using email as user identifier for demo
    type: 'donation_status_update',
    title: `Donation ${status === 'approved' ? 'Approved' : 'Rejected'}`,
    message: `Your donation to ${donation.orphanageName} has been ${status}. ${message || ''}`,
    data: { donationId: donation.id },
    read: false,
    createdAt: new Date().toISOString()
  };

  if (!userNotifications[donation.donorEmail]) {
    userNotifications[donation.donorEmail] = [];
  }
  userNotifications[donation.donorEmail].push(donorNotification);

  console.log('Donation status updated');
  console.log('Donor notification created');

  res.json({
    success: true,
    message: 'Donation status updated',
    data: donation
  });
});

// Notifications endpoint
app.get('/api/notifications/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('Fetching notifications for user:', userId);

  const notifications = userNotifications[userId] || [];
  console.log(`Found ${notifications.length} notifications for user ${userId}`);

  res.json({
    success: true,
    data: notifications
  });
});

// Orders endpoint
app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  console.log('Order creation received:', orderData);

  const order = {
    id: 'order-' + Date.now(),
    ...orderData,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.push(order);

  // Update statistics
  const totalAmount = order.total || 0;
  console.log(`Order created: ${order.id} for ${totalAmount} FCFA`);

  res.json({
    success: true,
    message: 'Order created successfully',
    data: order
  });
});

// Get orders for admin
app.get('/api/admin/orders', (req, res) => {
  console.log('Fetching orders for admin');
  console.log(`Found ${orders.length} orders`);

  res.json({
    success: true,
    data: orders
  });
});

// Get orders for user
app.get('/api/user/orders', (req, res) => {
  const userEmail = req.query.email;
  console.log('Fetching orders for user:', userEmail);

  const userOrders = orders.filter(o => o.userEmail === userEmail);
  console.log(`Found ${userOrders.length} orders for user`);

  res.json({
    success: true,
    data: userOrders
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 JALAI Test API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Frontend URL: http://localhost:5173`);
  console.log(`📱 Test accounts:`);
  console.log(`   Admin: admin@jalai.com / admin123`);
  console.log(`   Client: client@jalai.com / client123`);
  console.log(`   Orphanage: orphanage@jalai.com / orphanage123`);
  console.log(`   Personal: moforbei@gmail.com / password123`);

  // Initialize sample data
  initializeSampleData();
});
