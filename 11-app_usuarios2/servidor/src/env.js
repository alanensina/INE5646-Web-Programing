import dotenv from 'dotenv'

dotenv.config()

if (process.env.PORTA === undefined) {
  // eslint-disable-next-line no-console
  console.log('O arquivo .env deve defir a variável PORTA')
  process.exit(1)
}

export const PORTA = parseInt(process.env.PORTA)