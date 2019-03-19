import React from 'react'
import PropTypes from 'prop-types'
import BulmaButton from '../../ui/BulmaButton.jsx'
import BulmaMessage from '../../ui/BulmaMessage.jsx'
import BulmaNotification from '../../ui/BulmaNotification.jsx'
import BulmaTable from '../../ui/BulmaTable.jsx'

import {enviaConsulta} from '../../servidor'

class MostrarUsuarios extends React.Component {
  constructor() {
    super()
    this.state = {
      usuarios: undefined,
      msg: undefined
    }
    // bind necessário porque é usado em componente no render
    this.pesquiseUsuarios = this.pesquiseUsuarios.bind(this)
  }

  pesquiseUsuarios() {
    enviaConsulta('PesquisaUsuarios', {idToken: this.props.idToken})
      .then (resposta => {
        this.setState({usuarios: resposta.usuarios, msg: undefined})
      })
      .catch(erro => {
        this.setState({msg: erro.message})
      })
    this.setState({usuarios: undefined, msg: 'Pesquisando...'})
  }


  render() {
    let usuarios = this.__mostrarUsuarios(this.state.usuarios)
    return (
      <BulmaMessage color='is-info' title='Usuários Cadastrados'>
        <BulmaButton
          color='is-primary'
          onClick={this.pesquiseUsuarios}
          disabled={false}
          label='Mostrar Usuários'/>
        {usuarios}
        <BulmaNotification
          color='is-warning'
          message={this.state.msg}/>
      </BulmaMessage>
    )
  }

  __mostrarUsuarios(usuarios) {
    if (usuarios === undefined)
      return null
    let num = 1
    const lu = this.state.usuarios.map(emailPapeis => [num++, emailPapeis.email, emailPapeis.papeis.join(', ')])
    return <div>
      <BulmaTable heads={['No.', 'E-mail', 'Papéis']} data={lu}/>
    </div>
  }

}

MostrarUsuarios.propTypes = {
  idToken: PropTypes.string.isRequired
}

export default MostrarUsuarios
