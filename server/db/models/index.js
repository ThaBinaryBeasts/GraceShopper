const User = require('./user');
const Item = require('./item');
const Order = require('./order');

// Associations:
User.hasMany(Order);
Order.belongTo(User);

Order.belongsToMany(Item);
Item.belongsToMany(Order);

module.exports = {
  User,
  Item,
  Order
};
