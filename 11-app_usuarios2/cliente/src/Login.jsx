import React from 'react'

import PropTypes from 'prop-types'

import BulmaInput from './ui/BulmaInput.jsx'
import BulmaButton from './ui/BulmaButton.jsx'
import BulmaMessage from './ui/BulmaMessage.jsx'
import BulmaNotification from './ui/BulmaNotification.jsx'

import {enviaComando} from './servidor'
import {validaEmail, msgErroSignInWithEmailAndPassword} from './util'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      email: undefined,
      senha: undefined,
      msg: undefined,
    }
    this.registreEmail = this.registreEmail.bind(this)
    this.registreSenha = this.registreSenha.bind(this)
    this.facaLogin = this.facaLogin.bind(this)
    this.facaLogout = this.facaLogout.bind(this)
    this.esqueciASenha = this.esqueciASenha.bind(this)
    this.mudouStatusDoUsuario = this.mudouStatusDoUsuario.bind(this)
    this.desabiliteBotaoLogin = this.desabiliteBotaoLogin.bind(this)
    this.desabiliteBotaoEsqueceuSenha = this.desabiliteBotaoEsqueceuSenha.bind(this)
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(this.mudouStatusDoUsuario)
  }

  // firebase detectou mudança no estado do usuário logado
  mudouStatusDoUsuario(novoUsuario) {
    let idTokenResultDoUsuario
    if (novoUsuario) {
      novoUsuario.getIdTokenResult(true)
        .then(idTokenResult => {
          idTokenResultDoUsuario = idTokenResult
          return enviaComando('RegistrarLogin', {idToken: idTokenResult.token})
        })
        .then(resposta => {
          if (resposta.ok) {
            this.props.onUserIn(idTokenResultDoUsuario)
            this.setState({msg: undefined})
          }
          else {
            this.props.firebase.auth().signOut()
          }
        })
        .catch(erro => this.setState({msg: erro.message}))
    } else {
      this.props.onUserOut()
      this.setState({msg: undefined})
    }
  }

  registreEmail(ev) {
    this.setState({msg: undefined, email: ev.target.value})
  }

  registreSenha(ev) {
    this.setState({msg: undefined, senha: ev.target.value})
  }

  facaLogin() {
    this.setState({msg: 'Fazendo login...'})
    this.props.firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.senha)
      .catch(erro => {
        this.setState({msg: msgErroSignInWithEmailAndPassword(erro.code)
        })
      })
  }

  facaLogout() {
    enviaComando('RegistrarLogout', {idToken: this.props.idTokenResult.token})
      .then(resposta => {
        if (resposta.ok)
          this.props.firebase.auth().signOut()
            .then(() => {
              this.setState({msg: 'Encerrando...'})
            })
            .catch (erro => {
              this.setState({msg: erro.message})
            })
        else
          this.setState({msg: resposta.msg})
      })
      .catch(erro => {
        this.setState({msg: erro.message})
      })
  }

  esqueciASenha() {
    if (!this.state.email)
      this.setState({msg: 'Digite seu e-mail'})
    else
      this.props.firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(() => {
          this.setState({msg: 'Acesse seu e-mail para redefinir a senha'})
        })
        .catch(erro => {
          this.setState({msg: erro.message})
        })
  }

  desabiliteBotaoLogin() {
    const senha = this.state.senha

    const resposta = !validaEmail(this.state.email) || senha === null ||
    senha === undefined || senha.length === 0
    return resposta
  }

  desabiliteBotaoEsqueceuSenha() {
    const resposta = !validaEmail(this.state.email)
    return resposta
  }

  render() {
    let conteudo
    let titulo
    if (this.props.idTokenResult) {
      titulo = this.props.idTokenResult.claims.email
      conteudo = <div>
        <BulmaButton color='is-black' disabled={false}
          onClick={this.facaLogout}
          label='Sair'/>
      </div>
    }
    else {
      titulo = 'Usuário'
      conteudo = <div>
        <BulmaInput label='E-mail' isPassword={false} onChange={this.registreEmail}/>
        <BulmaInput label='Senha' isPassword={true} onChange={this.registreSenha}/>

        <p>
          <BulmaButton
            color='is-primary'
            onClick={this.facaLogin}
            label='Login'
            disabled={this.desabiliteBotaoLogin()}/>
          <BulmaButton
            color='is-info'
            onClick={this.esqueciASenha}
            label='Esqueci a senha'
            disabled={this.desabiliteBotaoEsqueceuSenha()}/>
        </p>
      </div>
    }
    return (
      <BulmaMessage color='is-primary' title={titulo}>
        {conteudo}
        <BulmaNotification color='is-warning' message={this.state.msg}/>
      </BulmaMessage>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  idTokenResult: PropTypes.object,
  onUserIn: PropTypes.func.isRequired,
  onUserOut: PropTypes.func.isRequired
}

export default Login
