// import React from 'react'
// import {connect} from 'react-redux'
// import {fetchCashFlow} from '../store/cashFlow'

// class UpdateCashFlows extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       currentValue: '',
//       updatedValue: '',
//       date: '',
//       value: '',
//     }
//   }

//   componentDidMount() {
//     this.setState({currentValue: this.props.cashFlows})
//   }
//   render() {
//     //console.log(this.props.investments.investments.amount)
//     return (
//       <div>
//         <form onSubmit="{}">
//           <label htmlFor="currentValue">Current Value</label>
//           <input
//             name="currentValue"
//             type="number"
//             value={this.state.currentValue}
//             onChange="{this.handleChange}"
//           />
//         </form>
//       </div>
//     )
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     cashFlows: state.cashFlows,
//     investments: state.investments,
//     client: state.client,
//     funds: state.funds.allFunds,
//     filteredFunds: state.funds.filteredFunds,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getFunds: () => dispatch(fetchAllFunds()),

//     // getFilteredFunds: (filteredFunds) =>
//     //   dispatch(getFilteredFunds(filteredFunds)),

//     // getUniqueFundTypes: (uniqueTypes) =>
//     //   dispatch(getUniqueFundTypes(uniqueTypes)),

//     // getClients: () => dispatch(fetchAllClients()),

//     // getInvestment: (clientId, fundId) =>
//     //   dispatch(fetchInvestments(clientId, fundId)),

//     getCashFlow: (investmentId) => dispatch(fetchCashFlow(investmentId)),

//     // getSelectedIds: (fundId) => dispatch(getSelectedIds(fundId)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UpdateCashFlows)
