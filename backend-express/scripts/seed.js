const { sequelize } = require('../config/database');
const { User, Category, Product } = require('../models');
require('dotenv').config();

/**
 * Seed the database with initial data
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // Create admin user
    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@jalai.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
      emailVerified: true
    });
    console.log('✅ Admin user created');

    // Create test client user
    const clientUser = await User.create({
      email: 'client@jalai.com',
      password: 'client123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'CLIENT',
      isActive: true,
      emailVerified: true
    });
    console.log('✅ Test client user created');

    // Create categories
    const categories = await Category.bulkCreate([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        sortOrder: 1
      },
      {
        name: 'Clothing',
        description: 'Clothing and fashion items',
        sortOrder: 2
      },
      {
        name: 'Books',
        description: 'Books and educational materials',
        sortOrder: 3
      },
      {
        name: 'Home & Garden',
        description: 'Home and garden items',
        sortOrder: 4
      },
      {
        name: 'Sports & Recreation',
        description: 'Sports and recreational equipment',
        sortOrder: 5
      },
      {
        name: 'Toys & Games',
        description: 'Toys and games for all ages',
        sortOrder: 6
      }
    ]);
    console.log('✅ Categories created');

    // Create sample products
    const sampleProducts = [
      {
        name: 'iPhone 12 Pro',
        description: 'Gently used iPhone 12 Pro in excellent condition',
        price: 699.99,
        condition: 'LIKE_NEW',
        status: 'ACTIVE',
        sellerId: clientUser.id,
        categoryId: categories[0].id, // Electronics
        featured: true
      },
      {
        name: 'Winter Jacket',
        description: 'Warm winter jacket, size M',
        price: 45.00,
        condition: 'GOOD',
        status: 'ACTIVE',
        sellerId: clientUser.id,
        categoryId: categories[1].id, // Clothing
        featured: false
      },
      {
        name: 'JavaScript Programming Book',
        description: 'Learn JavaScript programming with this comprehensive guide',
        price: 25.00,
        condition: 'GOOD',
        status: 'ACTIVE',
        sellerId: clientUser.id,
        categoryId: categories[2].id, // Books
        featured: false
      },
      {
        name: 'Garden Tools Set',
        description: 'Complete set of garden tools including shovel, rake, and pruners',
        price: 35.00,
        condition: 'GOOD',
        status: 'PENDING_APPROVAL',
        sellerId: clientUser.id,
        categoryId: categories[3].id, // Home & Garden
        featured: false
      },
      {
        name: 'Tennis Racket',
        description: 'Professional tennis racket in great condition',
        price: 80.00,
        condition: 'LIKE_NEW',
        status: 'ACTIVE',
        sellerId: clientUser.id,
        categoryId: categories[4].id, // Sports & Recreation
        featured: true
      }
    ];

    await Product.bulkCreate(sampleProducts);
    console.log('✅ Sample products created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Created accounts:');
    console.log(`Admin: ${adminUser.email} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log(`Client: ${clientUser.email} / client123`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

/**
 * Run seeding if this file is executed directly
 */
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
