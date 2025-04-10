# Encurtador de Urls

## Pontos importantes

API backend da carteira financeira.

É possível acessar a Docs através deste [link](http://localhost:3000/docs).

## Requisitos

- NodeJS >= 22.11
- NPM ou Yarn
- MySQL >= 8

## Preparando o ambiente

1. Iniciar o projeto em ambiente de desenvolvimento

```shell
docker compose up
```

2. Configurar variáveis de ambiente

Não é obrigatório a criação um arquivo `.env`, caso o arquivo não exista, será criado uma cópia do `env.example`. Informações sobre as variáveis estão descritas no item [Variáveis de Ambiente](#variáveis-de-ambiente)

3. Migrar as estruturas de dados

Neste passo é necessário seguir as instruções da [migração de estrutura do banco de dados](#migrando-as-estruturas)

## Iniciando a API

Para iniciar o servidor de desenvolvimento da api basta executar o comando

```shell
npm run start:dev
```

## Variáveis de Ambiente

| Variável    | Descrição                                                               | Obrigatório | Valor Padrão |
| ----------- | ----------------------------------------------------------------------- | ----------- | ------------ |
| JWT_SECRET  | Palavra utilizada para criptografar e descriptografar o json web token. | Sim         |              |
| DB_DIALECT  | Dialeto do banco de dados                                               | Sim         |              |
| DB_HOST     | Host do banco de dados                                                  | Sim         |              |
| DB_PORT     | Porta onde será executado o banco de dados                              | Sim         |              |
| DB_USER     | Nome do usuário login do banco de dados                                 | Sim         |              |
| DB_PASSWORD | Password do usuário para acesso ao banco de dados                       | Sim         |              |
| DB_DATABASE | Nome do banco de dados                                                  | Sim         |              |

## Bancos de Dados

O sistema usa o bancos de dados MySQL

A aplicação utiliza o [Sequelize](https://sequelize.org/) como ORM. Para que seja possível que a aplicação se comunique com os bancos de dados são necessários algumas configurações.

### Migrando as Estruturas

Por padrão já está sendo executado um script juntamente com o docker compose para lidar com a execução de migrações e criação do banco. Porém é possível executa-las manualmente através do comando:

```shell
npx sequelize db:migrate
```
