//@flow

export type Comando = 
      '/CmdEnviePedido' 
    | '/CmdBusquePedidosProcessados'

export type Solicitacao = {| email: string |}

type Produto = {| 
    nome: string, 
    quantidade: number
|}

export type Pedido = {|
    id: string,
    email: string,
    produtos: Array<Produto>
|}