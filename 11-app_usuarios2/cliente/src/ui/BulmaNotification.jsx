import React from 'react'
import PropTypes from 'prop-types'
import cores from './cores_bulma'

const BulmaNotification = (props) => {
  if (props.message === null || props.message === undefined)
    return null

  return (
    <div className={`notification ${props.color}`}>
      {props.message}
    </div>
  )
}

BulmaNotification.propTypes = {
  message: PropTypes.string,
  color: PropTypes.oneOf(cores)
}

export default BulmaNotification
