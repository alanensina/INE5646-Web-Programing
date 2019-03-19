### UFSC - CTC - INE - INE5646 Programação para Web

# Exercício App Compra_Vende
Este exercício explora a situação onde duas aplicações para web independentes precisam trocar dados. E, por serem independentes, não há nenhuma garantia que ambas estejam funcionando no momento da troca de dados. No exercício as aplicações trocam dados por meio de uma **fila de mensagens**. Ambas enviam e consomem mensagens usando o software [RabbitMQ](https://www.rabbitmq.com/), que implementa o protolo **Advanced Message Queuing Protocol** [AMQP](https://www.amqp.org/).

A aplicação **app compra** permite que o usuário registre o desejo de comprar produtos diversos (ele informa os produtos desejados e suas respectivas quantidades). A aplicação **app venda** permite que o usuário saiba quais são os produtos desejados e estabeleça um preço. O usuário da primeira aplicação pode então saber quanto custará cada pedido feito.

## Objetivo do Exercício
O objetivo do exercício é colocar as duas aplicações no ar. O código fonte de ambas está completo faltando apenas configurar o endereço da fila de mensagens que é compartilhada pelas aplicações. Para isso você deverá criar uma conta em [CloudAMQP](https://www.cloudamqp.com/) e criar uma fila.

## Instruções
Depois de baixar/clonar o repositório, haverá dois diretórios: **app_compra** para a aplicação de compra de produtos e a **app_vende** para a venda de produtos. Para cada uma das aplicações, siga as seguintes instruções.

Entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados no lado cliente da aplicação.

Repita o comando no diretório **servidor** para instalar os pacotes JavaScript utilizados no lado servidor da aplicação.

No mesmo diretório **servidor**, crie o arquivo **.env** e adicione o seguinte conteúdo:

```
PORTA=3000

URL_RABBIT=amqp://...@lion.rmq.cloudamqp.com/...
```
O valor da URL acima é definido pelo serviço oferecido pelo **CloudAMQP**. 

Obs: naturalmente, ambas as aplicações compartilham o mesmo valor de URL_RABBIT. Quanto ao valor da PORTA, se ambas forem executadas no mesmo computador, cada aplicação deve usar uma porta própria.

### Durante o Desenvolvimento
Durante o desenvolvimento da aplicação digite o comando

`npm start`

tanto no diretório **cliente** como no diretório **servidor**. Utilize a aplicação acessando https://localhost:3000 (ou a prota definida)

Coloque as duas aplicações no ar e faça ambos os papéis (usuário que quer comprar produtos e usuário que quer vender produtos).

### Em Produção
Quando a aplicação estiver pronta, digite o comando

`npm run build`

tanto no diretório **cliente** como no diretório **servidor**.

Em seguida, para colocar a aplicação no ar, entre no diretório **servidor** e digite

`node build\app.js`


