import React from 'react'
import PropTypes from 'prop-types'

import {BotaoDetalhes} from './BotaoDetalhes.jsx'

class FilmesCadastrados extends React.Component {
  render () {
    let conteudo

    if (this.props.titulos === undefined || this.props.titulos.length === 0) {
      conteudo =
        <div className="notification is-warning">
          Não há filmes cadastrados.
        </div>
    } else {
      let p = this.props
      conteudo =
        this.__monteTabela(p.titulos, p.idFilmeSelecionado, p.onClick)
    }

    return (
      <div className="box">
        <div className="message is-info">
          <div className="message-header">
            <p>Filmes Cadastrados</p>
          </div>
          <div className="box">
            {conteudo}
          </div>
        </div>
      </div>
    )
  }

  // monta a tabela com os títulos dos filmes
  __monteTabela (titulos, idFilmeSelecionado, onClick) {
    let tabela =
    <table className="table is-striped is-hoverable is-fullwidth">
      <tbody>
        {titulos.map(idTitulo => this.__monteLinha(idFilmeSelecionado, idTitulo, onClick))}
      </tbody>
    </table>

    return tabela
  }

  // monta uma linha contendo o título do filme
  __monteLinha (idFilmeSelecionado, idTitulo, onClick) {
    let linha =
      <tr key={idTitulo.id}>
        <td>{idTitulo.titulo}</td>
        <td>
          {this.__monteBotao(idFilmeSelecionado, idTitulo.id, onClick)}
        </td>
      </tr>

    return linha
  }

  // monta o botão detalhes da linha
  __monteBotao (idFilmeSelecionado, idFilme, onClick) {
    let botao

    botao = <BotaoDetalhes id={idFilme} onClick={onClick}/>

    return botao
  }
}

FilmesCadastrados.propTypes = {
  titulos: PropTypes.array
}

export {FilmesCadastrados}
