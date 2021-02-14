const router = require('express').Router()
const {Investment} = require('../db/models')

// GET ROUTE //
router.get('/clientId/:clientId/fundId/:fundId', async (req, res, next) => {
  try {
    const {clientId, fundId} = req.params
    const funds = await Investment.findAll({
      where: {
        fund_id: fundId,
        client_id: clientId
      }
    })
    res.json(funds)
  } catch (error) {
    next(error)
  }
})

module.exports = router
