### UFSC - CTC - INE - INE5646 Programação para Web

# Exercício App Vulcões
A aplicação permite que o usuário cadastre e visualize imagens sobre vulcões. As imagens são armazenadas em um banco de dados MongoDB.

## Objetivo do Exercício
No lado front-end, mostrar como obter imagens armazenadas no dispositivo (computador ou celular) e também o gerenciamento de usuários via JWT. No lado back-end, mostrar como ler e armazenar imagens em um banco de dados MongoDB.

Outro objetivo, válido tanto para o lado front-end quanto para o back-end, é mostrar como a ferramenta [Flow](https://flow.org/) pode auxiliar na qualidade do software por meio do uso e criação de tipos (para variáveis, classes e funções) que são analisados em tempo de compilação. É uma solução alternativa ao [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html), que verifica os tipos em tempo de execução, e também à linguagem de programação [TypeScript](https://www.typescriptlang.org/). O Flow, conceitualmente, é semelhante a TypeScript.

## Sua Tarefa

O código fonte da aplicação está completo (faltando apenas definir o arquivo .env, conforme instruções abaixo). Sua tarefa consiste em colocar a aplicação no ar e compreender como a ferramenta Flow melhora a qualidade do código.

## Instruções
Depois de baixar/clonar o repositório, entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados no lado cliente da aplicação.

Repita o comando no diretório **servidor** para instalar os pacotes JavaScript utilizados no lado servidor da aplicação.

No mesmo diretório **servidor**, crie o arquivo **.env** e adicione o seguinte conteúdo:

```
PORTA=3000

BD_URL=mongodb://...

SENHA_JWT='os grandes dias da senha secreta'

DURACAO_TOKEN='3h'

LIMITE_IMAGEM=3072000
```
Para a base de dados (variável BD_URL), como sugestão, acesse https://mlab.com/  e crie sua base de dados. A variável LIMITE_IMAGEM determina qual o tamanho máximo (em bytes) da imagem que pode ser lida.


A aplicação utiliza tokens no formato JWT (JSON Web Token) gerados pela
biblioteca *jsonwebtoken*. A documentação desta biblioteca está disponível em
https://github.com/auth0/node-jsonwebtoken#readme

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
