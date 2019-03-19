import https from 'https'
import fs from 'fs'
import path from 'path'

import {atendeRequisicao} from './controle'

const opcoes = {
  key: fs.readFileSync(path.join(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem'))
}
const porta = 3000
const msgNoAr = `Servidor no ar escutando na porta ${porta}...`
const servidor = https.createServer(opcoes, (req, res) => atendeRequisicao(res))

servidor.listen(porta, () => console.log(msgNoAr))
