const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { Product, User, Category } = require('../models');
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products with pagination and filtering
 * @access  Public
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isUUID(),
  query('status').optional().isIn(['PENDING_APPROVAL', 'ACTIVE', 'SOLD', 'INACTIVE']),
  query('featured').optional().isBoolean(),
  query('search').optional().isLength({ min: 1, max: 100 })
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    // Build where clause
    const where = {};
    
    // Only show active products to non-admin users
    if (!req.user || req.user.role !== 'ADMIN') {
      where.status = 'ACTIVE';
    } else if (req.query.status) {
      where.status = req.query.status;
    }

    if (req.query.category) {
      where.categoryId = req.query.category;
    }

    if (req.query.featured === 'true') {
      where.featured = true;
    }

    // Search functionality
    if (req.query.search) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { name: { [Op.iLike]: `%${req.query.search}%` } },
        { description: { [Op.iLike]: `%${req.query.search}%` } }
      ];
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      distinct: true
    });

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get('/:id', [
  param('id').isUUID()
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user can view this product
    if (product.status !== 'ACTIVE' && 
        (!req.user || (req.user.role !== 'ADMIN' && req.user.id !== product.sellerId))) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views for active products
    if (product.status === 'ACTIVE') {
      await product.incrementViews();
    }

    res.json({
      success: true,
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route   GET /api/products/:id/image
 * @desc    Get product image
 * @access  Public
 */
router.get('/:id/image', [
  param('id').isUUID()
], async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: ['imageData', 'imageType', 'imageName']
    });

    if (!product || !product.imageData) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Set appropriate headers
    res.set({
      'Content-Type': product.imageType || 'image/jpeg',
      'Content-Length': product.imageData.length,
      'Cache-Control': 'public, max-age=86400' // Cache for 1 day
    });

    res.send(product.imageData);
  } catch (error) {
    console.error('Get product image error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (CLIENT role)
 */
router.post('/', [
  body('name').trim().isLength({ min: 1, max: 255 }),
  body('description').optional().isLength({ max: 5000 }),
  body('price').isFloat({ min: 0 }),
  body('categoryId').isUUID(),
  body('condition').optional().isIn(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']),
  body('imageData').optional().isString(),
  body('imageName').optional().isString(),
  body('imageType').optional().isString()
], authenticate, authorize('CLIENT', 'ADMIN'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description, price, categoryId, condition, imageData, imageName, imageType } = req.body;

    // Verify category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Process image data if provided
    let processedImageData = null;
    if (imageData) {
      try {
        // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
        let base64Data = imageData;
        if (base64Data.includes(',')) {
          base64Data = base64Data.split(',')[1];
        }

        processedImageData = Buffer.from(base64Data, 'base64');
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image data format'
        });
      }
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      condition: condition || 'GOOD',
      sellerId: req.user.id,
      imageData: processedImageData,
      imageName,
      imageType,
      status: 'PENDING_APPROVAL'
    });

    // Fetch the created product with associations
    const createdProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        product: createdProduct
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
