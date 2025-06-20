const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  public_id: {  // This is the crucial field for Cloudinary operations
    type: String,
    required: true
  },
}, { _id: true }); // Keep the _id field for images

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
  shortDescription: {
    type: String,
    required: false // Optional field
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0'],
  },
  originalPrice: {
    type: Number,
    required: false // Optional field
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Premium', 'Regular', 'Seasonal','Chocolates','Macarons'], // Add your categories
  },
  weight: {
    type: String,
    required: false // Optional field
  },
  ingredients: {
    type: [String],
    required: false // Optional field
  },
  images: {
    type: [imageSchema],
    required: [true, 'Product images are required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one image is required'
    }
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },
  numReviews: {
    type: Number,
    default: 0
  },
  shelfLife: {
    type: String,
    required: false // Optional field
  },
  storageInstructions: {
    type: String,
    required: false // Optional field
  },
  allergens: {
    type: [String],
    default: []
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  preparationTime: {
    type: String,
    required: false // Optional field
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review',
    default: []
  },
  slug: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Add text index for search functionality
productSchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Product', productSchema);
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: [true, 'Product description is required'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Product price is required'],
//     min: [0, 'Price must be at least 0'],
//   },
//   category: {
//     type: String,
//     required: [true, 'Product category is required'],
//     enum: ['Chocolates', 'Macarons', 'Fudge', 'Bonbons', 'Jellies', 'Pralines'],
//   },
//   image: {
//     type: String,
//     required: [true, 'Product image is required'],
//   },
//   rating: {
//     type: Number,
//     default: 4.5,
//     min: [1, 'Rating must be at least 1'],
//     max: [5, 'Rating must be at most 5'],
//   },
//   stock: {
//     type: Number,
//     default: 10,
//     min: [0, 'Stock cannot be negative'],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Product', productSchema);