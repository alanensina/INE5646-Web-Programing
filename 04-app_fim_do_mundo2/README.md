### UFSC - CTC - INE - INE5646 Programação para Web
# Exercício App Fim do Mundo 2

A aplicação mostra dados sobre asteróides que passarão pela Terra em uma determinada data (informada pelo usuário). Os dados são obtidos diretamente da Nasa.


## Objetivo do Exercício
Mostrar uma aplicação do tipo SPA (*Single Page Application*) que utiliza a bilioteca [React](https://reactjs.org/) e o framework CSS [Bulma](https://bulma.io/) para o desenvolvimento do lado cliente. A aplicação também utiliza o agregador [webpack](https://webpack.js.org/) para gerar o arquivo JavaScript que é executado pelo browser. 

A aplicação também tem o objetivo de mostrar como acessar e consumir dados de um webservice.

## Sua Tarefa
O código está incompleto. A aplicação não acessa o webservice da Nasa pois a chave (API key) não foi buscada no
servidor. Veja no arquivo *cliente/src/App.jsx*.

## Instruções
Depois de baixar/clonar o respositório, entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados pelo lado cliente da aplicação.

Repita o comando acima dentro do diretório **servidor** para instalar os pacotes JavaScript utilizados pelo lado servidor da aplicação.

No mesmo diretório **servidor**,  crie o arquivo **.env** e adicione o seguinte conteúdo

```
PORTA=3000
NASA_API_KEY='.......'
```
O valor do atributo *NASA_API_KEY* é obtido no endereço https://api.nasa.gov/index.html#apply-for-an-api-key Isso permitirá que sua aplicação acesse o webservice da Nasa.

### Durante o desenvolvimento
O desenvolvimento da aplicação envolve duas frentes de trabalho: a programação necessária para o lado cliente e a programação necessária para o lado servidor.

#### Lado Cliente
Para iniciar o desenvolvimento do lado cliente entre no diretório **cliente** e digite

`npm start`

Cada vez que um arquivo no lado cliente for alterado o webpack será acionado para gerar uma nova versão do arquivo bundle.js.

#### Lado Servidor
Para iniciar o desenvolvimento do lado servidor entre no diretório **servidor** e digite

`npm start`

A partir de então a aplicação estará disponível na porta 3000 (ou na porta que você definiu no arquivo **.env**). Para acessar, use o navegador e digite o endereço https://localhost:3000 

Sempre que um arquivo for salvo a aplicação irá reiniciar automaticamente (graças ao pacote **nodemon**).


### Em produção

Depois que o código da aplicação está pronto é preciso gerar as versões otimizadas (em termos de tamanho e velocidade de execução) dos arquivos do lado cliente e do lado servidor.

#### Lado Cliente

Para gerar a versão em produção do lado cliente entre no diretório **cliente** e digite

`npm run build`

Observe que o tamanho do arquivo *bundle.js* diminui drasticamente de tamanho.

#### Lado Servidor

Para gerar a versão em produção do lado servidor entre no diretório **servidor** e digite

`npm run build`

## Executando a aplicação em produção
Para executar a aplicação em modo produção entre no diretório **servidor** e digite

`node build\app.js`
