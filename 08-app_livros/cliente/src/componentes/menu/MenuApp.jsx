import React from 'react'
import PropTypes from 'prop-types'
import MenuConectado from './MenuConectado.jsx'
import MenuInicial from './MenuInicial.jsx'

const MenuApp = (props) => {
  let menu

  if (props.conectado) {
    menu =
        <MenuConectado
          onCancele = {props.cancele}
          onCadastre = {props.cadastre}
          onPesquise = {props.pesquise}
          onDesconecte = {props.desconecte}
          onSobre = {props.onSobre} />
  } else {
    menu =
        <MenuInicial
          onCancele = {props.cancele}
          onConecte = {props.conecte}
          onSobre = {props.onSobre} />
  }

  return menu
}

MenuApp.propTypes = {
  cancele: PropTypes.func.isRequired,
  conectado: PropTypes.bool.isRequired,
  onSobre: PropTypes.func.isRequired,
  onCadastre: PropTypes.func,
  onPesquise: PropTypes.func,
  onDesconecte: PropTypes.func,
  onConecte: PropTypes.func
}

export default MenuApp
