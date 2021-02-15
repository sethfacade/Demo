import axios from 'axios'

// ACTION TYPES //
const GET_ALL_FUNDS = 'GET_ALL_FUNDS'
const GET_MASKED_FUNDS = 'GET_MASKED_FUNDS'
const GET_FILTERED_FUNDS = 'GET_FILTERED_FUNDS'

// ACTION CREATORS //
const getAllFunds = funds => ({
  type: GET_ALL_FUNDS,
  funds
})

const getMaskedFunds = maskedFunds => ({
  type: GET_MASKED_FUNDS,
  maskedFunds
})

export const getFilteredFunds = filteredFunds => ({
  type: GET_FILTERED_FUNDS,
  filteredFunds
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

export const fetchMaskedFunds = () => {
  return async dispatch => {
    try {
      const maskedFunds = await axios.get('/api/funds/masked')
      dispatch(getMaskedFunds(maskedFunds.data))
    } catch (error) {
      console.error('Unable to get masked funds', error)
    }
  }
}

// Initial State //
const initialState = {
  allFunds: [],
  maskedFunds: [],
  filteredFunds: []
}

// Reducer //
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FUNDS:
      return {...state, allFunds: action.funds}
    case GET_MASKED_FUNDS:
      return {...state, maskedFunds: action.maskedFunds}
    case GET_FILTERED_FUNDS:
      return {...state, filteredFunds: action.filteredFunds}
    default:
      return state
  }
}
