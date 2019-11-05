const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (User.flag === 1) {
      res.send(
        await User.findAll({
          attributes: ['id', 'email', 'firstName', 'lastName', 'flag']
        })
      )
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (User.flag === 1) {
      res.send(
        await User.findByPk(req.params.id, {
          where: {
            attributes: ['id', 'email', 'firstName', 'lastName', 'flag']
          }
        })
      )
    }
  } catch (error) {
    next(error)
  }
})
