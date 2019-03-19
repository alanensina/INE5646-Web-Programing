import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class FormCadastro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: '',
      erroTitulo: undefined,
      autor: '',
      erroAutor: undefined,
      paginas: '',
      erroPaginas: undefined,
    }
    this.altereTitulo = this.altereTitulo.bind(this)
    this.podeCadastrar = this.podeCadastrar.bind(this)
    this.altereAutor = this.altereAutor.bind(this)
    this.alterePaginas = this.alterePaginas.bind(this)
    this.facaCadastro = this.facaCadastro.bind(this)
  }

  podeCadastrar() {
    const s = this.state
    return s.erroTitulo === undefined &&
      s.erroAutor === undefined &&
      s.erroPaginas === undefined &&
      s.titulo !== '' &&
      s.autor !== '' &&
      s.paginas !== ''
  }

  altereTitulo(ev) {
    const titulo = ev.target.value
    const erroTitulo = titulo === '' ? 'Campo obrigatório' : undefined
    this.setState({titulo, erroTitulo})
  }

  altereAutor(ev) {
    const autor = ev.target.value
    const erroAutor = autor === '' ? 'Campo obrigatório' : undefined
    this.setState({autor, erroAutor})
  }

  alterePaginas(ev) {
    const paginas = ev.target.value
    const erroPaginas = isNaN(paginas) || paginas < 1 ? 'Tem que ser número maior que zero' : undefined
    this.setState({paginas, erroPaginas})
  }

  facaCadastro() {
    const dados = {
      titulo: this.state.titulo,
      autor: this.state.autor,
      paginas: this.state.paginas
    }
    this.props.onCadastre(dados)
  }

  render () {
    return (
      <Card>
        <CardContent>
          <TextField
            required
            fullWidth
            error={this.state.erroTitulo !== undefined}
            placeholder='digite o título'
            label='Título'
            helperText={this.state.erroTitulo}
            onChange={this.altereTitulo}
            value={this.state.titulo}/>
          <br/><br/>
          <TextField
            required
            fullWidth
            error={this.state.erroAutor !== undefined}
            placeholder='digite o autor'
            label='Autor'
            helperText={this.state.erroAutor}
            onChange={this.altereAutor}
            value={this.state.autor}/>
          <br/><br/>
          <TextField
            required
            fullWidth
            error={this.state.erroPaginas !== undefined}
            placeholder='digite o número de páginas'
            label='Páginas'
            helperText={this.state.erroPaginas}
            onChange={this.alterePaginas}
            value={this.state.paginas}/>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary' 
            disabled={!this.podeCadastrar()} 
            onClick={this.facaCadastro}>
            Cadastrar
          </Button>

          <Button
            variant='contained'
            color='secondary' 
            onClick={this.props.onCancele}>
            Cancelar
          </Button>
        </CardActions>
      </Card>
    )
  }
}

FormCadastro.propTypes = {
  onCancele: PropTypes.func.isRequired,
  onCadastre: PropTypes.func.isRequired
}

export default FormCadastro
