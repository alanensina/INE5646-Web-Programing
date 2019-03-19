### UFSC - CTC - INE - INE5646 Programação para Web

# Exercício App Livros
A aplicação permite que o usuário cadastre e pesquise livros (título, autor e número de páginas) que são armazenados em um banco de dados MongoDB.

## Objetivo do Exercício
No lado front-end, mostrar formas de uso da biblioteca [Material-UI](https://material-ui.com/). No lado back-end, mostrar o uso da biblioteca [Mongoose](https://mongoosejs.com/) para simplificar o acesso aos dados armazenados em uma base de dados MongoDB.

## Sua Tarefa
O usuário pode pesquisar livros cadastrados com base nos seguintes critérios: todos os livros; livro com determinado ID; livros com derminado título ou fragmento de título. Esta terceira forma, porém, está incompleta. Sua tarefa é completar o código que está faltando.

## Instruções
Depois de baixar/clonar o repositório, entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados no lado cliente da aplicação.

Repita o comando no diretório **servidor** para instalar os pacotes JavaScript utilizados no lado servidor da aplicação.

No mesmo diretório **servidor**, crie o arquivo **.env** e adicione o seguinte conteúdo:

```
PORTA=3000

MONGODB_LIVROS=mongodb://....
```
Para a base de dados, como sugestão, acesse https://mlab.com/  e crie sua base de dados.

### Durante o Desenvolvimento
Durante o desenvolvimento da aplicação digite o comando

`npm start`

tanto no diretório **cliente** como no diretório **servidor**. Utilize a aplicação acessando https://localhost:3000


### Em Produção
Quando a aplicação estiver pronta, digite o comando

`npm run build`

tanto no diretório **cliente** como no diretório **servidor**.

Em seguida, para colocar a aplicação no ar, entre no diretório **servidor** e digite

`node build\app.js`


