import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'

import FalhaNaConexao from '../util/FalhaNaConexao.jsx'
import LivrosEncontrados from './LivrosEncontrados.jsx'
import servicos from '../../servicos'

class PesquisaPorId extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pesquisando: false,
      livro: undefined,
      idLivro : '',
      erroID: undefined,
      falhaNaConexao: false
    }
    this.pesquisePorId = this.pesquisePorId.bind(this)
    this.__registreResposta = this.__registreResposta.bind(this)
    this.__registreFalhaNaConexao = this.__registreFalhaNaConexao.bind(this)
    this.altereID = this.altereID.bind(this)
    this.__naoPodePesquisar = this.__naoPodePesquisar.bind(this)

  }

  pesquisePorId() {
    servicos.pesquisePorId(this.state.idLivro)
      .then((resposta) => this.__registreResposta(resposta))
      .catch(() => this.__registreFalhaNaConexao())

    const novoEstado = {
      pesquisando: true,
      livro: undefined
    }

    this.setState(novoEstado)
  }

  __registreResposta(livroOuNull) {
    const novoEstado = {
      pesquisando: false,
      livro: livroOuNull
    }

    this.setState(novoEstado)
  }

  __registreFalhaNaConexao() {
    this.setState({falhaNaConexao: true})
  }

  altereID(ev) {
    const valor = ev.target.value
    const erroID = valor === '' ? 'Campo obrigatório' : undefined
    this.setState({erroID, idLivro: valor, livro: undefined})
  }

  __naoPodePesquisar () {
    return this.state.idLivro === '' ||
           this.state.pesquisando ||
           this.state.erroID !== undefined
  }

  render () {
    if (this.state.falhaNaConexao)
      return (
        <FalhaNaConexao
          rotuloBotao = 'Encerrar Pesquisa'
          onCancele = {this.props.onCancele}/>
      )

    let livros

    if (this.state.livro === null)
      livros = []
    else
    if (this.state.livro !== undefined)
      livros = [this.state.livro]

    return (
      <Paper>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              required
              error={this.state.erroID !== undefined}
              placeholder='digite o ID do livro'
              label='ID do Livro'
              helperText={this.state.erroID}
              value={this.state.idLivro}
              onChange={this.altereID}/>
          </CardContent>

          <CardActions>
            <Button
              variant='contained'
              color='primary'
              onClick={this.pesquisePorId}
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

PesquisaPorId.propTypes = {
  onCancele: PropTypes.func.isRequired
}

export default PesquisaPorId
