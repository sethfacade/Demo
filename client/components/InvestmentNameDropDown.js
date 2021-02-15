import React from 'react'
import {connect} from 'react-redux'

function InvestmentNameDropDown(props) {
  const investments = props.investments.investments
  const handleInvestmentNameChange = props.handleInvestmentNameChange
  return (
    <div>
      <label htmlFor="investmentName">Investment Name: </label>
      <select onChange={handleInvestmentNameChange}>
        <option value="select">Investment Name</option>
        {investments.map(investment => {
          return (
            <option key={investment.id} value={investment.id}>
              {investment.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    investments: state.investments
  }
}

export default connect(mapStateToProps, null)(InvestmentNameDropDown)
