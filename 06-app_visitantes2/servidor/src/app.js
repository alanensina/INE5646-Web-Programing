import https from 'https'
import fs from 'fs'
import path from 'path'

import express from 'express'

const opcoes = {
  key: fs.readFileSync(path.resolve(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'))
}

const PORTA = 3000
const app = express()
app.use(express.static(path.resolve(__dirname, '../publico')))

app.get('/dados', (req, res) => {
  const dados = {
    meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
    visitantes: [23, 34, 12, 28, 36, 19, 16, 27]
  }
  res.json(dados)
})

const server = https.createServer(opcoes, app)

// eslint-disable-next-line no-console
server.listen(PORTA, () => console.log(`No ar, HTTPS porta ${PORTA}`))
