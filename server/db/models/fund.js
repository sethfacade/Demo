const Sequelize = require('sequelize')
const db = require('../db')

const Fund = db.define(
  'fund',
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
    type: {
      type: Sequelize.STRING
    },
    inceptionDate: {
      type: Sequelize.DATEONLY
    },
    description: {
      type: Sequelize.TEXT
    }
  },
  {underscored: true}
)

module.exports = Fund
