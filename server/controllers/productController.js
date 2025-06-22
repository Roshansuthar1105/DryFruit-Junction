const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require('../utils/cloudinary');
const fs=require('fs')
const { logActivity } = require('./activityController');
// productController.js
const { uploader, destroy } = require('../utils/cloudinary');
// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
// In createProduct controller, remove the image requirement check
const createProduct = asyncHandler(async (req, res) => {
  try {
    // Parse the JSON data from the form
    let productData;
    try {
      productData = req.body; // No need for JSON.parse since we're not mixing files and JSON
    } catch (err) {
      res.status(400);
      throw new Error('Invalid product data format');
    }

    const { 
      name, 
      description, 
      price, 
      category, 
      stock,
      shortDescription,
      originalPrice,
      weight,
      ingredients,
      lowStockThreshold,
      isActive,
      featured,
      tags,
      rating,
      shelfLife,
      storageInstructions,
      allergens,
      isVegan,
      isGlutenFree,
      preparationTime,
      slug
    } = productData;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock: stock || 10,
      user: req.user._id,
      shortDescription: shortDescription || '',
      originalPrice: originalPrice || null,
      weight: weight || '',
      ingredients: ingredients || [],
      lowStockThreshold: lowStockThreshold || 10,
      isActive: isActive !== undefined ? isActive : true,
      featured: featured || false,
      tags: tags || [],
      rating: rating || 4.5,
      shelfLife: shelfLife || '',
      storageInstructions: storageInstructions || '',
      allergens: allergens || [],
      isVegan: isVegan || false,
      isGlutenFree: isGlutenFree || false,
      preparationTime: preparationTime || '',
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      images: [] // Start with empty images array
    });

    const createdProduct = await product.save();
    await logActivity('product_add', req.user._id, 'Product added', { productId: createdProduct._id });
    
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: error.message || 'Failed to create product'
    });
  }
});

// Update updateProduct to match the schema
const updateProduct = asyncHandler(async (req, res) => {
  const { 
    name, 
    description, 
    price, 
    category, 
    stock,
    shortDescription,
    originalPrice,
    weight,
    ingredients,
    lowStockThreshold,
    isActive,
    featured,
    tags,
    rating,
    shelfLife,
    storageInstructions,
    allergens,
    isVegan,
    isGlutenFree,
    preparationTime,
    slug
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Required fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    
    // Optional fields
    product.shortDescription = shortDescription !== undefined ? shortDescription : product.shortDescription;
    product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
    product.weight = weight !== undefined ? weight : product.weight;
    product.ingredients = ingredients !== undefined ? ingredients : product.ingredients;
    product.lowStockThreshold = lowStockThreshold !== undefined ? lowStockThreshold : product.lowStockThreshold;
    product.isActive = isActive !== undefined ? isActive : product.isActive;
    product.featured = featured !== undefined ? featured : product.featured;
    product.tags = tags !== undefined ? tags : product.tags;
    product.rating = rating !== undefined ? rating : product.rating;
    product.shelfLife = shelfLife !== undefined ? shelfLife : product.shelfLife;
    product.storageInstructions = storageInstructions !== undefined ? storageInstructions : product.storageInstructions;
    product.allergens = allergens !== undefined ? allergens : product.allergens;
    product.isVegan = isVegan !== undefined ? isVegan : product.isVegan;
    product.isGlutenFree = isGlutenFree !== undefined ? isGlutenFree : product.isGlutenFree;
    product.preparationTime = preparationTime !== undefined ? preparationTime : product.preparationTime;
    product.slug = slug !== undefined ? slug : product.slug;

    const updatedProduct = await product.save();
    await logActivity('product_update', req.user._id, 'Product updated', { productId: updatedProduct._id });
    
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Delete images from Cloudinary
    if (product.images?.length > 0) {
      await Promise.all(
        product.images.map(image => 
          destroy(image.public_id).catch(e => {
            console.error(`Failed to delete image ${image.public_id}:`, e);
          })
        )
      );
    }

    await Product.deleteOne({ _id: product._id });
    await logActivity('product_delete', req.user._id, 'Product deleted', { productId: product._id });
    
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      message: error.message || 'Failed to delete product'
    });
  }
});

// @desc    Upload product images
// @route   POST /api/products/:id/images
// @access  Private/Admin
const uploadProductImages = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const urls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const result = await uploader(path, 'sweet-delights/products');
    
    urls.push({
      url: result.secure_url,
      public_id: result.public_id, // Store Cloudinary's public_id
      alt: file.originalname
    });
  }

  product.images = [...product.images, ...urls];
  await product.save();
  
  await logActivity('product_images_add', req.user._id, 'Product images added', { 
    productId: product._id 
  });

  res.status(200).json({
    success: true,
    data: product.images
  });
});
// @desc    Delete product image
// @route   DELETE /api/products/:id/images
// @access  Private/Admin
const deleteProductImage = asyncHandler(async (req, res) => {
  const { public_id } = req.body; // Now expecting public_id instead of _id
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Find the image to verify it exists
  // const imageExists = product.images.some(img => img._id === public_id || img._id==`ObjectId('${public_id}')`);
  const imageExists = product.images.filter(img => img._id.toString() === public_id);
  if (!imageExists) {
    res.status(404);
    throw new Error('Image not found in product');
  }

  try {
    // Delete from Cloudinary first
    await destroy(imageExists[0].public_id);
    product.images = product.images.filter(img => img._id.toString() !== public_id);
    await product.save();

    await logActivity('product_image_delete', req.user._id, 'Product image deleted', { 
      productId: product._id,
      imagePublicId: public_id
    });

    res.status(200).json({
      success: true,
      data: product.images
    });
  } catch (error) {

    console.error('Error deleting image:', error);
    res.status(500);
    throw new Error('Error deleting image');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage
};