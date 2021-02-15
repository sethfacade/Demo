import React from 'react'
import {connect} from 'react-redux'
import {fetchAllClients} from '../store/client'
import {fetchAllFunds, getFilteredFunds} from '../store/fund'
import {getSelectedIds} from '../store/investment'

function ClientNameDropDown(props) {
  const clients = props.client

  const handleClientNameChange = async e => {
    const clientId = e.target.value
    const funds = props.funds
    const access = {}
    let permission = ''
    await props.getFilteredFunds([])

    // IF AT SELECT , CANNOT SEE ANY INVESTMENTS //
    if (clientId === 'select') {
      props.getSelectedIds('')
    } else {
      props.getSelectedIds(clientId)
      // LOOP THROUGH THE TOTAL CLIENTS AND MATCH THE CLIENT TO FIND THE PERMISSION //
      for (let i = 0; i < clients.length; i++) {
        let eachClient = clients[i]
        if (eachClient.id === clientId) {
          permission = eachClient.permission
        }
      }
      // SPLIT EACH PERMISSION INTO ARRAY AND CONVERT TO CAPITAL CASE FOR CONSISTENCY //
      permission.split(', ').forEach(element => {
        access[element.toUpperCase()] = true
      })
      // IF THE CLIENT HAS ACCESS TO ALL //
      if (access.ALL) {
        return props.getFilteredFunds(funds)
      }

      // CLIENT HAS LIMITED ACCESS //
      const accessFunds = funds.filter(eachFund => access[eachFund.type])
      return props.getFilteredFunds(accessFunds)
    }
  }

  return (
    <div>
      <label htmlFor="clientName">Choose Client: </label>
      <select onChange={handleClientNameChange}>
        <option value="select">Client Name</option>
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
const mapStateToProps = state => {
  return {
    cashFlows: state.cashFlows,
    investments: state.investments.investments,
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

    getSelectedIds: clientId => dispatch(getSelectedIds(clientId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientNameDropDown)
