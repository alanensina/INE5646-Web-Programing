import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const FalhaNaConexao = (props) =>
  <div>
    <h3>Sem acesso ao banco de dados. Tente novamente mais tarde.</h3>
    <Button label = {props.rotuloBotao}  onClick={props.onCancele}/>
  </div>

FalhaNaConexao.propTypes = {
  rotuloBotao: PropTypes.string.isRequired,
  onCancele: PropTypes.func.isRequired
}

export default FalhaNaConexao
