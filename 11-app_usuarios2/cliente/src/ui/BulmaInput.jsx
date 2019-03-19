import React from 'react'
import PropTypes from 'prop-types'

const BulmaInput = (props) => {
  const tipo = props.isPassword ? 'password' : 'text'
  return (
    <div className='field'>
      <label className='label'>{props.label}</label>
      <div className='control'>
        <input className='input is-primary' type={tipo} onChange={props.onChange}/>
      </div>
    </div>
  )
}

BulmaInput.propTypes = {
  isPassword: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default BulmaInput
