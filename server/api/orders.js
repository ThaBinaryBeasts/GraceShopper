const router = require('express').Router();
const {ItemOrders, Item, Order} = require('../db/models');

router.get('/cart', async (req, res, next) => {
  try {
    const item = await Order.findOne({
      where: {
        userId: req.user.id,
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

router.post('/addcart', async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;

    const itemPrice = req.body.itemPrice;

    const total = quantity * itemPrice;

    let oldTotal;

    //Looking for the order, if It doesn't exist create new with status "pending" that represents user's cart
    const cart = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'pending'
      }
    });

    const order = cart[0];
    const orderId = order.id;

    //Push item refference and quantity into joint table(itemOrder);
    const addingQuantity = await ItemOrders.findOrCreate({
      where: {
        orderId: orderId,
        itemId: itemId
      },
      defaults: {itemId, quantity, orderId, total}
    });

    const updatedOrderItem = addingQuantity[0];

    if (!addingQuantity[1]) {
      updatedOrderItem.quantity = quantity;

      oldTotal = updatedOrderItem.total;

      updatedOrderItem.total = total;
      await updatedOrderItem.save();
    }

    // updating total in user order and rounding it to $0.00
    if (oldTotal) {
      order.total -= oldTotal;
    }
    order.total += updatedOrderItem.total;

    await order.save();

    //requesting our full order
    const finalOrder = await Order.findByPk(orderId, {
      include: [{model: Item, as: ItemOrders}]
    });

    res.status(201).send(finalOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
