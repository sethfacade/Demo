import React from 'react'
import {connect} from 'react-redux'
import {getSelectedIds, fetchInvestments} from '../store/investment'

function InvestmentTypeDropDown(props) {
  const filteredFunds = props.filteredFunds
  const currentClientId = props.investments.selectedId

  const handleInvestmentTypeChange = e => {
    const fundId = e.target.value
    if (fundId !== 'select') {
      return props.getInvestment(currentClientId, fundId)
    }
  }

  return (
    <div>
      <label htmlFor="investmentType">Investment Type: </label>
      <select onChange={handleInvestmentTypeChange}>
        <option value="select">Investment Type</option>
        {filteredFunds.map(fund => {
          return (
            <option key={fund.id} value={fund.id}>
              {fund.type}
            </option>
          )
        })}
      </select>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    cashFlows: state.cashFlows,
    investments: state.investments,
    client: state.client,
    funds: state.funds.allFunds,
    filteredFunds: state.funds.filteredFunds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFunds: () => dispatch(fetchAllFunds()),

    getFilteredFunds: filteredFunds =>
      dispatch(getFilteredFunds(filteredFunds)),

    getUniqueFundTypes: uniqueTypes =>
      dispatch(getUniqueFundTypes(uniqueTypes)),

    getClients: () => dispatch(fetchAllClients()),

    getInvestment: (clientId, fundId) =>
      dispatch(fetchInvestments(clientId, fundId)),

    // getCashFlow: (investmentId) => dispatch(fetchCashFlow(investmentId)),

    getSelectedIds: fundId => dispatch(getSelectedIds(fundId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  InvestmentTypeDropDown
)
