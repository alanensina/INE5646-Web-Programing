import React, { Component } from 'react'

import Sobre from './sobre/Sobre.jsx'
import MenuApp from './menu/MenuApp.jsx'
import Cadastro from './cadastro/Cadastro.jsx'
import Pesquisa from './pesquisa/Pesquisa.jsx'
import IconeConexao from './util/IconeConexao.jsx'
import BarraDaApp from './menu/BarraDaApp.jsx'
import servicos from '../servicos'
import CircularProgress from '@material-ui/core/CircularProgress'

class App extends Component {
  constructor(props) {
    super(props)
    this.acao = {
      NADA: 'nada',
      CONECTAR: 'conectar',
      DESCONECTAR: 'desconectar',
      MOSTRAR_SOBRE: 'mostrar sobre',
      APAGAR_SOBRE: 'apagar sobre',
      CADASTRAR: 'cadastrar',
      FECHAR_CADASTRO: 'fechar cadastro',
      PESQUISAR: 'pesquisar',
      FECHAR_PESQUISA: 'fechar pesquisa'
    }
    this.state = {
      executando: this.acao.NADA,
      conectado: false,
      mostrandoMenu: false,
      mostrarIconeMenu: true
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.conecte = this.conecte.bind(this)
    this.desconecte = this.desconecte.bind(this)
    this.mostreSobre = this.mostreSobre.bind(this)
    this.fecheSobre = this.fecheSobre.bind(this)
    this.cadastre = this.cadastre.bind(this)
    this.pesquise = this.pesquise.bind(this)
    this.fecheCadastro = this.fecheCadastro.bind(this)
    this.fechePesquisa = this.fechePesquisa.bind(this)
  }


  toggleMenu() {
    this.setState({ mostrandoMenu: !this.state.mostrandoMenu })
  }

  conecte() {
    const a = this.acao
    const qdoConectar = { conectado: true, executando: a.NADA, mostrarIconeMenu: true }
    const qdoNaoConectar = { conectado: true, executando: a.NADA, mostrarIconeMenu: true }
    const qdoConectando = { mostrandoMenu: false, mostrarIconeMenu: false, executando: a.CONECTAR }

    servicos
      .conecta()
      .then(() => this.setState(qdoConectar))
      .catch(() => this.setState(qdoNaoConectar))

    this.setState(qdoConectando)
  }

  desconecte() {
    const a = this.acao
    const qdoDesconectar = { conectado: false, executando: a.NADA }
    const qdoNaoDesconectar = { conectado: true, executando: a.NADA }
    const qdoDesconectando = { mostrandoMenu: false, executando: a.DESCONECTAR }

    servicos
      .desconecta()
      .then(() => this.setState(qdoDesconectar))
      .catch(() => this.setState(qdoNaoDesconectar))

    this.setState(qdoDesconectando)
  }

  mostreSobre() {
    const novoEstado = {
      executando: this.acao.MOSTRAR_SOBRE,
      mostrandoMenu: false
    }

    this.setState(novoEstado)
  }

  fecheSobre() {
    const novoEstado = {
      mostrandoMenu: false,
      executando: this.acao.APAGAR_SOBRE
    }

    this.setState(novoEstado)
  }

  cadastre() {
    const novoEstado = {
      mostrandoMenu: false,
      executando: this.acao.CADASTRAR,
      mostrarIconeMenu: false
    }
    this.setState(novoEstado)
  }

  pesquise() {
    const novoEstado = {
      mostrandoMenu: false,
      executando: this.acao.PESQUISAR,
      mostrarIconeMenu: false
    }
    this.setState(novoEstado)
  }

  fecheCadastro() {
    const novoEstado = {
      executando: this.acao.FECHAR_CADASTRO,
      mostrarIconeMenu: true
    }
    this.setState(novoEstado)
  }

  fechePesquisa() {
    const novoEstado = {
      executando: this.acao.FECHAR_PESQUISA,
      mostrarIconeMenu: true
    }
    this.setState(novoEstado)
  }


  //
  // -------- Gera a view
  //

  render() {
    let menu
    if (this.state.mostrandoMenu)
      menu = <MenuApp
        cancele = {this.toggleMenu}
        conectado={this.state.conectado}
        onSobre={this.mostreSobre}
        conecte={this.conecte}
        desconecte={this.desconecte}
        cadastre={this.cadastre}
        pesquise={this.pesquise} />

    const conteudo = this.__definaConteudo(this.state.executando)
    const iconeConexao = <IconeConexao conectado={this.state.conectado} />

    return (
      <div>
        <BarraDaApp 
          toggleMenu={this.toggleMenu} 
          mostrarIconeMenu={this.state.mostrarIconeMenu} 
          iconeConexao={iconeConexao}/>
        {menu}
        <div>
          {/* espaço para que conteudo não seja escondido pela AppBar */}
          <div style={{height: '50px'}}></div> 
          {conteudo}
        </div>
      </div>
    )
  }


  __definaConteudo(executando) {
    let conteudo
    const a = this.acao

    switch (executando) {
    case a.NADA:
      conteudo = null
      break
    case a.CONECTAR:
      conteudo = <div><h3>Conectando...</h3><CircularProgress/></div>
      break
    case a.DESCONECTAR:
      conteudo = <div><h3>Desconectando...</h3><CircularProgress/></div>
      break
    case a.MOSTRAR_SOBRE:
      conteudo = <Sobre onClick={this.fecheSobre} />
      break
    case a.APAGAR_SOBRE:
      conteudo = null
      break
    case a.CADASTRAR:
      conteudo = <Cadastro onCancele={this.fecheCadastro} />
      break
    case a.FECHAR_CADASTRO:
      conteudo = null
      break
    case a.PESQUISAR:
      conteudo = <Pesquisa onCancele={this.fechePesquisa} />
      break
    case a.FECHAR_PESQUISA:
      conteudo = null
      break

    default:
      conteudo = <h4>Erro: acao ainda não tratada: {this.state.executando}</h4>
    }
    return conteudo
  }

}

export default App
