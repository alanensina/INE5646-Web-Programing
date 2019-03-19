import React from 'react'
import {buscaPedidosProcessados} from './util'
import MostraPedidosProcessados from './MostraPedidosProcessados.jsx'
import {PedidoProcessado} from './modelos'

class VerificaPedido extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      msg: undefined,
      pedidosProcessados: []
    }
    this.registreEmail = this.registreEmail.bind(this)
    this.busquePedidosProcessados = this.busquePedidosProcessados.bind(this)
  }

  registreEmail(ev) {
    this.setState({email: ev.target.value, msg: undefined, pedidosProcessados: []})
  }

  busquePedidosProcessados(ev) {
    ev.preventDefault() // para não enviar requisição ao servidor
    buscaPedidosProcessados(this.state.email)
      .then(resposta => {
        let msg
        let pedidosProcessados = []
        if (resposta.ok === false)
          msg = resposta.message
        else {
          if (resposta.pedidosProcessados.length === 0)
            msg = `Não há pedidos para ${this.state.email}`
          else {
            pedidosProcessados = resposta.pedidosProcessados
              .map(pedidoProcessado => PedidoProcessado.fromJSON(pedidoProcessado))
            msg = `Foram encontrados ${resposta.pedidosProcessados.length} pedidos processados.`
          }
        }
        this.setState({pedidosProcessados, msg})
      })
      .catch(erro => this.setState({msg: erro.message}))
    this.setState({msg: 'Buscando pedidos processados...', pedidosProcessados: []})
  }

  render() {
    return (
      <div className='card'>
        <div className= 'card-header'>
          <div className='card-header-title has-background-grey-light'>
              Verifica Pedidos
          </div>
        </div>
        <div className='card-content'>
          <form>
            <div className='field'>
              <label className='label'>E-mail</label>
              <div className='control'>
                <input className='input is-primary' type='text'
                  value={this.state.email}
                  onChange={this.registreEmail}/>
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <button className='button is-success'
                  onClick={this.busquePedidosProcessados}
                  disabled={this.state.email.length === 0}>
                    Buscar Pedidos Já Processados
                </button>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Msg:</label>
              <div className='control'>
                <h4 className='subtitle'>{this.state.msg}</h4>
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <MostraPedidosProcessados pedidosProcessados={this.state.pedidosProcessados}/>
              </div>
            </div>
          </form>
        </div>

      </div>
    )
  }
}

export default VerificaPedido
