import React from 'react'
import PropTypes from 'prop-types'
import cores from './cores_bulma'

const BulmaNavbar = props => (
  <nav className={`navbar ${props.color}`}>
    {props.children}
  </nav>
)

export const BulmaNavbarItem = props => {
  return (
    <div className='navbar-item has-dropdown is-hoverable'>
      <span className='navbar-link'>
        {props.name}
      </span>

      <div className='navbar-dropdown'>
        {props.children}
      </div>
    </div>

  )
}

BulmaNavbarItem.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
}

BulmaNavbar.propTypes = {
  color: PropTypes.oneOf(cores),
  children: PropTypes.node.isRequired
}

export default BulmaNavbar
