import React, { Component } from 'react'

import pesquisa from '../model/pesquisa'
import MostraRelatorio from './MostraRelatorio.jsx'
import DataNASA from './DataNASA.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: undefined,
      relatorio: undefined,
      nomeBotao: 'Pesquisar asteróides',
      cssBotao: 'button is-danger',
      pesquisando: false,
      nasaApiKey: undefined
    }

    this.onDataValida = this.onDataValida.bind(this)
    this.onDataInvalida = this.onDataInvalida.bind(this)
    this.pesquiseAsteroides = this.pesquiseAsteroides.bind(this)
    this.podePesquisar = this.podePesquisar.bind(this)
  }

  componentDidMount () {
    // FIXME use window.fetch para obter o valor chave para API da Nasa.
    // com o valor recebido do servidor, atualize o estado do componente App
    console.log('// FIXME falta obter a chave da API da Nasa')
  }

  podePesquisar () {
    return this.state.pesquisando === false && this.state.data !== undefined
  }

  onDataInvalida () {
    this.setState({
      data: undefined,
      relatorio: undefined,
      pesquisando: false,
      nomeBotao: 'Pesquisar asteróides',
      cssBotao: 'button is-danger'
    })
  }

  onDataValida (data) {
    this.setState({
      data,
      relatorio: undefined,
      pesquisando: false,
      cssBotao: 'button is-success'
    })
  }

  pesquiseAsteroides () {
    pesquisa(this.state.nasaApiKey, this.state.data)
      .then(relatorio => this.setState({
        relatorio,
        nomeBotao: 'Pesquisar asteróides',
        cssBotao: 'button is-success',
        pesquisando: false }))
      .catch(erro => this.setState({
        nomeBotao: erro.message,
        cssBotao: 'button is-black',
        pesquisando: false }))

    this.setState({
      relatorio: undefined,
      nomeBotao: 'Pesquisando...',
      pesquisando: true,
      cssBotao: 'button is-warning is-loading'
    })
  }

  render () {
    let relatorio

    if (this.state.relatorio !== undefined) {
      relatorio = <MostraRelatorio relatorio={this.state.relatorio} />
    }

    return (
      <div className='container is-fluid'>
        <div className='message'>
          <div className='message-header'>
            INE5646 - App Fim do Mundo
          </div>
          <div className='message-body'>
            <DataNASA onDataValida={this.onDataValida}
              onDataInvalida={this.onDataInvalida}/>
            <button className={this.state.cssBotao}
              onClick={this.pesquiseAsteroides}
              disabled={!this.podePesquisar()}>
              {this.state.nomeBotao}
            </button>
            {relatorio}
          </div>
        </div>
      </div>
    )
  }
}

export default App
