const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Chocolates', 'Macarons', 'Fudge', 'Bonbons', 'Jellies', 'Pralines'],
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },
  stock: {
    type: Number,
    default: 10,
    min: [0, 'Stock cannot be negative'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);