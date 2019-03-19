import React from 'react'
import PropTypes from 'prop-types'
import cores from './cores_bulma'

const BulmaMessage = props => (
  <div className={`message ${props.color}`}>
    <div className='message-header'>
      {props.title}
    </div>
    <div className='message-body'>
      {props.children}
    </div>
  </div>
)

BulmaMessage.propTypes = {
  color: PropTypes.oneOf(cores).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default BulmaMessage
