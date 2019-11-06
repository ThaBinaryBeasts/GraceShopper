const Sequelize = require('sequelize');
const db = require('../db');

const ItemOrders = db.define('itemOrders', {
  quantity: {
    // min/max
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
  // individual price AT TIME OF PURCHASE
});

module.exports = ItemOrders;
