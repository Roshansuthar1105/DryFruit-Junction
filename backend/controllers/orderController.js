const Order = require('../models/Order');
const User = require('../models/User');

exports.placeOrder = async (req, res) => {
  const { name, phone, email, location, cart, note } = req.body;

  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({ name, phone, email, location });
    await user.save();
  }

  const order = new Order({ user: user._id, cart, location, note });
  await order.save();

  res.json({ message: 'Order placed successfully' });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate('user');
  res.json(orders);
};
