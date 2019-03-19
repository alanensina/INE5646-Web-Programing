// modelo.js

/**
 * Classe que representa uma pessoa.
 */
class Pessoa {
  constructor (nome, idade) {
    this.__nome = nome
    this.__idade = idade
  }

  get idade () {
    return this.__idade
  }

  get nome () {
    return this.__nome
  }
}

/**
 * Seleciona as pessoas cuja idade é maior que a idadeLimite.
 * @param [Pessoa] pessoas
 * @param number idadeLimite
 * @returns [Pessoa]
 */
function selecionaPessoas (pessoas, idadeMinima) {
  
  var pessoas2 = []
  
  pessoas.forEach(element => {
    if(element.idade > idadeMinima){
      pessoas2.push(element)
    }
  });
  
  return pessoas2
}

// Dados fictícios
const pessoas =
  [ new Pessoa('Marcolino da Silva', 45),
    new Pessoa('Tribulino Garrteto', 25),
    new Pessoa('Burico do Pino Solto', 35),
    new Pessoa('Marildo De Lusoneta', 29)
  ]

const idadeMinima = 30

export {pessoas, idadeMinima, Pessoa, selecionaPessoas}
