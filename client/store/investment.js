import axios from 'axios'

// ACTION TYPES //

const GET_INVESTMENTS = 'GET_INVESTMENTS'
const SELECTED_IDS = 'SELECTED_IDS'

// ACTION CREATORS //
export const getInvestments = investments => ({
  type: GET_INVESTMENTS,
  investments
})

export const getSelectedIds = selected => ({
  type: SELECTED_IDS,
  selected
})

// THUNK //
export const fetchInvestments = (clientId, fundId) => {
  return async dispatch => {
    try {
      const investments = await axios.get(
        `/api/investments/clientId/${clientId}/fundId/${fundId}`
      )
      dispatch(getInvestments(investments.data))
    } catch (error) {
      console.error('Unable to get investments', error)
    }
  }
}

// Initial State //
const initialState = {selectedId: '', investments: []}

// Reducer //
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVESTMENTS:
      return {...state, investments: action.investments}
    case SELECTED_IDS:
      return {...state, selectedId: action.selected}
    default:
      return state
  }
}
