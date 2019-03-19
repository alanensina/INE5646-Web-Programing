import React from 'react'
import PropTypes from 'prop-types'
import cores from './cores_bulma'

const BulmaButton = (props) => {
  const desabilitado = props.disabled ? 'disabled' : ''
  return (
    <button
      className={`button is-outlined is-rounded ${props.color}`}
      onClick={props.onClick} disabled={desabilitado}>
      {props.label}
    </button>
  )
}

BulmaButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  color: PropTypes.oneOf(cores).isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default BulmaButton
