// @flow
import * as React from 'react'
import type {Token, IdVulcao, Vulcao, ImagemEmBase64} from '../tipos'
import { buscaImagemNoBanco } from '../servicos'
import MsgModal from './MsgModal.jsx'

type Props = {
    token: Token,
    id: IdVulcao,
    vulcao: Vulcao,
    onDelete: (SyntheticEvent<HTMLButtonElement>) => void
}

type State = {
  textoBotao: string,
  imagem: ImagemEmBase64 | void,
  mostrando: boolean,
  lendo: boolean
}

class MostraVulcao extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      mostrando: false,
      lendo: false,
      textoBotao : this.obtenhaTexto(this.props.vulcao),
      imagem: undefined
    }
  }

  obtenhaTexto(vulcao: Vulcao) {
    return `${vulcao.nome} - ${vulcao.pais}`
  }

  exibaOuOculte = () => {
    if (this.state.mostrando)
      this.setState({
        mostrando: false,
        textoBotao: this.obtenhaTexto(this.props.vulcao)
      })
    else {
      if (this.state.imagem !== undefined)
        this.setState({ mostrando: true, textoBotao: 'Ocultar' })
      else {
        buscaImagemNoBanco(this.props.token, this.props.id)
          .then(imagem => {
            this.setState({ mostrando: true, lendo: false,
              textoBotao: 'Ocultar', imagem })
          })
          .catch(() => {
            this.setState({ mostrando: true, lendo: false,
              textoBotao: 'Ocultar', imagem: this.props.vulcao.miniatura })
          })
        this.setState({lendo: true})
      }
    }
  }

  render() {
    let conteudo
    if (this.state.lendo)
      return <MsgModal msg={`lendo ${this.obtenhaTexto(this.props.vulcao)} ...`}/>

    if (this.state.mostrando) {
      conteudo =
        <div className='notification is-info'>
          <div className='title'>
            {this.props.vulcao.nome} - {this.props.vulcao.pais}
          </div>
          <img src={this.state.imagem}/>
          <button className='button is-link'
            onClick={this.exibaOuOculte}>
            {this.state.textoBotao}
          </button>
          <button className='button is-danger'
            data-id={this.props.id}
            onClick={this.props.onDelete}>
            Apagar
          </button>
        </div>
    } else {
      conteudo =
          <div>
            <button className='button is-link is-rounded'
              onClick={this.exibaOuOculte}>
              {this.state.textoBotao}
            </button>
            <img src={this.props.vulcao.miniatura}
              onClick={this.exibaOuOculte}/>
          </div>
    }
    return (
      <span>{conteudo}</span>
    )
  }
}


export default MostraVulcao
