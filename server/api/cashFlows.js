const router = require('express').Router()
const {CashFlow} = require('../db/models')

// GET ROUTE //
router.get('/:investmentId', async (req, res, next) => {
  try {
    const {investmentId} = req.params
    const cashFlows = await CashFlow.findOne({
      where: {
        investment_id: investmentId
      }
    })
    res.json(cashFlows)
  } catch (error) {
    next(error)
  }
})

module.exports = router
