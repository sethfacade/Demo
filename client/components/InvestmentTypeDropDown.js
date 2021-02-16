import React from 'react'
import {connect} from 'react-redux'
import {getSelectedIds, fetchInvestments} from '../store/investment'

function InvestmentTypeDropDown(props) {
  const filteredFunds = props.filteredFunds
  const currentClientId = props.investments.selectedId

  const handleInvestmentTypeChange = e => {
    props.reset()
    const fundId = e.target.value
    console.log(currentClientId, fundId)
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
    investments: state.investments,
    funds: state.funds.allFunds,
    filteredFunds: state.funds.filteredFunds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvestment: (clientId, fundId) =>
      dispatch(fetchInvestments(clientId, fundId)),

    getSelectedIds: fundId => dispatch(getSelectedIds(fundId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  InvestmentTypeDropDown
)
