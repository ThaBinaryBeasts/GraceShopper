const Sequelize = require('sequelize');

const db = require('../db');
const Item = require('./item');
const ItemOrders = require('./itemOrders');

const Order = db.define('order', {
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 500000.0
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 0,
    validate: {
      isIn: [['pending', 'completed']]
    }
  }
});

Order.getTotalOrder = async orderId => {
  const order = await Order.findByPk(orderId, {
    include: [{model: Item, as: ItemOrders}]
  });

  const itemsInOrder = order.items;

  const totalOrder = itemsInOrder.reduce((acc, val) => {
    return acc + val.itemOrders.total;
  }, 0);

  order.total = totalOrder;
  await order.save();
};

Order.getLastAdded = async orderId => {
  const order = await Order.findByPk(orderId, {
    include: [{model: Item, as: ItemOrders}]
  });

  const itemsInOrder = order.items;

  const lastAddedItem = itemsInOrder[itemsInOrder.length - 1];
  //chaeck with team
  // console.log('data from order.getLast >>>>>>>>>>>>>>>', lastAddedItem.item);

  return lastAddedItem;
};

module.exports = Order;
