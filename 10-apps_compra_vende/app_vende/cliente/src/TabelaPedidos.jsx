import React from 'react'
import PropTypes from 'prop-types'

const TabelaPedidos = (props) => {
  return (
    <table className='table is-bordered is-striped is-hoverable'>
      <caption>Pedidos Aguardando Processamento</caption>
      <thead>
        <tr><th>Id</th><th>E-mail</th><th>Ação</th></tr>
      </thead>
      <tbody>
        {props.pedidos.map(p =>
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.email}</td>
            <td><button className='button is-primary'
              data-id-pedido={p.id}
              onClick={props.onSelecionado}>
                  Processar
            </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

TabelaPedidos.propTypes = {
  pedidos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelecionado: PropTypes.func.isRequired
}

export default TabelaPedidos
