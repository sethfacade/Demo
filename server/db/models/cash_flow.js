const Sequelize = require('sequelize')
const db = require('../db')

const CashFlow = db.define(
  'cash_flows',
  {
    id: {
      type: Sequelize.TEXT,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    return: {
      type: Sequelize.INTEGER
    }
  },
  {underscored: true}
)

// NUMBERS ARE * 100 FOR BETTER ACCURACY TO ACCOUNT FOR FLOATING POINT PRECIONS IN JS //
CashFlow.beforeCreate(cashFlow => {
  cashFlow.return = Math.round(+cashFlow.return * 100)
})

CashFlow.beforeUpdate(cashFlow => {
  cashFlow.return = Math.round(+cashFlow.return * 100)
})

module.exports = CashFlow
