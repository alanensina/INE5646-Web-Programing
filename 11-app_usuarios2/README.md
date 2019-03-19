### UFSC - CTC - INE - INE5646 Programação para Web
# Exercício App Usuários 2

A aplicação permite o gerenciamento de usuários de uma aplicação usando o framework [Firebase](https://firebase.google.com/).


## Objetivo do Exercício
Mostrar como usar o Firebase para gerenciar usuários via Firebase.

## Instruções
Depois de baixar/clonar o respositório, entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados pelo lado cliente da aplicação.

Repita o comando acima dentro do diretório **servidor** para instalar os pacotes JavaScript utilizados pelo lado servidor da aplicação.

No mesmo diretório **servidor**,  crie o arquivo **.env** e adicione o seguinte conteúdo

```
PORTA=3000
```

Acesse o [console do Firebase](https://console.firebase.google.com) e crie um projeto. Depois você deve criar, **ao lado do arquivo .env**, os dois arquivos abaixo contendo as informações específicas do projeto criado:

Arquivo **firebase-adminsdk.json** (substitua os "..." pelos dados do seu projeto):

```
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```  

Arquivo **firebase-config.json** (substitua os "..." pelos dados do seu projeto):

```
{
  "apiKey": "...",
    "authDomain": "....firebaseapp.com",
    "databaseURL": "https://....firebaseio.com",
    "projectId": "...",
    "storageBucket": "",
    "messagingSenderId": "..."
}
```

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

Para cadastrar novos usuários é preciso que um usuário tenha o papel de administrador. Para isso cadastre um e-mail diretamente no console do Firebase e depois execute

`node build\cria_admin.js`