// @flow
import { PORTA } from './env'
import https from 'https'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { enviaPedido, obtemPedidosProcessados } from './rabbit'

import type { Comando, Solicitacao, Pedido } from './tipos_flow'


const opcoes = {
  key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem'))
}

const app = express()
app.use(bodyParser.json())
app.use(express.static('publico'))

app.post(('/CmdEnviePedido': Comando), (req, res) => {
  const pedido: Pedido = req.body
  enviaPedido(pedido)
    .then(() => res.json({ ok: true }))
    .catch(erro => res.json({ ok: false, message: erro.message }))
})

app.post(('/CmdBusquePedidosProcessados': Comando), (req, res) => {
  const sol: Solicitacao = req.body
  obtemPedidosProcessados(sol)
    .then(r => res.json(r))
    .catch(erro => res.json({ ok: false, message: erro.message }))
})

const server = https.createServer(opcoes, app)

// eslint-disable-next-line no-console
server.listen(PORTA, () => console.log(`Servidor no ar na porta ${PORTA}...`))
