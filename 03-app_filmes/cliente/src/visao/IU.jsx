import React from 'react'
import filmoteca from '../dados'
import {Cabecalho} from './Cabecalho.jsx'
import {FilmesCadastrados} from './FilmesCadastrados.jsx'
import {DetalhesFilme} from './DetalhesFilme.jsx'

class IU extends React.Component {
  constructor (props) {
    super(props)

    this.definaFilmeSelecionado = this.definaFilmeSelecionado.bind(this)
    this.definaFilmeNaoSelecionado = this.definaFilmeNaoSelecionado.bind(this)

    this.state = {
      filmoteca: undefined,
      titulos: undefined,
      idFilmeSelecionado: undefined
    }
  }

  componentDidMount() {
    // filmoteca poderia vir do servidor
    this.setState({ filmoteca, titulos: filmoteca.titulos})
  }

  definaFilmeSelecionado (id) {
    this.setState({idFilmeSelecionado: id})
  }

  definaFilmeNaoSelecionado () {
    this.setState({idFilmeSelecionado: undefined})
  }

  render () {
    let filme

    if (this.state.idFilmeSelecionado !== undefined) {
      filme = this.state.filmoteca.retorneFilme(this.state.idFilmeSelecionado)
    }

    return (
      <div className="container is-fluid">
        <Cabecalho/>
        <div className="columns">
          <div className="column is-one-third">
            <FilmesCadastrados
              idFilmeSelecionado={this.state.idFilmeSelecionado}
              titulos={this.state.titulos}
              onClick={this.definaFilmeSelecionado}/>
          </div>
          <div className="column">
            <DetalhesFilme
              filme={filme}
              onClick={this.definaFilmeNaoSelecionado}/>
          </div>
        </div>
      </div>
    )
  }
}

export {IU}
