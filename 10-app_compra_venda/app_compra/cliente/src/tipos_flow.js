//@flow

export type Comando = 
      '/CmdEnviePedido' 
    | '/CmdBusquePedidosProcessados'

export type Solicitacao = {| email: string |}
