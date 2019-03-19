// @flow
import './env'

import https from 'https'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import {
  leiaUsuario, cadastreUsuario,
  cadastreVulcao, leiaVulcoes,
  apagueVulcao, leImagemDeVulcaoPorId, temConexaoComBanco }
  from './persistencia'

import type { Consulta, Comando } from './tipos'

import { geraToken, validaToken } from './jwt_util'

const PORTA = parseInt(process.env.PORTA, 10)
const opcoes = {
  key: fs.readFileSync(path.resolve(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'))
}

const app = express()

app.use(bodyParser.json({ limit: process.env.LIMITE_IMAGEM }))
app.use(helmet())

app.use(express.static(path.resolve(__dirname, '../publico')))

app.get(('/qryTemConexaoComBanco': Consulta), (req, res) => {
  res.json(temConexaoComBanco())
})

app.post(('/cmdFacaLogin': Comando), (req, res) => {
  const { login, senha } = req.body
  leiaUsuario(login)
    .then(usuario => {
      if (usuario !== null && usuario.senha === senha) {
        res.json({ ok: true, token: geraToken(login) })
      } else {
        res.json({ ok: false, message: 'login e/ou senha inválidos' })
      }
    })
    .catch(erro => {
      res.json({ ok: false, message: erro.message })
    })
})

app.post(('/cmdFacaCadastro': Comando), (req, res) => {
  const { login, senha } = req.body
  cadastreUsuario(login, senha)
    .then(resultado => {
      if (resultado) {
        res.json({ ok: true, token: geraToken(login) })
      } else {
        res.json({ ok: false, message: 'Login já cadastrado' })
      }
    })
    .catch(erro => {
      res.json({ ok: false, message: erro.message })
    })
})

app.post(('/cmdCadastreVulcao': Comando), (req, res) => {
  const { vulcao, token } = req.body
  const dadosToken = validaToken(token)
  if (dadosToken !== null) {
    cadastreVulcao(dadosToken.login, vulcao)
      .then(idRegistrado => {
        res.json({ ok: true, idRegistrado })
      })
      .catch(erro => {
        res.json({ ok: false, message: erro.message })
      })
  } else {
    res.json({ ok: false, message: 'token inválido' })
  }
})

app.delete(('/cmdApagueVulcao': Comando), (req, res) => {
  const { idVulcao, token } = req.body
  const dadosToken = validaToken(token)
  if (dadosToken !== null) {
    apagueVulcao(idVulcao)
      .then(() => {
        res.json({ ok: true })
      })
      .catch(erro => {
        res.json({ ok: false, message: erro.message })
      })
  } else {
    res.json({ ok: false, message: 'token inválido' })
  }
})

app.get(('/qryLeiaVulcoes': Consulta), (req, res) => {
  const { token } = JSON.parse(req.query.dados)
  const dadosToken = validaToken(token)
  if (dadosToken !== null) {
    leiaVulcoes(dadosToken.login)
      .then(vulcoes => {
        res.json({ ok: true, vulcoes })
      })
      .catch(erro => {
        res.json({ ok: false, message: erro.message })
      })
  } else {
    res.json({ ok: false, message: 'token inválido' })
  }
})

app.get(('/qryLeiaImagemVulcao': Consulta), (req, res) => {
  const { token, idVulcao } = JSON.parse(req.query.dados)
  const dadosToken = validaToken(token)
  if (dadosToken !== null) {
    leImagemDeVulcaoPorId(idVulcao)
      .then(imagem => {
        res.json({ ok: true, imagem })
      })
      .catch(erro => {
        res.json({ ok: false, message: erro.message })
      })
  } else {
    res.json({ ok: false, message: 'token inválido' })
  }
})

app.get(('/qryLeiaLimiteImagem': Consulta), (req, res) => {
  res.json({ ok: true, limiteImagem: parseInt(process.env.LIMITE_IMAGEM, 10) })
})

const server = https.createServer(opcoes, app)

// eslint-disable-next-line no-console
server.listen(PORTA, () => console.log(`Servidor no ar na porta ${PORTA}...`))
