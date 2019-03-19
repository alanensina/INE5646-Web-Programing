import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

const BarraDaApp = (props) => (
  <AppBar>
    <Toolbar>
      <Grid container alignItems='center' justify='space-between'>
        <Grid item>
          <IconButton color='inherit' onClick={props.toggleMenu} disabled={!props.mostrarIconeMenu} >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='h6' color='inherit' gutterBottom>
            INE5646 - App Livros
          </Typography>
        </Grid>
        <Grid item>
          {props.iconeConexao}
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>

)

BarraDaApp.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  mostrarIconeMenu: PropTypes.bool.isRequired,
  iconeConexao: PropTypes.element.isRequired
}

export default BarraDaApp
