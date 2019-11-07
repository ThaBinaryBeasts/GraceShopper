const Sequelize = require('sequelize');
const db = require('../db');

const ItemOrders = db.define('itemOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1000
    }
  },
  purchasePrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5000.0
    }
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 300000
    }
  }
});

module.exports = ItemOrders;
