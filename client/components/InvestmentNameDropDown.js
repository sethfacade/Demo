import React from 'react'
import {connect} from 'react-redux'
import {fetchCashFlow} from '../store/cashFlow'

class InvestmentNameDropDown extends React.Component {
  constructor() {
    super()
    this.state = {
      currentValue: '',
      updatedValue: '',
      date: '',
      value: ''
    }
    this.handleInvestmentNameChange = this.handleInvestmentNameChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleInvestmentNameChange(e) {
    const investments = this.props.investments.investments
    const investmentId = e.target.value
    let cashFlow
    let currentValue
    let valWithoutReturn
    for (let i = 0; i < investments.length; i++) {
      let eachInvestment = investments[i]
      if (eachInvestment.id === investmentId) {
        valWithoutReturn = eachInvestment.amount / 100
      }
    }
    if (investmentId !== 'select') {
      await this.props.getCashFlow(investmentId)
    }
    cashFlow = this.props.cashFlow.return
    currentValue = valWithoutReturn * (1 + cashFlow / 100)
    this.setState({currentValue})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    const investments = this.props.investments.investments
    return (
      <div>
        <label htmlFor="investmentName">Investment Name: </label>
        <select onChange={this.handleInvestmentNameChange}>
          <option value="select">Investment Name</option>
          {investments.map(investment => {
            return (
              <option key={investment.id} value={investment.id}>
                {investment.name}
              </option>
            )
          })}
        </select>
        <form>
          <label htmlFor="currentValue">Current Value</label>
          <input
            name="currentValue"
            type="number"
            value={this.state.currentValue}
          />
          <label htmlFor="updatedValue">Updated Value</label>
          <input
            name="updatedValue"
            type="number"
            value={this.state.updatedValue}
          />
        </form>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="date">Date</label>
          <input
            name="date"
            type="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          <label htmlFor="value">Value</label>
          <input
            name="value"
            type="number"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    cashFlow: state.cashFlow,
    investments: state.investments,
    client: state.client,
    funds: state.funds.allFunds,
    filteredFunds: state.funds.filteredFunds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getFunds: () => dispatch(fetchAllFunds()),

    // getFilteredFunds: (filteredFunds) =>
    //   dispatch(getFilteredFunds(filteredFunds)),

    // getUniqueFundTypes: (uniqueTypes) =>
    //   dispatch(getUniqueFundTypes(uniqueTypes)),

    // getClients: () => dispatch(fetchAllClients()),

    // getInvestment: (clientId, fundId) =>
    //   dispatch(fetchInvestments(clientId, fundId)),

    getCashFlow: investmentId => dispatch(fetchCashFlow(investmentId))

    // getSelectedIds: (fundId) => dispatch(getSelectedIds(fundId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  InvestmentNameDropDown
)
