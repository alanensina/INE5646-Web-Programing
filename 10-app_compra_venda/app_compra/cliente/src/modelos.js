
/**
  Este arquivo define o modelo de dados existente no domínio da aplicação.
*/
class Produto {
  static fromJSON(p) {
    return new Produto(p.nome, p.quantidade)
  }
  
  constructor(nome, quantidade) {
    this.nome = nome
    this.quantidade = quantidade
  }
}
  
class ProdutoProcessado {
  static fromJSON(pp) {
    return new ProdutoProcessado(pp.produto, pp.precoUnitario)
  }
  
  static fromProduto(produto) {
    return new ProdutoProcessado(produto, 0.0)
  }
  
  constructor(produto, precoUnitario) {
    this.produto = produto
    this.precoUnitario = precoUnitario
  }
  
  custo() {
    let custo = this.produto.quantidade * this.precoUnitario
    let custoTruncado = custo.toFixed(2) // trunca arredondando em 2 casas decimais
    return parseFloat(custoTruncado)
  }
}
  
class Pedido {
  static fromJSON(pedido) {
    const produtos = pedido.produtos.map(produto => Produto.fromJSON(produto))
    return new Pedido(pedido.id, pedido.email, produtos)
  }
  
  constructor(id, email, produtos) {
    this.id = id
    this.email = email
    this.produtos = produtos
  }
  
  adicioneProduto(novoProduto) {
    const prodExistente =
        this.produtos.find(prod => prod.nome === novoProduto.nome)
    if (prodExistente !== undefined) return false
    this.produtos = this.produtos.concat(novoProduto)
    return true
  }
  
  getProdutoPorNome(nome) {
    const produto = this.produtos.find(prod => prod.nome === nome)
    return produto === undefined ? null : produto
  }
  
  removaProdutoPorNome(nome) {
    this.produtos =
        this.produtos.filter(prod => prod.nome !== nome)
  }

  estaPreenchido() {
    return this.id !== '' && this.email !== '' && this.produtos.length > 0
  }
}
  
  
  
class PedidoProcessado {
  static fromJSON(pedidoProcessado) {
    const produtosProcessados = pedidoProcessado
      .produtosProcessados
      .map(prodProcessado => ProdutoProcessado.fromJSON(prodProcessado))
    return new PedidoProcessado(pedidoProcessado.id, pedidoProcessado.email, produtosProcessados)
  }
  
  static fromPedido(pedido) {
    const produtosProcessados =
        pedido.produtos.map(prod => ProdutoProcessado.fromProduto(prod))
    return new PedidoProcessado(pedido.id, pedido.email, produtosProcessados)
  }
  
  
  constructor(id, email, produtosProcessados) {
    this.id = id
    this.email = email
    this.produtosProcessados = produtosProcessados
  }
  
  adicioneProdutoProcessado(novoProdutoProcessado) {
    const ppExistente =
        this.produtosProcessados
          .find(prodProc =>
            prodProc.produto.nome === novoProdutoProcessado.produto.nome)
  
    if (ppExistente !== undefined) return false
    this.produtosProcessados = this.produtosProcessados.concat(novoProdutoProcessado)
    return true
  }
  
  getProdutoProcessadoPorNome(nome) {
    const pp = this.produtosProcessados.find(pp => pp.produto.nome === nome)
    return pp === undefined ? null : pp
  }
  
  custo() {
    const custo = this.produtosProcessados
      .reduce((somaAtual, produtoProcessado) =>
        somaAtual + produtoProcessado.custo(), 0)
    const custoTruncado = custo.toFixed(2)
    return parseFloat(custoTruncado)
  }
}
  
export { Produto, Pedido, ProdutoProcessado, PedidoProcessado }
  