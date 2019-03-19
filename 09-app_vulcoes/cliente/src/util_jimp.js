// @flow
// funções de manipulação de imagem via lib jimp

import Jimp from 'jimp'
import type {ImagemEmBase64, ImagemEmURL} from './tipos'

async function processaImagem(fonteDaImagem: ImagemEmBase64 | ImagemEmURL) {
  try {
    const imagemOriginal = await Jimp.read(fonteDaImagem)
    let imagem = await imagemOriginal.resize(Jimp.AUTO, 500)
    let miniatura = await imagem.clone().resize(Jimp.AUTO, 70).getBase64Async(Jimp.AUTO)
    imagem = await imagem.getBase64Async(Jimp.AUTO)
    return  { imagem, miniatura }
  }
  catch (erro) {
    throw new Error('Erro: URL não é imagem ou site não autoriza download.')
  }
}

export default processaImagem
