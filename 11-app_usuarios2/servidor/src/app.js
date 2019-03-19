import https from 'https'
import fs from 'fs'
import { PORTA } from './env'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import {processaComando} from './processadorDeComando'
import {processaConsulta} from './processadorDeConsulta'

const opcoes = {
  key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem'))
}

const app = express()
app.use(bodyParser.json())
app.use(express.static('publico'))

app.post('/comando/:cmd', (req, res) => {
  processaComando(req.params.cmd, req)
    .then(resultado => res.json(resultado))
})

app.get('/consulta/:cst', (req, res) => {
  processaConsulta(req.params.cst, req)
    .then(resultado => res.json(resultado))
})

const server = https.createServer(opcoes, app)

// eslint-disable-next-line no-console
server.listen(PORTA, () => console.log(`Servidor no ar na porta ${PORTA}...`))
