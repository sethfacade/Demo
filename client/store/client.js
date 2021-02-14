import axios from 'axios'

// ACTION TYPES //
const GET_ALL_CLIENTS = 'GET_ALL_CLIENTS'

// ACTION CREATORS //
const getAllClients = clients => ({
  type: GET_ALL_CLIENTS,
  clients
})

// THUNK //
export const fetchAllClients = () => {
  return async dispatch => {
    try {
      const clients = await axios.get('/api/clients')
      dispatch(getAllClients(clients.data))
    } catch (error) {
      console.error('Unable to get all clients', error)
    }
  }
}

// Initial State //
const initialState = []

// Reducer //
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return action.clients
    default:
      return state
  }
}
