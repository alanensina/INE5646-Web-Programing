### UFSC - CTC - INE - INE5646 Programação para Web
# Exercício App Pessoas

A aplicação mostra na tela uma relação de todas as pessoas (nome e idade) cadastradas e uma segunda relação contendo apenas as pessoas cuja idade seja superior a uma idade limite.


## Objetivo do Exercício
Mostrar uma aplicação cuja página é gerada no lado servidor e que utiliza apenas módulos já existentes no Node.

## Sua Tarefa
O código atual possui um bug: não está selecionando as pessoas com idade superior a idade limite. Analise o arquivo **src/modelo.js** e veja porque isso está acontecento. Faça a correção necessária.

## Instruções
Depois de baixar/clonar o respositório, digite

`npm install`

para instalar os módulos JavaScript utilizados durante o desenvolvimento da aplicação.

### Durante o desenvolvimento
Digite

`npm start`

e a aplicação estará disponível na porta 3000.Para acessar, use o navegador e digite o endereço https://localhost:3000

Sempre que um arquivo for salvo a aplicação irá reiniciar automaticamente (graças ao pacote **nodemon**).

### Em produção
Para executar a aplicação em produção (melhor desempenho) digite

`npm run build`

e depois

`node build\app.js`

