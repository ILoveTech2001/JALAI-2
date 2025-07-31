# JALAI E-commerce Platform - Express.js Backend

A robust Express.js backend API for the JALAI e-commerce donation platform with image storage using BLOB/BYTEA for SQL databases.

## Features

- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 🖼️ **Image Storage** - BLOB/BYTEA storage for images in SQL databases
- 📱 **RESTful API** - Clean and well-documented API endpoints
- 🗄️ **Multi-Database Support** - SQLite (development) and PostgreSQL (production)
- 🛡️ **Security** - Rate limiting, CORS, helmet, input validation
- 📊 **Product Management** - Full CRUD operations for products
- 👥 **User Management** - User registration, authentication, and profiles
- 🏷️ **Category System** - Product categorization
- 🔍 **Search & Filtering** - Product search and filtering capabilities

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: Sequelize
- **Authentication**: JWT
- **Validation**: express-validator
- **Security**: helmet, cors, bcryptjs
- **File Upload**: multer
- **Image Processing**: sharp

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- SQLite (for development)
- PostgreSQL (for production)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Seed the database**:
   ```bash
   npm run seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/image` - Get product image
- `POST /api/products` - Create new product (authenticated)

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `GET /api/users/:id/products` - Get user's products
- `GET /api/users/my-products` - Get current user's products (authenticated)
- `PUT /api/users/change-password` - Change password (authenticated)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `GET /api/categories/:id/products` - Get products by category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

## Database Schema

### Users
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `firstName` (String)
- `lastName` (String)
- `phone` (String, Optional)
- `role` (Enum: CLIENT, ADMIN)
- `isActive` (Boolean)
- `emailVerified` (Boolean)
- `profileImage` (BLOB)
- `profileImageName` (String)
- `profileImageType` (String)

### Categories
- `id` (UUID, Primary Key)
- `name` (String, Unique)
- `description` (Text)
- `slug` (String, Unique)
- `isActive` (Boolean)
- `sortOrder` (Integer)

### Products
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (Text)
- `price` (Decimal)
- `condition` (Enum: NEW, LIKE_NEW, GOOD, FAIR, POOR)
- `status` (Enum: PENDING_APPROVAL, ACTIVE, SOLD, INACTIVE)
- `imageData` (BLOB/BYTEA)
- `imageName` (String)
- `imageType` (String)
- `sellerId` (UUID, Foreign Key)
- `categoryId` (UUID, Foreign Key)
- `views` (Integer)
- `featured` (Boolean)

## Environment Variables

```env
NODE_ENV=development
PORT=8080
FRONTEND_URL=http://localhost:3000

# Database
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite

# For production PostgreSQL
# DATABASE_URL=postgresql://user:pass@host:port/db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Admin User
ADMIN_EMAIL=admin@jalai.com
ADMIN_PASSWORD=admin123
```

## Deployment

### Render (PostgreSQL)

1. **Set environment variables**:
   ```env
   NODE_ENV=production
   DATABASE_URL=your-postgresql-url
   JWT_SECRET=your-production-secret
   ```

2. **Build command**: `npm install`
3. **Start command**: `npm start`

## Default Accounts

After seeding:
- **Admin**: admin@jalai.com / admin123
- **Client**: client@jalai.com / client123

## Image Storage

Images are stored as BLOB (SQLite/MySQL) or BYTEA (PostgreSQL) in the database:
- Base64 images are converted to binary data
- Images are served via `/api/products/:id/image` endpoint
- Supports JPEG, PNG, GIF, WebP formats
- Maximum file size: 10MB

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention (Sequelize ORM)

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Seed database with sample data
npm run seed

# Run tests
npm test
```
