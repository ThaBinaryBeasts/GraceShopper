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
    // default description of "No description"
  },
  price: {
    // overflow without a maximum
    // it could be negative, have some range to protect our prices
    // dollars as one field, cents as another field BOTH are integers
    // you can store as CENTS. we are going to count our PRICE in PENNIES
    type: Sequelize.FLOAT
    // require not to be null
    // maybe a default value
  },
  imageUrl: {
    // isUrl
    type: Sequelize.STRING,
    defaultValue:
      'http://img-cdn.tid.al/m/6112c1305c0c3ef13597eb0de3e8df123f020fe6.jpg'
  },
  // inventory
  stock: {
    // want a min/max range to secure our stock
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  // in an enum, or in is in
  // have a separate table for this
  region: {
    type: Sequelize.STRING
  }
});

module.exports = Item;
