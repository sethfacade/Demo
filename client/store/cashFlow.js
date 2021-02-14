import axios from 'axios'

// ACTION TYPES //
const GET_CASH_FLOW = 'GET_CASH_FLOW'

// ACTION CREATORS //
const getCashFlow = cashFlow => ({
  type: GET_CASH_FLOW,
  cashFlow
})

// THUNK //
export const fetchCashFlow = investmentId => {
  return async dispatch => {
    try {
      const cashFlow = await axios.get(`/api/cashFlows/${investmentId}`)
      dispatch(getCashFlow(cashFlow.data))
    } catch (error) {
      console.error('Unable to get cash flow', error)
    }
  }
}

// Initial State //
const initialState = []

// Reducer //
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CASH_FLOW:
      return action.cashFlow
    default:
      return state
  }
}
