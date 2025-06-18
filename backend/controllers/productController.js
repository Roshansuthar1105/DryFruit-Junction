// controllers/productController.js

const Product = require('../models/Product');

// @desc   Get all products
// @route  GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

// @desc   Add a new product
// @route  POST /api/products
// @access Admin only
const addProduct = async (req, res) => {
  try {
    const {
      name,
      weight,
      price,
      originalPrice,
      discountPercent,
      imageUrl,
      bgGradient,
      inStock
    } = req.body;

    // Validation
    if (!name || !weight || !price || !imageUrl || !bgGradient) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields: name, weight, price, imageUrl, bgGradient",
      });
    }

    const newProduct = new Product({
      name,
      weight,
      price,
      originalPrice,
      discountPercent,
      imageUrl,
      bgGradient,
      inStock
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
};
