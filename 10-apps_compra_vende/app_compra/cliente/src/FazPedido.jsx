import React from 'react'

import {enviaPedido} from './util'
import {Produto, Pedido} from './modelos'
import {TabelaProdutos} from './TabelaProdutos.jsx'

class FazPedido extends React.Component {
  constructor() {
    super()
    this.state = {
      pedido: new Pedido('', '', []),
      novoProduto: new Produto('', 0),
      msg: undefined
    }

    this.registreEmail = this.registreEmail.bind(this)
    this.excluaProdutoPorNome = this.excluaProdutoPorNome.bind(this)
    this.registreIdPedido = this.registreIdPedido.bind(this)
    this.registreNomeProduto = this.registreNomeProduto.bind(this)
    this.registreQuantidade = this.registreQuantidade.bind(this)
    this.adicioneProduto = this.adicioneProduto.bind(this)
    this.enviePedido = this.enviePedido.bind(this)
  }

  registreEmail(ev) {
    const pedido = this.state.pedido
    pedido.email = ev.target.value.trim()
    this.setState({pedido, msg: undefined})
  }

  registreIdPedido(ev) {
    const pedido = this.state.pedido
    pedido.id = ev.target.value.trim()
    this.setState({pedido, msg: undefined})
  }

  registreNomeProduto(ev) {
    let nomeProduto = ev.target.value
    if (this.state.pedido.getProdutoPorNome(nomeProduto) !== null)
      this.setState({msg: 'Produto já definido'})
    else {
      const novoProduto = this.state.novoProduto
      novoProduto.nome = nomeProduto
      this.setState({msg: undefined, novoProduto})
    }
  }

  registreQuantidade(ev) {
    const qtd = parseInt(ev.target.value, 10)

    if (!isFinite(qtd) || qtd < 1)
      this.setState({msg: 'Quantidade deve ser número inteiro maior que zero!'})
    else {
      const novoProduto = this.state.novoProduto
      novoProduto.quantidade = qtd
      this.setState({novoProduto, msg: undefined})
    }
  }

  adicioneProduto(ev) {
    ev.preventDefault() // impede o envio da requisição ao servidor
    const pedido = this.state.pedido
    pedido.adicioneProduto(this.state.novoProduto)

    const novoProduto = new Produto('', 0)
    this.setState({pedido, novoProduto, msg: undefined})
  }

  excluaProdutoPorNome(ev) {
    const pedido = this.state.pedido
    pedido.removaProdutoPorNome(ev.target.dataset.nome) //Show!!!!
    this.setState({pedido, msg: undefined})
  }

  enviePedido(ev) {
    ev.preventDefault()

    if (this.state.pedido.id === '')
      this.setState({msg: 'Id do pedido não definido'})
    else if (this.state.pedido.email === '')
      this.setState({msg: 'E-mail não definido'})
    else if (this.state.pedido.produtos.length === 0)
      this.setState({msg: 'Pedido precisa ter pelo menos um produto'})
    else {
      enviaPedido(this.state.pedido)
        .then(() => this.setState({msg: 'Pedido enviado', pedido: new Pedido('', '', [])}))
        .catch(erro => this.setState({msg: erro.message}))
      this.setState({msg: 'Enviando pedido...'})
    }
  }

  render() {

    return (
      <div className='card'>
        <div className='card-header'>
          <div className='card-header-title is-centered  has-background-grey-light'>Faz Pedido</div>
        </div>
        <div className='card-content'>
          <form>
            <div className='field'>
              <label className='label'>E-mail</label>
              <div className='control'>
                <input
                  className='input is-primary'
                  type='text'
                  value={this.state.pedido.email}
                  onChange={this.registreEmail}/>
              </div>
            </div>

            <div className='field'>
              <label className='label'>
                Id do Pedido
              </label>
              <div className='control'>
                <input
                  className='input is-primary'
                  type='text'
                  value={this.state.pedido.id}
                  onChange={this.registreIdPedido}/>
              </div>
            </div>

            <div className='field'>
              <label className='label'>
                Produtos Adicionados
              </label>
              <div className='control'>
                <div className='card has-background-danger'>
                  <div className='card-header'>
                    <TabelaProdutos
                      produtos={this.state.pedido.produtos}
                      onRemove={this.excluaProdutoPorNome}/>
                  </div>
                  <div className='card-content'>
                    <div className='field'>
                      <label className='label'>
                        Nome do Produto
                      </label>
                      <div className='control'>
                        <input
                          className='input is-primary'
                          type='text'
                          value={this.state.novoProduto.nome}
                          onChange={this.registreNomeProduto}/>
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label'>Quantidade</label>
                      <div className='control'>
                        <input
                          className='input is-primary'
                          type='number'
                          min='1'
                          value={this.state.novoProduto.quantidade}
                          onChange={this.registreQuantidade}/>
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <button
                          className='button is-primary'
                          onClick={this.adicioneProduto}>Adicionar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='field'>
              <div className='control'>
                <button
                  className='button is-success'
                  onClick={this.enviePedido}>
                  Enviar Pedido
                </button>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Msg</label>
              <div className='control'>
                {this.state.msg}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default FazPedido
