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
  Client,
  Fund,
  Investment,
  CashFlow
}
