// @flow
import jwt from 'jsonwebtoken'
import type {Token, TokenDecodificado} from './tipos'

const SENHA = process.env.SENHA_JWT
const DURACAO_TOKEN = process.env.DURACAO_TOKEN

function geraToken (login: string): Token {
  return jwt.sign({ login }, SENHA, { expiresIn: DURACAO_TOKEN })
}

function validaToken (token: Token): TokenDecodificado | null {
  try {
    const dados = jwt.verify(token, SENHA)
    return dados
  } catch (e) {
    return null
  }
}

export { geraToken, validaToken }
