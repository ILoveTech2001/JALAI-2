const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  condition: {
    type: DataTypes.ENUM('NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR'),
    defaultValue: 'GOOD'
  },
  status: {
    type: DataTypes.ENUM('PENDING_APPROVAL', 'ACTIVE', 'SOLD', 'INACTIVE'),
    defaultValue: 'PENDING_APPROVAL'
  },
  imageData: {
    type: DataTypes.BYTEA,
    allowNull: true
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sellerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  soldAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  approvedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'products',
  indexes: [
    {
      fields: ['sellerId']
    },
    {
      fields: ['categoryId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['featured']
    },
    {
      fields: ['price']
    },
    {
      fields: ['createdAt']
    }
  ]
});

// Instance methods
Product.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.imageData; // Don't include binary data in JSON
  
  // Add image URL if image exists
  if (this.imageData && this.imageData.length > 0) {
    values.imageUrl = `/api/products/${this.id}/image`;
  }
  
  return values;
};

Product.prototype.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

Product.prototype.markAsSold = async function() {
  this.status = 'SOLD';
  this.soldAt = new Date();
  return this.save();
};

Product.prototype.approve = async function(approvedBy) {
  this.status = 'ACTIVE';
  this.approvedAt = new Date();
  this.approvedBy = approvedBy;
  return this.save();
};

// Class methods
Product.findActive = function() {
  return this.findAll({ 
    where: { status: 'ACTIVE' },
    order: [['createdAt', 'DESC']]
  });
};

Product.findByCategory = function(categoryId) {
  return this.findAll({ 
    where: { 
      categoryId,
      status: 'ACTIVE'
    },
    order: [['createdAt', 'DESC']]
  });
};

Product.findBySeller = function(sellerId) {
  return this.findAll({ 
    where: { sellerId },
    order: [['createdAt', 'DESC']]
  });
};

Product.findFeatured = function() {
  return this.findAll({ 
    where: { 
      featured: true,
      status: 'ACTIVE'
    },
    order: [['createdAt', 'DESC']]
  });
};

Product.findPendingApproval = function() {
  return this.findAll({ 
    where: { status: 'PENDING_APPROVAL' },
    order: [['createdAt', 'ASC']]
  });
};

module.exports = Product;
