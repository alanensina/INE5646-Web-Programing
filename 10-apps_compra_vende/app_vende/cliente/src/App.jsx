import React, { Component } from 'react'

import VerificaPedidos from './VerificaPedidos.jsx'
import 'bulma/css/bulma.min.css'

class App extends Component {
  render() {
    return (
      <div className='container is-fluid'>
        <div className='notification is-info'>
          <h1 className='title'>INE5646 - App Rabbit :: Vendedor</h1>
        </div>
        <div className='columns'>
          <div className='column'>
            <VerificaPedidos />
          </div>
        </div>
      </div>
    )
  }
}

export default App
