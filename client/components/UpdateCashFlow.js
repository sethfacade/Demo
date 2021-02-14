import React from 'react'
import {connect} from 'react-redux'
import {fetchCashFlow} from '../store/cashFlow'
import {fetchInvestments} from '../store/investment'
import {fetchAllClients} from '../store/client'
import {fetchAllFunds} from '../store/fund'

class UpdateCashFlow extends React.Component {
  constructor() {
    super()
    this.handleClientNameChange = this.handleClientNameChange.bind(this)
  }
  componentDidMount() {
    this.props.getClients()
  }
  handleClientNameChange() {}
  render() {
    const clients = this.props.client || []

    return (
      <div>
        <label htmlFor="clientName">Choose Client: </label>
        <select onChange={this.handleClientNameChange}>
          <option value="select">Select Client</option>
          {clients.map(client => {
            return (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cashFlows: state.cashFlows,
    investments: state.investments,
    client: state.client
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFunds: () => dispatch(fetchAllFunds()),
    getClients: () => dispatch(fetchAllClients()),
    getInvestment: (clientId, fundId) =>
      dispatch(fetchInvestments(clientId, fundId)),
    getCashFlow: investmentId => dispatch(fetchCashFlow(investmentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCashFlow)
