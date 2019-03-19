// @flow
import * as React from 'react'
import MsgModal from './MsgModal.jsx'
import type {Token, ImagemEmBase64, ImagemEmURL, VulcaoParaCadastro} from '../tipos'
import {cadastraVulcao} from '../servicos'
import processaImagem from '../util_jimp'

type Props = {
  token: Token,
    onTokenInvalido: () => void,
    limiteImagem: number
}

type State = {
  imagem: ImagemEmBase64 | void,
  miniatura: ImagemEmBase64 | void,
  url: ImagemEmURL,
  pais: string,
  nome: string,
  cadastrando: boolean,
  msgErro: string | void,
  msgModal: string | void
}

class CadastraVulcao extends React.Component<Props,State> {
  arquivo = React.createRef<any>()

  state = {
    imagem: undefined,
    miniatura: undefined,
    url: '',
    nome: '',
    pais: '',
    cadastrando: false,
    msgErro: undefined,
    msgModal: undefined
  }

  podeCadastrar = () => {
    return this.state.imagem !== undefined && this.state.nome !== ''
    && this.state.pais !== '' && !this.state.cadastrando
  }

  urlDefinida = (ev: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      url: ev.currentTarget.value,
      msgErro: undefined,
      imagem: undefined,
      miniatura: undefined
    })
  }

  nomeDefinido = (ev: SyntheticEvent<HTMLInputElement>) => {
    this.setState({nome: ev.currentTarget.value})
  }

  paisDefinido = (ev: SyntheticEvent<HTMLInputElement>) => {
    this.setState({pais: ev.currentTarget.value})
  }

  escolhaArquivo = () => {
    this.setState({ msgErro: undefined })
    if (this.arquivo.current !== null)
      this.arquivo.current.click()
  }

  arquivoDefinido = () => {
    if (this.arquivo.current !== null) {
      const arquivo = this.arquivo.current.files[0]
      const leitor = new window.FileReader()
      leitor.onloadstart = () => this.setState( {msgModal : 'Lendo imagem...'})
      leitor.onload = img => {
        this.setState({ msgModal: 'Processando imagem...' })
        processaImagem(img.target.result)
          .then(({imagem, miniatura}) => {
            this.setState({ msgModal: undefined })
            if (imagem.length <= this.props.limiteImagem)
              this.setState({msgErro: undefined, url: '', imagem, miniatura})
            else
              this.setState({
                imagem: undefined,
                miniatura: undefined,
                msgErro: `Tamanho da imagem maior que ${this.props.limiteImagem}`
              })
          })
          .catch(erro => this.setState({msgErro: erro.message, msgModal: undefined}))
      }
      leitor.readAsDataURL(arquivo)
    }
  }

  leiaImagemDeURL = () => {
    this.setState({ msgModal: 'Processando Imagem', imagem: undefined })
    processaImagem(this.state.url)
      .then(({imagem, miniatura}) => {
        this.setState({ msgModal: undefined })
        if (imagem.length <= this.props.limiteImagem)
          this.setState({msgErro: undefined, imagem, miniatura})
        else
          this.setState({
            imagem: undefined,
            miniatura: undefined,
            msgErro: `Tamanho da imagem maior que ${this.props.limiteImagem}`
          })
      })
      .catch(erro => {
        this.setState({msgErro: erro.message, msgModal: undefined})
      })
  }

  cadastre = () => {
    if (this.state.imagem !== undefined && this.state.miniatura !== undefined){
      const vulcao: VulcaoParaCadastro = {
        imagem : this.state.imagem,
        miniatura: this.state.miniatura,
        nome: this.state.nome,
        pais: this.state.pais
      }
      cadastraVulcao(vulcao, this.props.token)
        .then(() => this.setState({
          imagem: undefined,
          miniatura: undefined,
          nome: '', pais: '', url: '',
          cadastrando: false, msgModal: undefined
        }))
        .catch(() => {
          this.setState({
            imagem: undefined, miniatura: undefined,
            nome: '', pais: '', url: '',
            cadastrando: false, msgModal: undefined
          })
          this.props.onTokenInvalido()
        })
      this.setState({
        cadastrando: true, msgErro: undefined,
        msgModal: 'Cadastrando...'
      })
    }
  }

  render() {
    return (
      <div className='message is-primary'>
        <div className='message-header'>Cadastrar Vulcão</div>
        <div className='message-body'>
          <div className='field'>
            <label className='label'>Imagem de Arquivo Local</label>
            <div className='control'>
              <input type='file'
                ref={this.arquivo}
                onChange={this.arquivoDefinido}
                style={{display: 'none'}}
              />
              <button className='button is-info' onClick={this.escolhaArquivo}>
                     Arquivo...
              </button>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Imagem de URL</label>
            <div className='control'>
              <input className='input'
                type='text' value={this.state.url}
                placeholder='URL da imagem'
                onChange={this.urlDefinida}/>
              <button className='button is-info'
                onClick={this.leiaImagemDeURL}>
                    Obter
              </button>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Imagem</label>
            <div className='control'>
              <img src={this.state.imagem}/>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Nome</label>
            <div className='control'>
              <input className='input' type='text'
                placeholder='nome do vulcão'
                value={this.state.nome}
                onChange={this.nomeDefinido}/>
            </div>
          </div>
          <div className='field'>
            <label className='label'>País</label>
            <div className='control'>
              <input className='input' type='text'
                placeholder='país do vulcão'
                value={this.state.pais}
                onChange={this.paisDefinido}/>
            </div>
          </div>

          <button className='button is-success'
            onClick={this.cadastre}
            disabled={!this.podeCadastrar()} >
                  Cadastrar
          </button>
          <MsgModal msg= {this.state.msgModal}/>
          {
            this.state.msgErro !== undefined &&
            <div className='notification is-danger'>
              {this.state.msgErro}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default CadastraVulcao
