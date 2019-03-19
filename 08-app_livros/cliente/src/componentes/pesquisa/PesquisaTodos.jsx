import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import LivrosEncontrados from './LivrosEncontrados.jsx'
import servicos from '../../servicos'
import FalhaNaConexao from '../util/FalhaNaConexao.jsx'

class PesquisaTodos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pesquisando: false,
      livros: undefined,
      falhaNaConexao: false
    }
    this.pesquiseTodos = this.pesquiseTodos.bind(this)
    this.__registreResposta = this.__registreResposta.bind(this)
    this.__registreFalhaNaConexao = this.__registreFalhaNaConexao.bind(this)
  }
  
  pesquiseTodos () {
    servicos.pesquiseTodos()
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
    this.setState({falhaNaConexao: true})
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
          <CardActions>
            <Button
              variant='contained'
              color='primary'
              onClick={this.pesquiseTodos}
              disabled={this.state.pesquisando}>
              Pesquisar
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.props.onCancele}
              disabled={this.state.pesquisando}>
              Encerrar Pesquisa
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

PesquisaTodos.propTypes = {
  onCancele: PropTypes.func.isRequired
}

export default PesquisaTodos
