import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = props => (
  <div>
    <h1>Canoe Demo</h1>

    <nav>
      <Link to="/">Home</Link>
      <Link to="/updateCashFlow">CashFlow</Link>
    </nav>
    <hr />
  </div>
)

export default Navbar
