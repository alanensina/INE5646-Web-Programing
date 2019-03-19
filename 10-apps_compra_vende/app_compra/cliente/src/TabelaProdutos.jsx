import React from 'react'
import PropTypes from 'prop-types'

const TabelaProdutos = (props) => {
  let produtos = props.produtos.map(p =>
    <tr key={p.nome}>
      <td>{p.nome}</td>
      <td>{p.quantidade}</td>
      <td>
        <button className='button is-danger is-small is-rounded'
          data-nome={p.nome}
          onClick={props.onRemove}>X</button>
      </td>
    </tr>)

  return (
    <table className='table is-striped is-hoverable is-bordered is-fullwidth'>
      <thead className='has-background-grey-lighter'>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {produtos}
      </tbody>
    </table>
  )
}

TabelaProdutos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired
}

export {TabelaProdutos}
