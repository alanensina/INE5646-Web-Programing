import {validaIdToken, obtemUsuarios, firebaseConfig} from './fbadmin'

export function processaConsulta (consulta, req) {
  const {idToken} = JSON.parse(req.query.dados)
  return validaIdToken(idToken)
    .then(idTokenDecodificado => {
      switch (consulta) {
      case 'PesquisaPapeisPossiveis':
        return cstPesquisaPapeisPossiveis()
      case 'PesquisaUsuarios':
        return cstPesquisaUsuarios(idTokenDecodificado)
      case 'PesquisaFirebaseConfig':
        return cstPesquisaFirebaseConfig()
      default:
        throw new Error(`Consulta ${consulta} desconhecida`)
      }
    })
    .catch(erro => {
      return ({ok: false, msg: erro.message})
    })
}

// Melhor seria se papéis viessem de um banco de dados
function cstPesquisaPapeisPossiveis () {
  return {ok: true, papeis: ['aluno', 'professor']}
}

function cstPesquisaFirebaseConfig() {
  return {ok: true, firebaseConfig}
}

function cstPesquisaUsuarios (idTokenDecodificado) {
  return obtemUsuarios(idTokenDecodificado)
    .then(usuarios => ({ok: true, usuarios}))
}
