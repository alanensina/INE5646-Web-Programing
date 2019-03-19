import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Drawer from '@material-ui/core/Drawer'


const MenuInicial = (props) => {

  return (
    <Drawer open={true} onClose={props.onCancele}>
      <List open={true}>
        <ListItem button onClick = {props.onConecte}>
          Conectar ao Banco de Dados...
        </ListItem>
            
        <ListItem button onClick = {props.onSobre}>
          Sobre...
        </ListItem>
      </List>
    </Drawer>
  )
}

MenuInicial.propTypes = {
  onCancele: PropTypes.func.isRequired,
  onConecte: PropTypes.func.isRequired,
  onSobre: PropTypes.func.isRequired
}

export default MenuInicial
