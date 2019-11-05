const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://img-cdn.tid.al/m/6112c1305c0c3ef13597eb0de3e8df123f020fe6.jpg'
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  region: {
    type: Sequelize.STRING
  }
});

module.exports = Item;
