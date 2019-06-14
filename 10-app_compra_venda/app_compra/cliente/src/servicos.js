// @flow

import type { Comando } from './tipos_flow'
import {Pedido} from './modelos'

/**
  Envia pedido ao servidor e retorna Promise contendo resposta em
  formato JSON.
*/
export const enviaPedido = 
  (pedido: Pedido) => processaRequisicaoPOST(('/CmdEnviePedido': Comando), pedido)

/**
  Busca pedidos processados associados a email e retorna Promise contendo resposta em
  formato JSON.
*/
export const buscaPedidosProcessados =
  (email: string) => processaRequisicaoPOST(('/CmdBusquePedidosProcessados': Comando), {email})

// envia requisição POST e retorna Promise com a resposta JSON.
function processaRequisicaoPOST(url, dados) {
  const params = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(dados)
  }

  return fetch(url, params)
    .then(resposta => {
      if (!resposta.ok)
        throw new Error('Falha na comunicação com servidor')
      return resposta
    })
    .then(resposta => resposta.json())
}
