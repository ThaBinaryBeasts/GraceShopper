const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

// WHO is allowed to see this route
// security
// gatekeeper middleware
// calling next to make sure you don't hang a request in Express
router.get('/', async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        attributes: ['id', 'email', 'firstName', 'lastName', 'flag']
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.params.id, {
        where: {
          attributes: ['id', 'email', 'firstName', 'lastName', 'flag']
        }
      })
    );
  } catch (error) {
    next(error);
  }
});
