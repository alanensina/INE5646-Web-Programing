import React from 'react'
import PropTypes from 'prop-types'

import {TabelaProdutosProcessados} from './TabelaProdutosProcessados.jsx'

class MostraPedidosProcessados extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idSelecionado: undefined
    }
    this.definaIdSelecionado = this.definaIdSelecionado.bind(this)
  }

  definaIdSelecionado(ev) {
    this.setState({idSelecionado: ev.target.dataset.idPedido})
  }

  render() {
    if (this.props.pedidosProcessados.length === 0) return null
    return (
      <div align='center'>
        <h3>Pedidos Processados</h3>
        <table className='table is-hoverable is-bordered is-striped'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Total (em R$)</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {this.props.pedidosProcessados.map(pp =>
              <tr key={pp.id}>
                <td>{pp.id}</td>
                <td>{pp.custo()}</td>
                <td><MostraPedidoProcessado
                  pedidoProcessado={pp}
                  idSelecionado={this.state.idSelecionado}
                  onClick={this.definaIdSelecionado}/></td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

const MostraPedidoProcessado = (props) => {
  let conteudo

  if (props.pedidoProcessado.id !== props.idSelecionado)
    conteudo =
      <button className='button is-info'
        data-id-pedido={props.pedidoProcessado.id}
        onClick={props.onClick}>
              Exibir
      </button>
  else {
    conteudo =
      <div>
        <TabelaProdutosProcessados produtosProcessados={props.pedidoProcessado.produtosProcessados}/>
      </div>
  }
  return conteudo
}

MostraPedidosProcessados.propTypes = {
  pedidosProcessados: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MostraPedidosProcessados
