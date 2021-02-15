const router = require('express').Router()
const {CashFlow} = require('../db/models')

// GET ROUTE //
router.get('/:investmentId', async (req, res, next) => {
  try {
    const {investmentId} = req.params
    const cashFlows = await CashFlow.findOne({
      where: {
        investmentId: investmentId
      }
    })
    res.json(cashFlows)
  } catch (error) {
    next(error)
  }
})

// PUT ROUTE //
router.put('/', async (req, res, next) => {
  try {
    const {date, newValue, cashFlowId} = req.body
    const cashFlow = await CashFlow.findOne({where: {id: cashFlowId}})

    const update = await cashFlow.update({date, return: newValue})
    res.json(update)
  } catch (error) {
    next(error)
  }
})

module.exports = router
