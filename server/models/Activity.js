// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Some activities might be system-generated
  },
  type: {
    type: String,
    required: true,
    enum: ['login', 'signup', 'product_add', 'product_update', 'order_placed', 'order_shipped', 'order_delivered', 'order_cancelled']
  },
  description: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', activitySchema);