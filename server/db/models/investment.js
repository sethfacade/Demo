const Sequelize = require('sequelize')
const db = require('../db')

const Investment = db.define(
  'investment',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    amount: {
      type: Sequelize.INTEGER
    }
  },
  {underscored: true}
)

// NUMBERS ARE * 100 INTO DB FOR BETTER ACCURACY TO ACCOUNT FOR FLOATING POINT PRECIONS IN JS //
Investment.beforeCreate(investment => {
  investment.amount = Math.round(+investment.amount * 100)
})

Investment.beforeUpdate(investment => {
  investment.amount = Math.round(+investment.amount * 100)
})

module.exports = Investment
