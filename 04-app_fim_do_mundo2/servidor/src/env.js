/* eslint-disable no-console */
// verifica se todas as variáveis de ambiente estão definidas
import path from 'path'
import dotenv from 'dotenv'

const arquivoPontoEnv = path.join(__dirname, '../.env')
dotenv.config({ path: arquivoPontoEnv })

let comErro = false

if (process.env.PORTA === undefined) {
  console.log('Variável PORTA não definida!. Defina no arquivo servidor/.env')
  console.log('Exemplo: PORTA=3000')
  comErro = true
}

if (process.env.NASA_API_KEY === undefined) {
  console.log('Variável NASA_API_KEY não definida! Defina no arquivo servidor/.env')
  console.log('Para obter uma chave acesse https://api.nasa.gov/index.html#apply-for-an-api-key')
  comErro = true
}

if (comErro) {
  process.exit(1)
}

const PORTA = parseInt(process.env.PORTA)
const NASA_API_KEY = process.env.NASA_API_KEY
export { PORTA, NASA_API_KEY }
