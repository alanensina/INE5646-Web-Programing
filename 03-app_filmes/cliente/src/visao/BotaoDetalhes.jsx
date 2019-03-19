import React from 'react'
import PropTypes from 'prop-types'

class BotaoDetalhes extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.onClick(this.props.id)
  }

  render () {
    let conteudo =
      <button
        className='button is-small is-rounded is-primary'
        onClick={this.onClick}>
        Detalhes
      </button>

    return conteudo
  }
}

BotaoDetalhes.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export {BotaoDetalhes}
