// @flow
import * as React from 'react'

import type {Token, VulcaoMongo} from '../tipos'
import MsgModal from './MsgModal.jsx'

import { leVulcoes, apagaVulcao } from '../servicos'
import MostraVulcao from './MostraVulcao.jsx'

type Props = {
  token: Token,
  onTokenInvalido: () => void
}

type State = {
  lendo: boolean,
  vulcoes: Array<VulcaoMongo> | void
}

class MostraVulcoes extends React.Component<Props,State> {
    state = {
      vulcoes: undefined,
      lendo: false
    }

  apagueVulcao = (ev: SyntheticEvent<HTMLButtonElement>) => {
    const idVulcao = ev.currentTarget.dataset.id
    apagaVulcao(this.props.token, idVulcao)
      .then(() => {
        let vulcoes = this.state.vulcoes === undefined ? [] : this.state.vulcoes
        vulcoes = vulcoes.filter(vulc => vulc._id !== idVulcao)
        this.setState({vulcoes})
      })
      .catch(() => {
        this.setState({vulcoes: undefined})
        this.props.onTokenInvalido()
      })
  }

  leiaVulcoes = () => {
    leVulcoes(this.props.token)
      .then(vulcoes => this.setState({ vulcoes, lendo: false }))
      .catch(() => {
        this.setState({vulcoes: undefined, lendo: false})
        this.props.onTokenInvalido()
      })
    this.setState({ lendo: true })
  }


  render() {
    return (
      <div className='message'>
        <MsgModal msg={this.state.lendo ? 'Lendo vulcões...' : undefined} />

        <div className='message-header'>Mostrar Vulcões
          <button className='button is-info' onClick={this.leiaVulcoes}>Ler Vulcões</button>
        </div>
        {
          this.state.vulcoes !== undefined &&
          <div>
            {this.state.vulcoes.map(v =>
              <span key={v._id}>
                <MostraVulcao token={this.props.token}
                  id={v._id}
                  vulcao={v.vulcao}
                  onDelete={this.apagueVulcao}/>
              </span>)}
          </div>
        }
        {
          this.state.vulcoes !== undefined &&
          this.state.vulcoes.length == 0 &&
          <div className='notification is-warning'>Não há vulcões para este usuário.</div>
        }
      </div>
    )
  }
}


export default MostraVulcoes
