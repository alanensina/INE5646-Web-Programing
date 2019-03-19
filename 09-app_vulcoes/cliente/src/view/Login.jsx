// @flow
import * as React from 'react'
import type {Token, TokenDecodificado}  from '../tipos'

import * as s from '../servicos'

type Props = {
    onToken: (Token) => void,
    onSaiu: () => void,
    token: Token | void,
    tokenDecodificado: TokenDecodificado | void
}

type State = {
  login: string,
  senha: string,
  confereSenha: string,
  novoUsuario: boolean,
  nomeBotao: string,
  msg: string | void
}

class Login extends React.Component<Props,State> {
    state = {
      login: '',
      senha: '',
      confereSenha: '',
      novoUsuario: false,
      nomeBotao: 'Entrar',
      msg: undefined,
    }

  login = (ev: SyntheticEvent<HTMLInputElement>) => {
    this.setState({login: ev.currentTarget.value, senha: '', confereSenha: '', msg: undefined})
  }

  senha = (ev: SyntheticEvent<HTMLInputElement>) => {
    this.setState({senha: ev.currentTarget.value, msg: undefined})
  }

  confereSenha = (ev: SyntheticEvent<HTMLInputElement>) => {
    this.setState({confereSenha: ev.currentTarget.value, msg: undefined})
  }

  novoUsuario = () => {
    const novoUsuario = !this.state.novoUsuario
    const nomeBotao = novoUsuario ? 'Cadastrar Novo Usuário' : 'Entrar'

    this.setState({novoUsuario, nomeBotao, msg: undefined})
  }

  facaLoginOuCadastro = () => {
    if (this.state.login === '')
      this.setState({msg: 'Login não definido.'})
    else if (this.state.novoUsuario) {
      if (this.state.senha === '' || this.state.confereSenha === '')
        this.setState({msg: 'Senha não definida.'})
      else if (this.state.senha !== this.state.confereSenha)
        this.setState({msg: 'Senhas não são iguais.'})
      else {
        s.fazCadastro(this.state.login, this.state.senha)
          .then(token => {
            this.props.onToken(token)
            this.setState({msg: undefined})
          })
          .catch(erro => this.setState({msg: erro.message}))
        this.setState({msg: 'Fazendo cadastro...'})
      }
    } else if (this.state.senha === '')
      this.setState({msg: 'Senha não definida'})
    else {
      s.fazLogin(this.state.login, this.state.senha)
        .then(token => {
          this.props.onToken(token)
          this.setState({msg: undefined})
        })
        .catch(erro => this.setState({msg: erro.message}))
      this.setState({msg: 'Fazendo login...'})
    }
  }

  facaLogout = () => {
    this.setState(
      {
        login: '',
        senha: '',
        confereSenha: '',
        novoUsuario: false,
        nomeBotao: 'Entrar',
        msg: undefined,
      })
    this.props.onSaiu()
  }

  render() {
    let conteudo
    if (this.props.token === undefined && this.props.tokenDecodificado === undefined) {
      conteudo =
        <div className='message is-link'>
          <div className='message-header'>Login</div>
          <div className='message-body'>

            <label className='checkbox'>
              <input type='checkbox'
                value={this.state.novoUsuario}
                onChange={this.novoUsuario}/>novo usuário
            </label>
            <div className='field'>
              <label className='label'>Login</label>
              <div className='control'>
                <input className='input' type='text'
                  value={this.state.login} onChange={this.login}/>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Senha</label>
              <div className='control'>
                <input className='input' type='password'
                  value={this.state.senha}
                  onChange={this.senha}/>
              </div>
            </div>
            {
              this.state.novoUsuario &&
            <div className='field'>
              <label className='label'>Repita Senha</label>
              <div className='control'>
                <input className='input' type='password'
                  value={this.state.confereSenha}
                  onChange={this.confereSenha}/>
              </div>
            </div>
            }
            <br/>
            <button className='button is-link' onClick={this.facaLoginOuCadastro}>
              {this.state.nomeBotao}
            </button>
            {
              this.state.msg &&
            <div className='notification is-warning'>{this.state.msg}</div>
            }
          </div>
        </div>
    } else {
      if (this.props.tokenDecodificado === undefined)
        conteudo = <div>Erro de programação!!</div>
      else
        conteudo =
        <div className='message is-info'>
          <div className='message-header'>
            Usuário logado: {this.props.tokenDecodificado.login}
          </div>
          <div className='message-body'>
            <button className='button is-link' onClick={this.facaLogout}>Sair</button>
          </div>
        </div>
    }

    return (
      <div>
        {conteudo}
      </div>
    )
  }
}



export default Login
