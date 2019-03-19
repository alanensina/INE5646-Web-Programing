import React from 'react'
import PropTypes from 'prop-types'
import TarefasAdmin from './admin/TarefasAdmin.jsx'

class Tarefas extends React.Component {
  constructor() {
    super()
    this.state = {
      tarefas: []
    }
  }
  render() {
    if (!this.props.idTokenResult)
      return null

    let tarefasAdmin = null
    if (this.props.idTokenResult.claims.papeis.includes('admin'))
      tarefasAdmin = <TarefasAdmin idToken={this.props.idTokenResult.token} papeisExistentes={this.props.papeisExistentes}/>
    return (<div>{tarefasAdmin}</div>)
  }
}

Tarefas.propTypes = {
  idTokenResult: PropTypes.object,
  papeisExistentes: PropTypes.array
}

export default Tarefas
