import React from 'react'
import PropTypes from 'prop-types'

class Checkbox extends React.Component {
  constructor() {
    super()
    this.state = {
      selecionado: false
    }
    this.altereEstado = this.altereEstado.bind(this)
  }

  altereEstado() {
    this.setState(({selecionado}) => ({selecionado: !selecionado}))
    this.props.onSelect(this.props.label)
  }

  render() {
    return (
      <div>
        <label>
          <input type='checkbox'
            value={this.props.label}
            checked={this.state.selecionado}
            onChange={this.altereEstado}/>
          {this.props.label}
        </label>
      </div>
    )
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Checkbox
