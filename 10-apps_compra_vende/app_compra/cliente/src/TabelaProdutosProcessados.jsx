import React from 'react'
import PropTypes from 'prop-types'

const TabelaProdutosProcessados = (props) => {
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
            <td>{pp.precoUnitario}</td>
            <td>{pp.custo()}</td>
          </tr>
        )}
      </tbody>
    </table>

  )
}

TabelaProdutosProcessados.propTypes = {
  produtosProcessados: PropTypes.arrayOf(PropTypes.object).isRequired
}

export {TabelaProdutosProcessados}
