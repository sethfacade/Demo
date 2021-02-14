import axios from 'axios'

// ACTION TYPES //
const GET_ALL_FUNDS = 'GET_ALL_FUNDS'

// ACTION CREATORS //
const getAllFunds = funds => ({
  type: GET_ALL_FUNDS,
  funds
})

// THUNK //

export const fetchAllFunds = () => {
  return async dispatch => {
    try {
      const funds = await axios.get('/api/funds')
      dispatch(getAllFunds(funds.data))
    } catch (error) {
      console.error('Unable to get all funds', error)
    }
  }
}

// Initial State //
const initialState = []

// Reducer //
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FUNDS:
      return action.funds
    default:
      return state
  }
}
