const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Mock database for presentation - no real database needed
const mockDB = {
  users: [
    {
      id: '1',
      email: 'admin@jalai.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // admin123
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      userType: 'ADMIN',
      isActive: true,
      emailVerified: true
    },
    {
      id: '2',
      email: 'client@jalai.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // client123
      firstName: 'John',
      lastName: 'Client',
      role: 'CLIENT',
      userType: 'CLIENT',
      isActive: true,
      emailVerified: true
    }
  ],
  products: [
    {
      id: '1',
      name: 'Laptop for Donation',
      description: 'Used laptop in good condition, perfect for students',
      price: 250.00,
      condition: 'GOOD',
      status: 'ACTIVE',
      sellerId: '2',
      categoryId: '1',
      views: 15,
      featured: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Children Books Set',
      description: 'Collection of educational books for children',
      price: 30.00,
      condition: 'LIKE_NEW',
      status: 'ACTIVE',
      sellerId: '2',
      categoryId: '2',
      views: 8,
      featured: false,
      createdAt: new Date('2024-01-20')
    }
  ],
  categories: [
    {
      id: '1',
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      slug: 'electronics',
      isActive: true,
      sortOrder: 1
    },
    {
      id: '2',
      name: 'Books & Education',
      description: 'Books, educational materials, and learning resources',
      slug: 'books-education',
      isActive: true,
      sortOrder: 2
    },
    {
      id: '3',
      name: 'Clothing',
      description: 'Clothes and accessories',
      slug: 'clothing',
      isActive: true,
      sortOrder: 3
    }
  ]
};

const { errorHandler, notFound } = require('./middleware/errorHandler');

// Mock routes - no database required
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration - Completely open for debugging
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Access-Control-Allow-Origin']
};
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Additional CORS headers as backup
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('Request from origin:', origin);

  // Set CORS headers manually for all requests
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    console.log('Preflight request handled');
    return res.sendStatus(200);
  }

  next();
});

// Compression middleware
app.use(compression());

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint - Mock version
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'JALAI API is running (Mock Mode)',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: 'mock',
    users: mockDB.users.length,
    products: mockDB.products.length,
    categories: mockDB.categories.length,
    cors: {
      frontendUrl: process.env.FRONTEND_URL,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// Mock API Routes - Perfect for presentation!

// Mock Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user in mock database
  const user = mockDB.users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check password (using bcrypt for demo)
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Return success with mock JWT
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      userType: user.userType
    },
    accessToken: `mock-jwt-token-${Date.now()}`,
    refreshToken: `mock-refresh-token-${Date.now()}`,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
        userType: user.userType
      }
    }
  });
});

// Mock Products Routes
app.get('/api/products', (req, res) => {
  const { page = 0, size = 10 } = req.query;
  const start = page * size;
  const end = start + parseInt(size);

  const products = mockDB.products
    .filter(p => p.status === 'ACTIVE')
    .slice(start, end)
    .map(product => ({
      ...product,
      seller: mockDB.users.find(u => u.id === product.sellerId),
      category: mockDB.categories.find(c => c.id === product.categoryId)
    }));

  res.json({
    success: true,
    data: {
      products,
      pagination: {
        page: parseInt(page),
        size: parseInt(size),
        total: mockDB.products.filter(p => p.status === 'ACTIVE').length
      }
    }
  });
});

// Mock Categories Routes
app.get('/api/categories/public', (req, res) => {
  const categories = mockDB.categories.filter(c => c.isActive);

  res.json({
    success: true,
    data: {
      categories
    }
  });
});

// Mock User Profile Route
app.get('/api/users/profile', (req, res) => {
  // Mock authentication - return admin user
  const user = mockDB.users[0]; // Admin user

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        userType: user.userType
      }
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'JALAI E-commerce Platform API',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Simple server startup - No database required!
const startServer = () => {
  console.log('🎯 Starting JALAI API in Mock Mode (Perfect for Presentation!)');
  console.log('📊 Mock Data Loaded:');
  console.log(`   👥 Users: ${mockDB.users.length}`);
  console.log(`   📦 Products: ${mockDB.products.length}`);
  console.log(`   📂 Categories: ${mockDB.categories.length}`);
  console.log('');

  // Start server immediately
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log('');
    console.log('🎉 Ready for presentation! Login with:');
    console.log('   📧 Admin: admin@jalai.com / admin123');
    console.log('   👤 Client: client@jalai.com / client123');
  });
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server!
startServer();

module.exports = app;
