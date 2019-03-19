// @flow
import * as React from 'react'
import jwt from 'jsonwebtoken'

import type {Token, TokenDecodificado, ConectadoComBanco} from '../tipos'
import Login from './Login.jsx'
import CadastraVulcao from './CadastraVulcao.jsx'
import MostraVulcoes from './MostraVulcoes.jsx'
import ConexaoComBanco from './ConexaoComBanco.jsx'

import {leLimiteImagem, temConexaoComBanco} from '../servicos'

import 'bulma/css/bulma.min.css'

type Props = {
}

type State = {
  token: Token | void,
  tokenDecodificado: TokenDecodificado | void,
  limiteImagem: number,
  conectadoComBanco: ConectadoComBanco
}

class App extends React.Component<Props,State> {
  constructor(props: Props) {
    super(props)
    let token = window.localStorage.getItem('token')
    let tokenDecodificado

    if (token === null)
      token = undefined
    else
      tokenDecodificado = jwt.decode(token)
    this.state = {
      token,
      tokenDecodificado,
      limiteImagem: 0,
      conectadoComBanco: undefined
    }
  }

  componentDidMount() {
    leLimiteImagem()
      .then(limiteImagem => this.setState({ limiteImagem }))
      .catch(() => {this.setState( {limiteImagem: 5000000})})
    temConexaoComBanco()
      .then(resposta => this.setState({conectadoComBanco: resposta.ok}))
      .catch(() => this.setState({conectadoComBanco: false}))
  }

  recebaToken = (token: Token) => {
    const tokenDecodificado = jwt.decode(token)
    this.setState({token, tokenDecodificado})
    window.localStorage.setItem('token', token)
  }

  usuarioSaiu = () => {
    this.setState({token: undefined, tokenDecodificado: undefined})
    window.localStorage.removeItem('token')
  }

  render() {
    return (
      <div className='container is-fluid'>
        <div className='message'>
          <div className='message-header'>
            INE5646 - App vulcões
          </div>
          <div className='message-body'>
            <ConexaoComBanco conectado={this.state.conectadoComBanco}/>
            {
              this.state.conectadoComBanco === true &&
              <Login onToken={this.recebaToken}
                onSaiu={this.usuarioSaiu}
                token={this.state.token}
                tokenDecodificado={this.state.tokenDecodificado}/>
            }
            {
              this.state.token &&
              this.state.conectadoComBanco === true &&
              <CadastraVulcao token={this.state.token}
                onTokenInvalido={this.usuarioSaiu}
                limiteImagem={this.state.limiteImagem}/>
            }
            {
              this.state.token &&
              this.state.conectadoComBanco === true &&
              <MostraVulcoes token={this.state.token}
                onTokenInvalido={this.usuarioSaiu}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App
