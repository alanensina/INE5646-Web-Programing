import React from 'react'
import PropTypes from 'prop-types'

class DetalhesFilme extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.onClick()
  }

  render () {
    let filme = this.props.filme
    let msg

    if (filme === undefined) {
      msg = <div className="notification is-warning">
        Nenhum filme selecionado...
      </div>
    } else {
      msg =
        <div className="box">
          <div className="message is-success">
            <div className="message-header">
              <p>Detalhes do Filme</p>
              <button className="delete" onClick={this.onClick}></button>
            </div>
            <div className="panel">
              {MostraCampo('Título', filme.titulo)}
              {MostraCampo('Lançamento', filme.lancamento)}
              {MostraCampo('Direção', filme.direcao)}
            </div>
          </div>
        </div>
    }
    return (
      <div className="box">
        <div className="message is-info">
          <div className="message-header">
            <p>Filme</p>
          </div>
          {msg}
        </div>
      </div>
    )
  }
}

function MostraCampo (atributo, valor) {
  return (
    <div className="field">
      <label className="label">{atributo}</label>
      <div className="control">
        <p>{valor}</p>
      </div>
    </div>
  )
}

DetalhesFilme.propTypes = {
  onClick: PropTypes.func.isRequired,
  filme: PropTypes.object
}
export {DetalhesFilme}
