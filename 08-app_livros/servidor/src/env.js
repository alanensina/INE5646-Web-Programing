/* eslint-disable no-console */
// verifica se todas as variáveis de ambiente estão definidas
import path from 'path'
import dotenv from 'dotenv'

const arquivoPontoEnv = path.resolve(__dirname, '../.env')
dotenv.config({path: arquivoPontoEnv})

let comErro = false

if (process.env.PORTA === undefined) {
  console.log('Variável PORTA não definida!. Defina no arquivo servidor/.env')
  console.log('Exemplo: PORTA=3000')
  comErro = true
}

if (process.env.MONGODB_LIVROS === undefined) {
  console.log('Variável MONGODB_LIVROS não definida! Defina no arquivo servidor/.env')
  console.log('Exemplo: MONGODB_LIVROS=mongodb://usuario45:senha@ds034892.mlab.com:34892/bd_livros')
  comErro = true
}

if (comErro)
  process.exit(1)

const PORTA = parseInt(process.env.PORTA, 10)
const MONGODB_LIVROS = process.env.MONGODB_LIVROS

export {PORTA, MONGODB_LIVROS}
