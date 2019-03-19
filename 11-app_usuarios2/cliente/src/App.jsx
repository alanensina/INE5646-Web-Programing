import React, {Component} from 'react'
import * as firebase from 'firebase'

import Login from './Login.jsx'
import Tarefas from './tarefas/Tarefas.jsx'
import BulmaMessage from './ui/BulmaMessage.jsx'
import {enviaConsulta} from './servidor'

import 'bulma/css/bulma.min.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      firebase: undefined,
      idTokenResult: undefined,
      papeisExistentes: []
    }
    this.registreUsuarioEntrou = this.registreUsuarioEntrou.bind(this)
    this.registreUsuarioSaiu = this.registreUsuarioSaiu.bind(this)
  }

  componentDidMount() {
    enviaConsulta('PesquisaFirebaseConfig', '')
      .then(r => {
        firebase.initializeApp(r.firebaseConfig)
        this.setState({firebase})
      })
  }

  registreUsuarioEntrou(idTokenResult) {
    enviaConsulta('PesquisaPapeisPossiveis', {idToken: idTokenResult.token})
      .then(r => this.setState({papeisExistentes: r.papeis}))
    this.setState({idTokenResult})
  }

  registreUsuarioSaiu() {
    this.setState({idTokenResult: undefined})
  }

  render() {
    if (this.state.firebase === undefined)
      return <div>Carregando...</div>
    
    let tarefas
    let tamColunaLogin = ''
    if (this.state.idTokenResult !== undefined) {
      tarefas =
      <div className='column'>
        <Tarefas
          className='box'
          idTokenResult={this.state.idTokenResult}
          papeisExistentes={this.state.papeisExistentes}/>
      </div>
      tamColunaLogin = 'is-one-quarter'
    }
    return (
      <div className='container is-fullhd'>
        <BulmaMessage color='is-dark' title='INE5646 - App Usuários 2'>
          <div className='columns'>
            <div className={`column ${tamColunaLogin}`}>
              <Login className='box' firebase={this.state.firebase}
                idTokenResult={this.state.idTokenResult}
                onUserIn={this.registreUsuarioEntrou}
                onUserOut={this.registreUsuarioSaiu}/>
            </div>
            {tarefas}
          </div>
        </BulmaMessage>
      </div>
    )
  }
}

export default App
