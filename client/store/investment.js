import axios from 'axios'

// ACTION TYPES //

const GET_INVESTMENTS = 'GET_INVESTMENTS'

// ACTION CREATORS //
const getInvestments = investments => ({
  type: GET_INVESTMENTS,
  investments
})

// THUNK //
export const fetchInvestments = (clientId, fundId) => {
  return async dispatch => {
    try {
      const investments = await axios.get(
        `/api/clientId/${clientId}/fundId/${fundId}`
      )
      dispatch(getInvestments(investments.data))
    } catch (error) {
      console.error('Unable to get investments', error)
    }
  }
}

// Initial State //
const initialState = []

// Reducer //
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVESTMENTS:
      return action.investments
    default:
      return state
  }
}
