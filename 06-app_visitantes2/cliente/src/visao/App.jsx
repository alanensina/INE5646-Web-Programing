import React, { Component } from 'react'
import {Panel} from 'primereact/panel'
import {Button} from 'primereact/button'
import {Chart} from 'primereact/chart'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


class App extends Component {
  constructor() {
    super()
    this.state = {
      exibindo: false,
      meses : undefined,
      visitantes : undefined
    }
    this.obtenhaDados = this.obtenhaDados.bind(this)
  }

  obtenhaDados() {
    window.fetch('/dados')
      .then(r => r.json())
      .then(({meses, visitantes}) => {
        this.setState({meses, visitantes, exibindo: true})
      })
  }

  render() {
    let conteudo
    if (this.state.exibindo === false)
      conteudo = <Button label='Exibir' onClick={this.obtenhaDados}/>
    else {
      // FIXME Definir o objeto dados conforme a documentação do componente Chart
      const dados = {
      }
      conteudo = <Chart type='bar' data={dados}/>
    }
    return (
      <Panel header='INE5646 - App Visitantes2'>
        <div>{conteudo}</div>
      </Panel>
    )
  }
}

export default App
