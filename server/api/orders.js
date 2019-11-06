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

    //Looking for the order, if It doesn't exist create new with status "pending" that represents user's cart
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      defaults: req.body
    });

    const order = cart[0];
    const orderId = order.id;

    //Push item refference and quantity into joint table(itemOrder);
    await ItemOrders.create({itemId, quantity, orderId});

    // Get specific Item to retrieve item price
    const item = await Item.findByPk(itemId);

    // updating total in user order and rounding it to $0.00
    order.total += Math.round(item.price * quantity * 100) / 100;
    await order.save();

    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
