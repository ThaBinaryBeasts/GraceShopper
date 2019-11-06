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
    allowNull: false,
    defaultValue: 'No Description'
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 3000.0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://img-cdn.tid.al/m/6112c1305c0c3ef13597eb0de3e8df123f020fe6.jpg',
    validate: {
      isUrl: true
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  region: {
    type: Sequelize.ENUM('United States , Scotland , Ireland , Japon , Canada')
  }
});

module.exports = Item;
