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
      type: Sequelize.DATEONLY
    },
    return: {
      type: Sequelize.INTEGER
    }
  },
  {underscored: true}
)

module.exports = CashFlow
