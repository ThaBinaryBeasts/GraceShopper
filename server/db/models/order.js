const Sequelize = require('sequelize');

const db = require('../db');

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

module.exports = Order;
