import * as admin from 'firebase-admin'

import fs from 'fs'
import path from 'path'

const arquivoAdminSDK = 'firebase-adminsdk.json'
const caminhoAdminSDK = path.join(__dirname, '..', arquivoAdminSDK)
const serviceAccount = JSON.parse(fs.readFileSync(caminhoAdminSDK))

const arquivoFirebaseConfig = 'firebase-config.json'
const caminhoFirebaseConfig = path.join(__dirname, '..', arquivoFirebaseConfig)
export const firebaseConfig = JSON.parse(fs.readFileSync(caminhoFirebaseConfig))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

// idToken --> Promise[admin.auth.DecodedIdToken]
export async function validaIdToken (idToken) {
  try {
    const tokenDecodificado = await admin.auth().verifyIdToken(idToken, true)
    return tokenDecodificado
  } catch (erro) {
    return new Error('idToken inválido')
  }
}

export async function obtemUsuarios (idTokenDecodificado) {
  try {
    if (idTokenDecodificado.papeis.includes('admin')) {
      const listUsersResult = await admin.auth().listUsers(500)
      return listUsersResult.users.map(u => {
        const papeis = u.customClaims === undefined ? [] : u.customClaims.papeis
        return {email: u.email, papeis}
      })
    }
    throw new Error('Usuário não tem permissão')
  } catch (e) {
    throw e
  }
}

export async function cadastraUsuario (idTokenDecodificado, dados) {
  try {
    if (idTokenDecodificado.papeis.includes('admin')) {
      const {email, papeis} = dados
      const userRecord = await admin.auth().createUser({email})
      await admin.auth().setCustomUserClaims(userRecord.uid, {papeis})
      return true
    }
    throw new Error('Usuário não tem permissão')
  } catch (e) {
    throw e
  }
}
