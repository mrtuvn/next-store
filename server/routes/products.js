const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products with filters, pagination, sorting
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProduct);

module.exports = router;

