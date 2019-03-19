import React from 'react'
import PropTypes from 'prop-types'

const TabelaProdutoProcessado = (props) => {
  return (
    <table className='table is-bordered is-striped is-hoverable'>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço Unitário (em R$)</th>
          <th>Preço (em R$)</th>
        </tr>
      </thead>
      <tbody>
        {props.produtosProcessados.map(pp =>
          <tr key={pp.produto.nome}>
            <td>{pp.produto.nome}</td>
            <td>{pp.produto.quantidade}</td>
            <td>
              <input type='number' min='0' step='0.01'
                value={pp.precoUnitario}
                onChange={props.onPrecoUnitarioAlterado}
                name={pp.produto.nome}/>
            </td>
            <td>{pp.custo()}</td>
          </tr>
        )}
      </tbody>
      <caption>Total (em R$): {props.pedidoProcessado.custo()}</caption>
    </table>
  )
}

TabelaProdutoProcessado.propTypes = {
  produtosProcessados: PropTypes.arrayOf(PropTypes.object).isRequired,
  pedidoProcessado: PropTypes.object.isRequired,
  onPrecoUnitarioAlterado: PropTypes.func.isRequired
}

export default TabelaProdutoProcessado
