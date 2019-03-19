import React from 'react'
import PropTypes from 'prop-types'
import BulmaInput from '../../ui/BulmaInput.jsx'
import BulmaCheckboxGroup from '../../ui/BulmaCheckboxGroup.jsx'
import BulmaMessage from '../../ui/BulmaMessage.jsx'
import BulmaNotification from '../../ui/BulmaNotification.jsx'
import BulmaButton from '../../ui/BulmaButton.jsx'

import {enviaComando} from '../../servidor'
import {validaEmail} from '../../util'

class CadastrarUsuario extends React.Component {
  constructor() {
    super()
    this.state = {
      email : undefined,
      papeis: new Set(),
      msg : undefined
    }
    this.definaEmail = this.definaEmail.bind(this)
    this.registreUsuario = this.registreUsuario.bind(this)
    this.registrePapel = this.registrePapel.bind(this)
    this.desabiliteBotaoCadastro = this.desabiliteBotaoCadastro.bind(this)
  }

  definaEmail (ev) {
    this.setState({email: ev.target.value, msg: undefined})
  }

  registrePapel(label) {
    const papeis = this.state.papeis
    if (papeis.has(label))
      papeis.delete(label)
    else
      papeis.add(label)
    this.setState({papeis, msg: undefined})
  }

  registreUsuario() {
    if (this.state.papeis.size > 0 && this.state.email !== undefined) {
      const dados = {
        idToken: this.props.idToken,
        email: this.state.email,
        papeis: Array.from(this.state.papeis)
      }
      enviaComando('CadastrarUsuario', dados)
        .then(resposta => {
          if (resposta.ok === true)
            this.setState({msg: 'Cadastro realizado!'})
          else
            this.setState({msg: resposta.msg})
        })
        .catch (erro => {
          this.setState({msg: erro.message})
        })
      this.setState({msg: 'registrando...'})
    }
  }

  desabiliteBotaoCadastro() {
    return !validaEmail(this.state.email) || this.state.papeis.size === 0
  }

  render() {
    return (
      <div>
        <BulmaMessage color='is-info' title='Cadastrar novo usuário'>
          <BulmaInput label='E-mail' isPassword={false} onChange={this.definaEmail}/>
          <BulmaCheckboxGroup
            label='Papéis'
            options={this.props.papeisExistentes}
            onSelect={this.registrePapel}/>
          <BulmaButton
            color='is-info'
            label='Cadastrar'
            onClick={this.registreUsuario}
            disabled={this.desabiliteBotaoCadastro()}/>
          <BulmaNotification color='is-warning' message={this.state.msg} />
        </BulmaMessage>

      </div>
    )
  }
}

CadastrarUsuario.propTypes = {
  papeisExistentes: PropTypes.array.isRequired,
  idToken: PropTypes.string.isRequired
}

export default CadastrarUsuario
