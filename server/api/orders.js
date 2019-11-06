const router = require('express').Router();
const {ItemOrders, Item, Order} = require('../db/models');

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const item = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      include: [{model: Item, as: ItemOrders}]
    });
    res.send(item);
  } catch (error) {
    next(error);
  }
});

router.get('/history/:userId', async (req, res, next) => {
  try {
    const item = await Order.findAll({
      where: {
        status: 'completed',
        userId: req.params.userId
      },
      include: [{model: Item, as: ItemOrders}]
    });
    res.send(item);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId/addcart', async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;

    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      defaults: req.body
    });

    const orderId = cart[0].id;

    const addedItem = await ItemOrders.create({itemId, quantity, orderId});

    res.status(201).send(addedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
