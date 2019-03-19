const servicos = {
  conecta: () =>
    fetch('/conecta')
      .then(r => analisaStatusCode(r))
      .then(r => r.json())
      .then(json => {
        if (json.conectou)
          return Promise.resolve(true)
        else
          return Promise.reject(false)
      })
  ,
  desconecta: () =>
    fetch('/desconecta')
      .then(r => analisaStatusCode(r))
      .then(() => Promise.resolve(true))
  ,
  cadastre: (dados) => {
    const promResposta =
      fetch('/salva', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dados)
      })

    return promResposta
      .then(r => analisaStatusCode(r))
      .then(r => r.json())
  }
  ,
  pesquiseTodos: () => {
    return fetch('/pesquisaTodos')
      .then(r => analisaStatusCode(r))
      .then(r => r.json())
  }
  ,
  pesquisePorId: (id) => {
    return fetch(`/pesquisaPorId?id=${id}`)
      .then(r => analisaStatusCode(r))
      .then(r => r.json())
  }
  ,
  pesquisePorTitulo: (titulo) => {
    return fetch(`/pesquisaPorTitulo?titulo=${titulo}`)
      .then(r => analisaStatusCode(r))
      .then(r => r.json())
  }
}

function analisaStatusCode(resposta) {
  if (resposta.status === 200)
    return Promise.resolve(resposta)
  else
    return Promise.reject(false)
}

export default servicos
