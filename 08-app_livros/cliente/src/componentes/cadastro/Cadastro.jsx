import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import servicos from '../../servicos'
import FormCadastro from './FormCadastro.jsx'

class Cadastro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: undefined,
      cadastrarNovamente: false
    }
    this.facaCadastro = this.facaCadastro.bind(this)
    this.registreResultado = this.registreResultado.bind(this)
    this.facaNovoCadastro = this.facaNovoCadastro.bind(this)
    this.decidaSeCadastraNovamente = this.decidaSeCadastraNovamente.bind(this)
  }

  facaCadastro(dados) {
    servicos.cadastre(dados)
      .then((r) => this.registreResultado(r))
      .catch(() => this.setState({msg: 'Não conseguiu salvar!'}))
    this.setState({msg: undefined, cadastrarNovamente: false})
  }

  registreResultado(r) {
    const novoEstado = {
      msg: `Livro cadastrado! Id: ${r.id}`,
      cadastrarNovamente: true
    }

    this.setState(novoEstado)
  }

  facaNovoCadastro() {
    const novoEstado = {
      msg: undefined,
      cadastrarNovamente: false
    }

    this.setState(novoEstado)
  }

  decidaSeCadastraNovamente(ev) {
    ev.target.value === 'sim' ? this.facaNovoCadastro() : this.props.onCancele()
  }

  render () {
    let conteudo
    let msg

    if (this.state.msg !== undefined)
      msg = <h4>{this.state.msg}</h4>

    if (this.state.cadastrarNovamente) {
      conteudo =
        <Paper>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Cadastrar mais um?</FormLabel>
            <RadioGroup onChange={this.decidaSeCadastraNovamente}>
              <FormControlLabel value={'sim'} control={<Radio/>} label='Sim'/>
              <FormControlLabel value={'não'} control={<Radio/>} label='Não'/>
            </RadioGroup>
          </FormControl>
        </Paper>
    }
    else
      conteudo =
        <FormCadastro
          onCadastre={this.facaCadastro}
          onCancele={this.props.onCancele}/>


    return (
      <Paper>
        <Card>
          <CardHeader title='Cadastrar Livro'/>
          <CardContent>
            {msg}{conteudo}
          </CardContent>
        </Card>
      </Paper>
    )
  }
}

Cadastro.propTypes = {
  onCancele: PropTypes.func.isRequired
}

export default Cadastro
