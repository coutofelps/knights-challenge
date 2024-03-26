# Desafio dos Cavaleiros

Este é o repositório para o Desafio dos Cavaleiros. Siga as instruções abaixo para configurar e executar o projeto.

## Configuração e Execução

1. Navegue até a pasta `/server`:

    ```
    cd server
    ```

2. Execute o seguinte comando para construir e iniciar os contêineres Docker:

    ```
    docker-compose up --build
    ```

    Isso iniciará o servidor e o banco de dados.

## Importar dados no banco de dados

1. Após iniciar os contêineres, você precisará importar os dados do arquivo `knights-challenge.knights.json` para o banco de dados. Certifique-se de que o servidor esteja em execução antes de prosseguir.

2. [Instruções para importar dados no banco de dados]

## Testes

Para testar as rotas da API, você pode usar a coleção Postman fornecida:

- Importe a coleção `Knight Challenge.postman_collection.json` no Postman.
- Certifique-se de que o servidor esteja em execução.
- Execute as solicitações fornecidas na coleção para testar a funcionalidade da API.

## Contribuição

Se desejar contribuir com este projeto, sinta-se à vontade para criar pull requests ou abrir issues. Esperamos suas contribuições!

