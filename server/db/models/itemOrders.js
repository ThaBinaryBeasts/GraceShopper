const Sequelize = require('sequelize');
const db = require('../db');

const ItemOrders = db.define('itemOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  purchasePrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 3000.0
    }
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      getTotal() {
        if (this.quanity > 0) {
          return this.quanity * this.purchasePrice;
        }
      }
    }
  }
});

module.exports = ItemOrders;
