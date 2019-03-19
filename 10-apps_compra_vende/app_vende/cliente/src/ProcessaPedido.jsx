import React from 'react'
import  PropTypes from 'prop-types'

import {PedidoProcessado} from './modelos'
import TabelaProdutoProcessado from './TabelaProdutoProcessado.jsx'

class ProcessaPedido extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pedidoProcessado: PedidoProcessado.fromPedido(this.props.pedido)
    }
    this.alterePrecoUnitario = this.alterePrecoUnitario.bind(this)
    this.enviePedidoPronto = this.enviePedidoPronto.bind(this)
  }

  enviePedidoPronto() {
    this.props.onPronto(this.state.pedidoProcessado)
  }

  alterePrecoUnitario(ev) {
    // trunca, com arredondamento, o valor digitado em duas casas decimais
    const preco = parseFloat(parseFloat(ev.target.value).toFixed(2))
    if (isFinite(preco)) {
      let pedidoProcessado = this.state.pedidoProcessado
      let nomeDoProduto = ev.target.name
      const produtoProcessado = pedidoProcessado.getProdutoProcessadoPorNome(nomeDoProduto)
      produtoProcessado.precoUnitario = preco
      this.setState({pedidoProcessado})
    }
  }

  render() {
    let pps = this.state.pedidoProcessado.produtosProcessados
    let conteudo =
    <div className='card has-background-light'>
      <div className='card-header'>
        <h3 className='card-header-title has-background-grey'>
          Pedido: {this.state.pedidoProcessado.id} - Usuário: {this.state.pedidoProcessado.email}
        </h3>
      </div>
      <div className='card-content'>
        <TabelaProdutoProcessado
          produtosProcessados={pps}
          onPrecoUnitarioAlterado={this.alterePrecoUnitario}
          pedidoProcessado={this.state.pedidoProcessado}/>
        <div>
          <button
            className='button is-success'
            onClick={this.enviePedidoPronto}>Enviar</button>
        </div>
      </div>
    </div>
    return conteudo
  }
}

ProcessaPedido.propTypes = {
  pedido: PropTypes.object.isRequired,
  onPronto: PropTypes.func.isRequired
}

export default ProcessaPedido
