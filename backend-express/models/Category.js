const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 100]
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  imageData: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageType: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'categories',
  indexes: [
    {
      unique: true,
      fields: ['name']
    },
    {
      unique: true,
      fields: ['slug']
    },
    {
      fields: ['isActive']
    },
    {
      fields: ['sortOrder']
    }
  ],
  hooks: {
    beforeCreate: (category) => {
      if (!category.slug) {
        category.slug = category.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    },
    beforeUpdate: (category) => {
      if (category.changed('name') && !category.changed('slug')) {
        category.slug = category.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    }
  }
});

// Instance methods
Category.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.imageData; // Don't include binary data in JSON
  return values;
};

// Class methods
Category.findActive = function() {
  return this.findAll({ 
    where: { isActive: true },
    order: [['sortOrder', 'ASC'], ['name', 'ASC']]
  });
};

Category.findBySlug = function(slug) {
  return this.findOne({ where: { slug } });
};

module.exports = Category;
