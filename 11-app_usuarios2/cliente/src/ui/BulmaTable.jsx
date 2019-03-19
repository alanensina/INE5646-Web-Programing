import React from 'react'
import PropTypes from 'prop-types'

const BulmaTable = (props) => {
  const cabecalho =
    props.heads.map(cab => <th key={cab}>{cab}</th>)
  let l = 1 // linha
  const corpo =
    props.data.map(linha => {
      let c = 1 // coluna
      const cols = linha.map(col => <td key={c++}>{col}</td>)
      return <tr key={l++}>{cols}</tr>
    })
  return (
    <table className='table is-hoverable'>
      <thead>
        <tr>{cabecalho}</tr>
      </thead>
      <tbody>
        {corpo}
      </tbody>
    </table>
  )
}

BulmaTable.propTypes = {
  heads: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired
}

export default BulmaTable
