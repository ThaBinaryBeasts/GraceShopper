const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users.js'));
router.use('/items', require('./items.js'));
router.use('/orders', require('./orders.js'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// checkout
// checkout button on the bottom
// render a page where you say "good job you have ordered!"
// changing order status from pending to completed
// updating all of the unit prices in your join table
// updating inventory of your products

// create a new cart for your user
