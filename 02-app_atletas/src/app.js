import https from 'https'
import fs from 'fs'
import path from 'path'

import express from 'express'
import {dados} from './dados'
import {consultaInicial, consultaPesquisaPorAltura} from './controle'

const porta = 3000
const msgNoAr = `Servidor no ar, porta ${porta}`
const opcoes = {
  key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem'))
}

const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => consultaInicial(res, dados))

app.get('/pesquisePorAltura', (req, res) => consultaPesquisaPorAltura(req, res, dados))

const server = https.createServer(opcoes, app)

server.listen(porta, () => console.log(msgNoAr))
