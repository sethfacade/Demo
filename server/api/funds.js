/* eslint-disable complexity */
const router = require('express').Router()
const {Fund} = require('../db/models')

// GET UNMASKED FUNDS //
router.get('/', async (req, res, next) => {
  try {
    const funds = await Fund.findAll()
    res.json(funds)
  } catch (error) {
    next(error)
  }
})

// GET MASKED FUNDS //
router.get('/masked', async (req, res, next) => {
  try {
    const funds = await Fund.findAll()
    const permission = req.user.dataValues.permission.split(', ')
    const accessibleFunds = {}
    permission.forEach(element => {
      accessibleFunds[element.toUpperCase()] = true
    })
    const filter = ['id', 'type']
    // Change all to capital cases //

    if (accessibleFunds.ALL) return res.json(funds)

    for (let i = 0; i < funds.length; i++) {
      let eachFund = funds[i].dataValues
      let fundType = eachFund.type
      for (let key in eachFund) {
        if (!accessibleFunds[fundType]) {
          if (!filter.includes(key)) eachFund[key] = '****'
        }
      }
    }
    res.json(funds)
  } catch (error) {
    next(error)
  }
})

module.exports = router
