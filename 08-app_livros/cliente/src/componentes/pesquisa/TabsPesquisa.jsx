import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import PesquisaTodos from './PesquisaTodos.jsx'
import PesquisaPorId from './PesquisaPorId.jsx'
import PesquisaPorTitulo from './PesquisaPorTitulo.jsx'

class TabsPesquisa extends Component {
  constructor(props) {
    super(props)
    this. state = {
      tab: 'todos'
    }
    this.mudeParaTab = this.mudeParaTab.bind(this)
  }
 
  mudeParaTab (ev, tab) {
    this.setState({tab})
  }

  render () {
    return (
      <div>
        <Tabs value={this.state.tab} onChange={this.mudeParaTab} fullWidth>

          <Tab label='Todos' value='todos'/>

          <Tab label='Por Id' value='id'/>

          <Tab label='Por Título' value='titulo'/>
        </Tabs>
        {this.state.tab === 'todos' && <PesquisaTodos onCancele={this.props.onCancele}/>}
        {this.state.tab === 'id' && <PesquisaPorId onCancele={this.props.onCancele}/>}
        {this.state.tab === 'titulo' && <PesquisaPorTitulo onCancele={this.props.onCancele}/>}
      </div>
    )
  }
}

TabsPesquisa.propTypes = {
  onCancele: PropTypes.func.isRequired
}

export default TabsPesquisa
