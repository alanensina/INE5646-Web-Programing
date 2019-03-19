const urlEnviaPedido = '/enviaPedido'
const urlBuscaPedidosProcessados = '/buscaPedidosProcessados'

/**
  Envia pedido ao servidor e retorna Promise contendo resposta em
  formato JSON.
*/
const enviaPedido = pedido => processaRequisicaoPOST(urlEnviaPedido, pedido)

/**
  Busca pedidos processados associados a email e retorna Promise contendo resposta em
  formato JSON.
*/
const buscaPedidosProcessados =
  email => processaRequisicaoPOST(urlBuscaPedidosProcessados, {email})

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

export {enviaPedido, buscaPedidosProcessados}
