const Sequelize = require('sequelize');

const db = require('../db');

const Order = db.define('order', {
  total: {
    // current total price -> as an integer
    // having max and min
    type: Sequelize.FLOAT,
    defaultValue: 0
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
