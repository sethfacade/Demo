const router = require('express').Router()
const {Fund} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const funds = await Fund.findAll()
    res.json(funds)
  } catch (error) {
    next(error)
  }
})

module.exports = router
