/* eslint-disable complexity */
const router = require('express').Router()
const {Fund} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const funds = await Fund.findAll()
    const {permission} = req.query
    if (permission === 'all') return res.json(funds)

    for (let i = 0; i < funds.length; i++) {
      let eachFund = funds[i].dataValues
      for (let attributes in eachFund) {
        if (!permission) {
          if (attributes !== 'type' && attributes !== 'id')
            eachFund[attributes] = '****'
        } else if (!eachFund.type.includes(permission)) {
          if (attributes !== 'type' && attributes !== 'id')
            eachFund[attributes] = '****'
        }
      }
    }
    res.json(funds)
  } catch (error) {
    next(error)
  }
})

module.exports = router
