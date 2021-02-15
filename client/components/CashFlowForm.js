import React from 'react'
import {connect} from 'react-redux'
import {fetchCashFlow} from '../store/cashFlow'
import {fetchInvestments} from '../store/investment'
import {fetchAllClients} from '../store/client'
import {fetchAllFunds, getFilteredFunds} from '../store/fund'
import {
  ClientNameDropDown,
  InvestmentTypeDropDown,
  InvestmentNameDropDown,
  UpdateCashFlow
} from './index'

class CashFlowForm extends React.Component {
  componentDidMount() {
    this.props.getClients()
    this.props.getFunds()
  }

  render() {
    return (
      <div>
        <ClientNameDropDown />
        <InvestmentTypeDropDown />
        <InvestmentNameDropDown />
        {/* <UpdateCashFlow /> */}
      </div>
    )
  }
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

    getClients: () => dispatch(fetchAllClients()),

    getInvestment: (clientId, fundId) =>
      dispatch(fetchInvestments(clientId, fundId)),

    getCashFlow: investmentId => dispatch(fetchCashFlow(investmentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashFlowForm)
