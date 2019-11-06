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

const calculateTotal = (price, quantity) => {
  return Math.round(price * quantity * 100) / 100;
};

router.post('/:userId/addcart', async (req, res, next) => {
  try {
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;

    //Looking for the order, if It doesn't exist create new with status "pending" that represents user's cart
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
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
      defaults: {itemId, quantity, orderId}
    });

    if (!addingQuantity[1]) {
      addingQuantity[0].quantity = quantity;
      await addingQuantity[0].save();
    }

    // Get specific Item to retrieve item price
    const item = await Item.findByPk(itemId);

    // updating total in user order and rounding it to $0.00
    order.total += calculateTotal(item.price, quantity);
    await order.save();

    //requesting our full order
    const finalOrder = await Order.findByPk(orderId, {
      include: [{model: Item, as: ItemOrders}]
    });

    // grabing the last item we just added to the cart
    const addedItem = finalOrder.items[finalOrder.items.length - 1];

    res.status(201).send(addedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
