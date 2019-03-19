import React from 'react'
import PropTypes from 'prop-types'

import MostrarUsuarios from './MostrarUsuarios.jsx'
import CadastrarUsuario from './CadastrarUsuario.jsx'
import BulmaNavbar, {BulmaNavbarItem} from '../../ui/BulmaNavbar.jsx'

import { Link, Switch, Route } from 'react-router-dom'

const BarraDeMenu = () => (
  <div>
    <BulmaNavbar color='is-light'>
      <BulmaNavbarItem name='Ações do Administrador...'>
        <Link className='navbar-item' style={{textDecoration: 'none'}}
          to= '/mostrar'>Mostrar Usuários</Link>
        <Link className='navbar-item' style={{textDecoration: 'none'}}
          to='/cadastrar'>Cadastrar Usuário</Link>
      </BulmaNavbarItem>
    </BulmaNavbar>

  </div>
)

const Acoes = props => (
  <Switch>
    <Route exact path='/' component={Inicial}/>

    <Route path='/mostrar'
      render={ (propsR) =>
        <MostrarUsuarios {...propsR} idToken={props.idToken}/>
      }/>

    <Route path='/cadastrar'
      render={ (propsR) =>
        <CadastrarUsuario {...propsR}
          idToken={props.idToken}
          papeisExistentes={props.papeisExistentes}/>
      }/>
  </Switch>
)
Acoes.propTypes = {
  idToken: PropTypes.string.isRequired,
  papeisExistentes: PropTypes.arrayOf(PropTypes.string).isRequired
}
const Inicial = () => ( null )

class TarefasAdmin extends React.Component {

  render() {
    return (
      <div>
        <BarraDeMenu/>
        <Acoes idToken={this.props.idToken} papeisExistentes={this.props.papeisExistentes}/>
      </div>
    )
  }
}

TarefasAdmin.propTypes = {
  idToken: PropTypes.string.isRequired,
  papeisExistentes: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TarefasAdmin
