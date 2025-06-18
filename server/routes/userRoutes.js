const express = require('express');
const { getFavorites, toggleFavorite } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/favorites').get(protect, getFavorites);
router.route('/favorites/:productId').post(protect, toggleFavorite);

module.exports = router;