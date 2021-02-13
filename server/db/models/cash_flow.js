const Sequelize = require('sequelize')
const db = require('../db')

const CashFlow = db.define('cash_flows', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATEONLY
  },
  return: {
    type: Sequelize.INTEGER
  }
})

module.exports = CashFlow
