const Sequelize = require('sequelize');
const db = require('../db');

const ItemOrders = db.define('itemOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = ItemOrders;
