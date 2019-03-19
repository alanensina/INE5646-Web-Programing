import {validaIdToken, cadastraUsuario} from './fbadmin'
import {registraEvento} from './registradorDeEvento'

export function processaComando (comando, req) {
  const {idToken} = req.body
  return validaIdToken(idToken)
    .then(idTokenDecodificado => {
      switch (comando) {
      case 'RegistrarLogin':
        return cmdRegistrarLogin(idTokenDecodificado.uid)
      case 'RegistrarLogout':
        return cmdRegistrarLogout(idTokenDecodificado.uid)
      case 'CadastrarUsuario':
        return cmdCadastrarUsuario(idTokenDecodificado, req.body)
      default:
        return {ok: false, msg: `Comando ${comando} desconhecido`}
      }
    })
    .catch(erro => {
      return {ok: false, msg: erro.message}
    })
}

function cmdCadastrarUsuario (idTokenDecodificado, dados) {
  return cadastraUsuario(idTokenDecodificado, dados)
    .then(() => {
      const evento = {
        ev: 'UsuarioCadastrado',
        email: dados.email,
        papeis: dados.papeis,
        uid: idTokenDecodificado.uid}

      registraEvento(evento)
      return {ok: true}
    })
    .catch(erro => ({ok: false, msg: erro.message}))
}

function cmdRegistrarLogin (uid) {
  registraEvento({ev: 'LoginRegistrado', uid})
  return {ok: true}
}

function cmdRegistrarLogout (uid) {
  registraEvento({ev: 'LogoutRegistrado', uid})
  return {ok: true}
}
