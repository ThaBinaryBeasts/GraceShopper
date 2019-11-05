const User = require('./user');
const Item = require('./item');
const Order = require('./order');

// Associations:
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Item);
Item.belongsToMany(Order);

module.exports = {
  User,
  Item,
  Order
};
