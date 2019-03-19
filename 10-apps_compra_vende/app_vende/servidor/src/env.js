import dotenv from 'dotenv'

dotenv.config()

let todasDefinidas = true

if (process.env.PORTA === undefined) {
  console.log('Falta definir variável PORTA no arquivo .env')
  todasDefinidas = false
}

if (process.env.URL_RABBIT === undefined) {
  console.log('Falta definir variável URL_RABBIT no arquivo .env')
  todasDefinidas = false
}

if (!todasDefinidas) {
  process.exit(1)
}

export const PORTA = parseInt(process.env.PORTA)
export const URL_RABBIT = process.env.URL_RABBIT
