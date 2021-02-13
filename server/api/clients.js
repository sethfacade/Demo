const router = require('express').Router()
const {Client} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const clients = await Client.findAll()
    res.json(clients)
  } catch (error) {
    next(error)
  }
})

module.exports = router
