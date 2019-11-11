const router = require('express').Router();
const {ItemOrders, Item, Order} = require('../db/models');

router.get('/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      },
      // include: [{ model: Item, as: ItemOrders }]
      include: [{model: Item}]
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.put('/cart', async (req, res, next) => {
  try {
    const quantity = req.body.quantity;
    const itemId = req.body.itemId;
    const orderId = req.body.orderId;
    const price = req.body.price;

    const itemOrderToUpdate = await ItemOrders.findOne({
      where: {
        itemId: itemId,
        orderId: orderId
      }
    });

    itemOrderToUpdate.quantity = quantity;
    itemOrderToUpdate.total = price * quantity;

    await itemOrderToUpdate.save();

    Order.getTotalOrder(orderId);

    res.send(itemOrderToUpdate);
  } catch (error) {
    next(error);
  }
});

router.get('/history', async (req, res, next) => {
  try {
    const item = await Order.findAll({
      where: {
        status: 'completed',
        userId: req.user.id
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
      defaults: {quantity, total}
    });
    const updatedOrderItem = addingQuantity[0];

    if (!addingQuantity[1]) {
      updatedOrderItem.quantity = quantity;
      updatedOrderItem.total = total;
      await updatedOrderItem.save();
    }

    Order.getTotalOrder(orderId);
    // const lastAddedItem = Order.getLastAdded(orderId);

    res.send(updatedOrderItem);
  } catch (error) {
    next(error);
  }
});

router.delete('/cart/:orderId/:itemId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const itemId = req.params.itemId;

    const itemOrder = await ItemOrders.findOne({
      where: {
        orderId: orderId,
        itemId: itemId
      }
    });
    const deleted = itemOrder.destroy();

    Order.getTotalOrder(orderId);

    res.status(204).send(deleted);
  } catch (error) {
    next(error);
  }
});

//This is my checkout route.  it does the following:
//1.
// Use Promise.all
router.put('/cart/checkout', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'pending'
      },
      include: [{model: Item, as: ItemOrders}]
    });

    // const createNew = await cart.getItems();

    //loop through items in cart
    cart.items.forEach(async item => {
      //update stock in the Item
      let itemTable = await Item.findByPk(item.id);
      itemTable.stock = itemTable.stock - item.itemOrders.quantity;
      await itemTable.save();

      //ipdate purchasePrice in the ItemOrders
      let itemOrdersTable = await ItemOrders.findOne({
        where: {
          itemId: item.id
        }
      });
      itemOrdersTable.purchasePrice = item.price;
      await itemOrdersTable.save();
    });

    //Change status to purchased
    cart.status = 'completed';
    await cart.save();

    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
