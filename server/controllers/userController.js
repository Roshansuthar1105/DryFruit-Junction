const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    'favorites',
    'name price image description category'
  );

  res.json(user.favorites);
});

// @desc    Toggle favorite product
// @route   POST /api/users/favorites/:productId
// @access  Private
const toggleFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  const isFavorite = user.favorites.includes(productId);

  if (isFavorite) {
    // Remove from favorites
    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== productId
    );
  } else {
    // Add to favorites
    user.favorites.push(productId);
  }

  await user.save();

  res.json({
    success: true,
    isFavorite: !isFavorite,
  });
});

module.exports = {
  getFavorites,
  toggleFavorite,
};