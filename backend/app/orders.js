const router = require('express').Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');

router.get('/', [auth, permit('admin')], async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.send(orders);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/:id', [auth], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    res.send(order);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post('/:id', [auth], async (req, res) => {
    try {
      const order = new Order({
        user: req.user._id,
        product: req.params.id,
        town: req.body.town,
        street: req.body.street,
        postalCode: req.body.postalCode,
      });

      const createdOrder = await order.save();
      res.send(createdOrder);
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    await order.remove();
    res.send({ message: 'Order completed' });
  } catch (e) {
    res.status(400).send({ error: 'Order not found' });
  }
});


module.exports = router;
