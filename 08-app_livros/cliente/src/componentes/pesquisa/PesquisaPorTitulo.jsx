import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'

import LivrosEncontrados from './LivrosEncontrados.jsx'
import servicos from '../../servicos'
import FalhaNaConexao from '../util/FalhaNaConexao.jsx'

class PesquisaPorTitulo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pesquisando: false,
      livros: undefined,
      tituloLivro : '',
      erroTitulo: undefined,
      falhaNaConexao: false
    }
    this.pesquisePorTitulo = this.pesquisePorTitulo.bind(this)
    this.__registreResposta = this.__registreResposta.bind(this)
    this.__registreFalhaNaConexao = this.__registreFalhaNaConexao.bind(this)
    this.altereTitulo = this.altereTitulo.bind(this)
    this.__naoPodePesquisar = this.__naoPodePesquisar.bind(this)
  }
  
  pesquisePorTitulo() {
    servicos.pesquisePorTitulo(this.state.tituloLivro)
      .then((resposta) => this.__registreResposta(resposta))
      .catch(() => this.__registreFalhaNaConexao())

    const novoEstado = {
      pesquisando: true,
      livros: undefined
    }

    this.setState(novoEstado)
  }

  __registreResposta(livros) {
    const novoEstado = {
      pesquisando: false,
      livros
    }

    this.setState(novoEstado)
  }

  __registreFalhaNaConexao() {
    const novoEstado = {
      falhaNaConexao: true
    }

    this.setState(novoEstado)
  }

  altereTitulo(ev) {
    const valor = ev.target.value
    const erroTitulo = valor === '' ? 'Campo obrigatório' : undefined
    this.setState({erroTitulo, tituloLivro: valor, livros: undefined})
  }

  __naoPodePesquisar() {
    return this.state.tituloLivro === '' ||
           this.state.pesquisando ||
           this.state.erroTitulo !== undefined
  }

  render () {
    if (this.state.falhaNaConexao)
      return (
        <FalhaNaConexao
          rotuloBotao = 'Encerrar Pesquisa'
          onCancele = {this.props.onCancele}/>
      )

    let livros = this.state.livros

    return (
      <Paper>
        <Card>
          <CardContent>
            <h4> //FIXME: permitir pesquisa envolvendo todo ou parte do título</h4>
            <p>Analise o componente PesquisaPorId para saber o que deve ser feito</p>
          </CardContent>

          <CardActions>
            <Button
              variant='contained'
              color='primary'
              onClick={this.pesquisePorTitulo}
              disabled={this.__naoPodePesquisar()}>
              Pesquisar
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.props.onCancele}
              disabled={this.state.pesquisando}>
              Encerrar pesquisa
            </Button>
          </CardActions>
          <CardContent>
            <LivrosEncontrados livros={livros}/>
          </CardContent>
        </Card>
      </Paper>
    )
  }
}

PesquisaPorTitulo.propTypes = {
  onCancele: PropTypes.func.isRequired
}

export default PesquisaPorTitulo
