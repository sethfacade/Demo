import React from 'react'
import {connect} from 'react-redux'
import {fetchCashFlow, updateCashThunk} from '../store/cashFlow'
import {Button} from 'react-bootstrap'
import {UpdateForm} from './UpdateForm'

class Test extends React.Component {
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

  render() {
    const investments = this.props.investments.investments
    return (
      <div>
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
        </div>
        <div className="form-container">
          <UpdateForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            currentValue={this.state.currentValue}
            updatedValue={this.state.updatedValue}
            date={this.state.date}
            calculate={this.calculate}
            value={this.value}
          />
        </div>
        {/* <form>
          <label htmlFor="currentValue">Current Value</label>
          <input
            name="currentValue"
            type="number"
            value={this.state.currentValue}
            readOnly
          />
          <label htmlFor="updatedValue">Updated Value</label>
          <input
            name="updatedValue"
            type="number"
            value={this.state.updatedValue}
            readOnly
          />
        </form>
        <form onSubmit={(e) => this.handleSubmit(e)}>
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
            placeholder="Place in %"
            onChange={this.handleChange}
          />
          <Button type="submit" variant="outline-success">
            Submit
          </Button>
        </form>

        <Button
          onClick={this.calculate}
          type="button"
          variant="outline-primary"
        >
          Calculate
        </Button> */}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    cashFlow: state.cashFlow,
    investments: state.investments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCashFlow: investmentId => dispatch(fetchCashFlow(investmentId)),
    updateCashThunk: updatedInfo => dispatch(updateCashThunk(updatedInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
