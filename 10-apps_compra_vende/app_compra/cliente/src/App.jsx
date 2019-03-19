import React, { Component } from 'react'

import FazPedido from './FazPedido.jsx'
import VerificaPedido from './VerificaPedido.jsx'

class App extends Component {
  render() {
    return (
      <div className="container is-fluid">
        <div className='notification is-info'>
          <h1 className='title'>INE5646 - App Compra Vende :: Comprador</h1>
        </div>
        <div className='columns'>
          <div className='column is-two-thirds'><VerificaPedido /></div>
          <div className='column'><FazPedido /></div>
        </div>
      </div>
    )
  }
}

export default App
