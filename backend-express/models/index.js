const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');

// Define associations
// User associations
User.hasMany(Product, {
  foreignKey: 'sellerId',
  as: 'products'
});

User.hasMany(Product, {
  foreignKey: 'approvedBy',
  as: 'approvedProducts'
});

// Category associations
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products'
});

// Product associations
Product.belongsTo(User, {
  foreignKey: 'sellerId',
  as: 'seller'
});

Product.belongsTo(User, {
  foreignKey: 'approvedBy',
  as: 'approver'
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

// Export all models
module.exports = {
  User,
  Category,
  Product
};

// Export individual models for convenience
module.exports.User = User;
module.exports.Category = Category;
module.exports.Product = Product;
