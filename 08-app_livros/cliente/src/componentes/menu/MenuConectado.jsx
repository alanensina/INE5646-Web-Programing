import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'


const ListConectado = (props) => {
  
  return (
    <Drawer open={true} onClose={props.onCancele}>
      <List open={true}>
        <ListItem button onClick = {props.onCadastre}>
          Cadastrar livro...
        </ListItem>
        <ListItem button onClick = {props.onPesquise}>
          Pesquisar livro...
        </ListItem>
        <Divider/>
        <ListItem button onClick = {props.onDesconecte}>
          Desconectar do Banco de Dados
        </ListItem>
        <Divider/>
        <ListItem button onClick = {props.onSobre}>
          Sobre
        </ListItem>
      </List>
    </Drawer>
  )
}

ListConectado.propTypes = {
  onCancele: PropTypes.func.isRequired,
  onCadastre: PropTypes.func.isRequired,
  onPesquise: PropTypes.func.isRequired,
  onDesconecte: PropTypes.func.isRequired,
  onSobre: PropTypes.func.isRequired
}

export default ListConectado
