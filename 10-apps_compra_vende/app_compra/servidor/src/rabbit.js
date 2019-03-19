import amqp from 'amqplib'
import { URL_RABBIT } from './env'
const URL = URL_RABBIT
const FILA_DE_PEDIDOS = 'pedidos'

// Estabelece conexão com sevidor Rabbit hospedado em URL.
// A conexão fica ativa enquanto o servidor estiver no ar.
let conexao

amqp.connect(URL)
  .then(conn => {
    conexao = conn
    process.on('exit', () => {
      console.log('Aviso: Encerrando conexão com Rabbit...')
      if (conexao) conexao.close()
    })

    // Ctl-C interrompe a execução do node
    process.on('SIGINT', () => {
      process.exit(1)
    })
  })
  .catch(() => {
    console.warn('Aviso: não conseguiu conexão com Rabbit')
  })

export async function enviaPedido (pedido) {
  return enviaMsgParaFila(URL, FILA_DE_PEDIDOS, JSON.stringify(pedido))
}

export async function obtemPedidosProcessados (solicitacao) {
  try {
    const pedidosProcessados = await obtemObjsDaFila(URL, solicitacao.email)
    return { ok: true, pedidosProcessados }
  } catch (erro) {
    return { ok: false, message: erro.message }
  }
}

async function enviaMsgParaFila (url, fila, msg) {
  if (url === undefined) throw new Error('CLOUDAMQP_URL não definida')
  if (conexao === undefined) throw new Error('Sem conexão com Rabbit')

  let ch
  try {
    ch = await conexao.createChannel()
    await ch.assertQueue(fila, { durable: false })
    ch.sendToQueue(fila, Buffer.from(msg))
  } catch (erro) {
    throw erro
  } finally {
    if (ch !== undefined) { await ch.close() }
  }
}

// retorna array de objetos que estão na fila
async function obtemObjsDaFila (url, fila) {
  if (url === undefined) throw new Error('CLOUDAMQP_URL não definida')
  if (conexao === undefined) throw new Error('Sem conexão com Rabbit')

  let ch
  try {
    let objetos = []
    const consomeMsg = (msg) => {
      const ob = JSON.parse(msg.content.toString('utf-8'))
      objetos.push(ob)
    }

    ch = await conexao.createChannel()
    await ch.assertQueue(fila, { durable: false })
    await ch.consume(fila, consomeMsg, { noAck: true })
    return objetos
  } catch (erro) {
    throw erro
  } finally {
    if (ch !== undefined) { await ch.close() }
  }
}
