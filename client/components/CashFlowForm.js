import React from 'react'
import {connect} from 'react-redux'
import {fetchCashFlow, updateCashThunk} from '../store/cashFlow'
// import {fetchInvestments} from '../store/investment'
import {fetchAllClients} from '../store/client'
import {fetchAllFunds} from '../store/fund'
import {
  ClientNameDropDown,
  InvestmentTypeDropDown,
  InvestmentNameDropDown
} from './index'
import {UpdateForm} from './UpdateForm'

class CashFlowForm extends React.Component {
  constructor() {
    super()
    this.state = {
      currentValue: '',
      updatedValue: '',
      date: '',
      value: '',
      investmentAmount: ''
    }
    this.handleInvestmentNameChange = this.handleInvestmentNameChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.calculate = this.calculate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleInvestmentNameChange(e) {
    const investments = this.props.investments.investments
    const investmentId = e.target.value
    if (investmentId !== 'select') {
      let currentValue
      let valWithoutReturn
      for (let i = 0; i < investments.length; i++) {
        let eachInvestment = investments[i]
        if (eachInvestment.id === investmentId) {
          valWithoutReturn = eachInvestment.amount / 100
        }
      }
      this.setState({investmentAmount: valWithoutReturn})
      if (investmentId !== 'select') {
        await this.props.getCashFlow(investmentId)
      }

      const cashFlow = this.props.cashFlow.return / 100
      currentValue = valWithoutReturn * (1 + cashFlow / 100)
      this.setState({currentValue})
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    // SHOULD BE ABLE TO SUBMIT FORM WITHOUT PRESSING CALCULATE //
    const cashFlowId = this.props.cashFlow.id
    const updatedValue = this.state.currentValue * (1 + this.state.value / 100)
    const difference = updatedValue - this.state.investmentAmount
    const newValue = difference / this.state.investmentAmount * 100
    // IF NO DATE IS ENTERED, IT WILL GO DEFAULT VALUE TO TODAY'S DATE //
    let update
    if (this.state.date) {
      update = {
        date: this.state.date,
        newValue: newValue,
        cashFlowId: cashFlowId
      }
    } else {
      update = {
        newValue: newValue,
        cashFlowId: cashFlowId
      }
    }
    this.props.updateCashThunk(update)
    this.setState({currentValue: '', updatedValue: '', date: '', value: ''})
    location.reload()
  }

  calculate() {
    let updatedValue = this.state.currentValue * (1 + this.state.value / 100)
    this.setState({updatedValue})
  }

  componentDidMount() {
    this.props.getClients()
    this.props.getFunds()
  }

  render() {
    return (
      <div>
        <div className="parent-container">
          <ClientNameDropDown />
          <InvestmentTypeDropDown />
          <InvestmentNameDropDown
            handleInvestmentNameChange={this.handleInvestmentNameChange}
          />
        </div>
        <div className="form-container">
          <UpdateForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            currentValue={this.state.currentValue}
            updatedValue={this.state.updatedValue}
            date={this.state.date}
            calculate={this.calculate}
            value={this.state.value}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cashFlow: state.cashFlow,
    investments: state.investments
    // client: state.client,
    // funds: state.funds.allFunds,
    // filteredFunds: state.funds.filteredFunds,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFunds: () => dispatch(fetchAllFunds()),

    // getFilteredFunds: (filteredFunds) =>
    //   dispatch(getFilteredFunds(filteredFunds)),

    getClients: () => dispatch(fetchAllClients()),

    // getInvestment: (clientId, fundId) =>
    //   dispatch(fetchInvestments(clientId, fundId)),
    updateCashThunk: updatedInfo => dispatch(updateCashThunk(updatedInfo)),
    getCashFlow: investmentId => dispatch(fetchCashFlow(investmentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashFlowForm)
