# PGATS-02-API

API Rest em JavaScript e Express para login, registro de usuário, consulta de usuários e transferência de valores.

## Estrutura de diretórios
- `src/model`: Modelos de dados em memória
- `src/service`: Regras de negócio
- `src/controller`: Controladores das rotas
- `src/app.js`: Configuração do Express e rotas
- `src/server.js`: Inicialização do servidor
- `swagger.json`: Documentação Swagger

## Endpoints
- `POST /register`: Registro de novo usuário
- `POST /login`: Login do usuário
- `GET /users`: Consulta de usuários (autenticado)
- `POST /favorecido`: Adiciona favorecido ao usuário logado (autenticado)
- `POST /transfer`: Transferência de valores entre usuários (autenticado)
- `GET /transfers`: Consulta de transferências do usuário (autenticado)
- `GET /api-docs`: Documentação Swagger

## Regras de negócio
1. Login e senha obrigatórios para logar
2. Não é permitido registrar usuários duplicados
3. Transferências para destinatários não favorecidos só podem ser realizadas se o valor for menor que R$ 5.000,00

## Como rodar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse `http://localhost:3000/api-docs` para visualizar a documentação Swagger

## Observações
- Os dados são armazenados em memória (não persistem após reiniciar o servidor)
- Ideal para aprendizado de testes automatizados com Supertest
