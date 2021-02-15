import React from 'react'
import {connect} from 'react-redux'
import {fetchAllClients} from '../store/client'
import {auth} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchClients()
  }
  handleClick(client) {
    this.props.getPermission(client)
  }

  render() {
    const clients = this.props.clients || []
    return (
      <div>
        <h3>Welcome {this.props.email}</h3>
        <h3>All Clients</h3>
        {clients.map(client => {
          return (
            <div key={client.id}>
              <a href="/funds" onClick={() => this.handleClick(client.name)}>
                {client.name}
              </a>
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    clients: state.client,
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchClients: () => dispatch(fetchAllClients()),
    getPermission: client => dispatch(auth(client))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
