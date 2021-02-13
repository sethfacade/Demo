const User = require('./user')
const Client = require('./client')
const Fund = require('./fund')
const Investment = require('./investment')
const CashFlow = require('./cash_flow')

Client.hasMany(Investment)
Investment.belongsTo(Client)

Fund.hasMany(Investment)
Investment.belongsTo(Fund)

Investment.hasOne(CashFlow)
CashFlow.belongsTo(Investment)

module.exports = {
  User,
  Client,
  Fund,
  Investment,
  CashFlow
}
