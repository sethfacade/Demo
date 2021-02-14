import React from 'react'
import {connect} from 'react-redux'
import {fetchAllClients} from '../store/client'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchClients()
  }
  render() {
    const clients = this.props.clients || []
    console.log(clients)
    return (
      <div>
        <h3>Welcome {this.props.email}</h3>
        <h3>All Clients</h3>
        {clients.map(client => {
          return (
            <div key={client.id}>
              <Link
                to={{
                  pathname: '/funds',
                  access: {
                    permissions: client.permission
                  }
                }}
              >
                {client.name}
              </Link>
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
    fetchClients: () => dispatch(fetchAllClients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)
