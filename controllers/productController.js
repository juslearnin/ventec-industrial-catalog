const Product = require('./../models/productModel');
const AppError = require('./../utils/appError');
// ✅ Note: No catchAsync import here!

// 1. GET ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const products = await Product.find(JSON.parse(queryStr));

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products }
    });
  } catch (err) {
    next(err);
  }
};

// 2. CREATE PRODUCT
exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { product: newProduct }
    });
  } catch (err) {
    next(err);
  }
};

// 3. GET SINGLE PRODUCT
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (err) {
    next(err);
  }
};