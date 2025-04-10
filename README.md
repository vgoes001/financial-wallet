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

Para executar as migrations, acesso o container do app e execute o comando:

```shell
npx sequelize db:migrate
```

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
