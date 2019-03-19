import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from '@material-ui/core/SvgIcon'
import Cloud from '@material-ui/icons/Cloud'
import CloudOff from '@material-ui/icons/CloudOff'

const IconeConexao = (props) => {
  const icone = props.conectado ? <Cloud /> : <CloudOff />

  return <SvgIcon>{icone}</SvgIcon>

}

IconeConexao.propTypes = {
  conectado: PropTypes.bool.isRequired
}

export default IconeConexao
