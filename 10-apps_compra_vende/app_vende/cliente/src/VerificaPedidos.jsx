import React from 'react'
import {buscaPedidos, enviaPedidoProcessado} from './util'
import ProcessaPedido from './ProcessaPedido.jsx'
import {Pedido} from './modelos'
import TabelaPedidos from './TabelaPedidos.jsx'

class VerificaPedidos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: undefined,
      pedidos: [],
      pedidoSelecionado: undefined
    }
    this.registreEmail = this.registreEmail.bind(this)
    this.busquePedidos = this.busquePedidos.bind(this)
    this.processePedido = this.processePedido.bind(this)
    this.enviePedidoProcessado = this.enviePedidoProcessado.bind(this)
  }

  enviePedidoProcessado(pedidoProcessado) {
    enviaPedidoProcessado(pedidoProcessado)
      .then(resposta => {
        if (resposta.ok)
          this.setState({msg: `Pedido ${pedidoProcessado.id} enviado!`, pedidoSelecionado: undefined})
        else {
          this.setState({msg: resposta.message})
        }
      })
      .catch(erro => this.setState({msg: erro.message}))
    this.setState({msg: `Enviando pedido ${pedidoProcessado.id} ...`})
  }

  registreEmail(ev) {
    this.setState({email: ev.target.value, msg: undefined, pedidos: []})
  }

  processePedido(ev) {
    let pedidoSelecionado
    let pedidosRestantes = this.state.pedidos.filter(ped => {
      if (ped.id === ev.target.dataset.idPedido) {
        pedidoSelecionado = ped
        return false
      } else
        return true
    })

    this.setState({pedidos: pedidosRestantes, pedidoSelecionado,msg: undefined})
  }

  busquePedidos() {
    buscaPedidos()
      .then(resposta => {
        let msg
        let pedidos = []
        if (resposta.ok === false)
          msg = resposta.message
        else {
          if (resposta.pedidos.length === 0)
            msg = 'Não há pedidos para análise'
          else {
            pedidos = resposta.pedidos.map(ped => Pedido.fromJSON(ped))
            msg = `Foram encontrados ${resposta.pedidos.length} pedidos.`
          }
        }
        this.setState({pedidos, pedidoSelecionado: undefined, msg})})
      .catch(erro => this.setState({msg: erro.message}))
    this.setState({msg: 'Buscando pedidos ...', pedidos: [], pedidoSelecionado: undefined})
  }

  render() {
    let tabelaComPedidos
    let processaPedido

    if (this.state.pedidos.length === 0 || this.state.pedidoSelecionado !== undefined)
      tabelaComPedidos = null
    else {
      tabelaComPedidos =
        <TabelaPedidos pedidos={this.state.pedidos} onSelecionado={this.processePedido}/>
    }

    if (this.state.pedidoSelecionado !== undefined)
      processaPedido =
          <ProcessaPedido pedido={this.state.pedidoSelecionado}
            onPronto={this.enviePedidoProcessado}/>

    return (
      <div className='card'>
        <div className='card-header'>
          <div className='card-header-title has-background-grey-light'>
            Verifica Pedidos
          </div>
        </div>
        <div className='card-content'>
          <button
            className='button is-success'
            onClick={this.busquePedidos}
            disabled={this.state.pedidos.length > 0 || this.state.pedidoSelecionado !== undefined}>
            Buscar Pedidos
          </button>
        </div>
        <div>
          <h4>
            Msg: {this.state.msg}
          </h4>
        </div>
        <div>
          {tabelaComPedidos}
        </div>
        <div>
          {processaPedido}
        </div>

      </div>
    )
  }
}

export default VerificaPedidos
