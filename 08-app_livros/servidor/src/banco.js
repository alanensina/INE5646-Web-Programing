import mongoose from 'mongoose'
import {MONGODB_LIVROS} from './env'

const livroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  paginas: Number
})

const Livro = mongoose.model('Livro', livroSchema)

function conecta (res) {
  mongoose.connect(MONGODB_LIVROS, {keepAlive: 200, useNewUrlParser: true}).then(
    () => res.json({conectou: true}),
    () => res.json({conectou: false})
  )
}

function desconecta (res) {
  mongoose.disconnect().then(
    () => res.json({desconectou: true}),
    () => res.json({desconectou: false})
  )
}

function salva (res, titulo, autor, paginas) {
  const livro = new Livro({ titulo, autor, paginas })
  livro.save().then(
    (livroSalvo) => res.json({salvou: true, id: livroSalvo._id}),
    () => res.json({salvou: false})
  )
}

function pesquisaPorId (res, id) {
  Livro.findById(id).then(
    (livro) => res.json(livro),
    () => res.json(null)
  )
}

function pesquisaTodos (res) {
  Livro.find().then(
    (livros) => res.json(livros),
    () => res.json([])
  )
}

function pesquisaPorTitulo (res, titulo) {
  Livro.find().where('titulo', new RegExp(titulo)).then(
    (livros) => res.json(livros),
    () => res.json([])
  )
}

function apagaTudo (res) {
  Livro.remove().then(
    () => res.json({removeu: true}),
    () => res.json({removeu: false})
  )
}

// Obs: Sempre retorna true, mesmo quando id não existe
function apagaPorId (res, id) {
  Livro.deleteOne({_id: id}).then(
    () => res.json({removeu: true}),
    () => res.json({removeu: false})
  )
}
export {conecta, desconecta, salva,
  pesquisaPorId, pesquisaTodos, pesquisaPorTitulo, apagaTudo, apagaPorId}
