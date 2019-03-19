const firebaseConfig = {
  apiKey: "AIzaSyBHRpB_fP47c5lrvSJhi1Hb80FNKiZjS3E",
  authDomain: "ine5646-app-usuarios.firebaseapp.com",
  databaseURL: "https://ine5646-app-usuarios.firebaseio.com",
  projectId: "ine5646-app-usuarios",
  storageBucket: "",
  messagingSenderId: "652188769943"
}

export function msgErroSignInWithEmailAndPassword (codigo) {
  switch (codigo) {
    case 'auth/invalid-email' :
      return 'E-mail inválido'
    case 'auth/user-disabled' :
      return 'E-mail desabilitado'
    case 'auth/user-not-found' :
      return 'Não há usuário cadastrado com esse e-mail'
    case 'auth/wrong-password' :
      return 'Senha inválida ou não definida'
    default :
      return 'Não foi possível fazer login'
  }
}

export default firebaseConfig
