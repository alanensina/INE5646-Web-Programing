import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from './Checkbox.jsx'

const BulmaCheckboxGroup = (props) => {
  const opcoes =
    props.options.map(opcao => <Checkbox key={opcao} label={opcao} onSelect={props.onSelect}/>)

  return (
    <div className='field'>
      <label className='label'>{props.label}</label>
      <div className='control'>
        {opcoes}
      </div>
    </div>
  )
}

BulmaCheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired
}

export default BulmaCheckboxGroup
