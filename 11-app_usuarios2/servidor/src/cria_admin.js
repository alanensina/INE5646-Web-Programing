/* eslint-disable no-console */
/*
  Script que cria usuário com papel de administrador.
*/

import * as admin from 'firebase-admin'

import fs from 'fs'
import path from 'path'

const arquivoAdminSDK = 'firebase-adminsdk.json'
const caminho = path.join(__dirname, '..', arquivoAdminSDK)
const serviceAccount = JSON.parse(fs.readFileSync(caminho))

const arquivoFirebaseConfig = 'firebase-config.json'
const caminhoFirebaseConfig = path.join(__dirname, '..', arquivoFirebaseConfig)
const firebaseConfig = JSON.parse(fs.readFileSync(caminhoFirebaseConfig))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const adminEmail = process.argv[2]

if (adminEmail === undefined) {
  console.log('Passar como argumento o e-mail do administrador')
} else {
  admin.auth().getUserByEmail(adminEmail)
    .then(usuario => {
      const claimsAtuais = usuario.customClaims === undefined ? {} : usuario.customClaims
      for (const c in claimsAtuais) {
        console.log(`${c} : ${claimsAtuais[c]}`)
      }

      if (claimsAtuais.papeis === undefined) {
        claimsAtuais['papeis'] = ['admin']
      } else {
        if (!claimsAtuais.papeis.includes('admin')) {
          claimsAtuais['papeis'].push('admin')
        }
      }
      return admin.auth().setCustomUserClaims(usuario.uid, claimsAtuais)
    })
    .then(() => {
      console.log(`Usuário ${adminEmail} agora é administrador.`)
      process.exit(0)
    })
    .catch(erro => {
      console.log(erro.message)
      process.exit(1)
    })
}
