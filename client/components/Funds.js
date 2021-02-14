import React from 'react'
import {connect} from 'react-redux'
import {fetchAllFunds} from '../store/fund'

class Funds extends React.Component {
  componentDidMount() {
    let permission
    if (this.props.location.access) {
      permission = this.props.location.access.permissions
    }
    this.props.fetchFunds(permission)
  }

  render() {
    const funds = this.props.funds || []

    return (
      <div>
        <h3>Accessible Funds</h3>
        <table>
          <thead>
            <tr>
              <th>Fund Name</th>
              <th>Type</th>
              <th>Inception Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {funds.map(fund => {
              return (
                <tr key={fund.id}>
                  <td>{fund.name}</td>
                  <td>{fund.type}</td>
                  <td>{fund.inceptionDate}</td>
                  <td>{fund.description}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    funds: state.funds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFunds: permission => dispatch(fetchAllFunds(permission))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Funds)
