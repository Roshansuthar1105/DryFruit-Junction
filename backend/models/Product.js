const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discountPercent: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  bgGradient: { type: String, required: true },
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);
