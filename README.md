# Projeto MVC com MongoDB

## Sobre o Projeto

Este projeto foi desenvolvido utilizando arquitetura MVC (Model-View-Controller) com integração ao MongoDB utilizando Mongoose.

O objetivo do sistema é demonstrar a separação correta das responsabilidades da aplicação, utilizando persistência real de dados, middlewares, rotas organizadas e operações CRUD completas.

---

# Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Compass
- Mongoose
- HTML5
- CSS3
- JavaScript

---

# Arquitetura MVC

O projeto segue o padrão MVC:

Cliente → Routes → Middleware → Controller → Model → MongoDB

## Models

Responsáveis pela estrutura e manipulação dos dados no banco.

## Controllers

Responsáveis pelas regras de negócio e lógica da aplicação.

## Routes

Responsáveis pelas rotas da API.

## Middlewares

Executam funções intermediárias antes das requisições chegarem aos controllers.

## Views

Responsáveis pela interface visual da aplicação.

---

# Funcionalidades

- Cadastro de usuários
- Listagem de usuários
- Atualização de usuários
- Remoção de usuários
- Integração com MongoDB
- Tratamento de erros
- Middleware de log
- API REST
- Interface responsiva

---

# Estrutura do Projeto

projeto-mvc-mongodb/

├── node_modules

├── src

│ ├── config

│ │ └── db.js

│ ├── controllers

│ │ └── userController.js

│ ├── middlewares

│ │ └── logger.js

│ ├── models

│ │ └── User.js

│ ├── public

│ │ └── css

│ │ └── style.css

│ ├── routes

│ │ └── userRoutes.js

│ ├── views

│ │ └── index.html

│ └── app.js

├── .env

├── .env.example

├── .gitattributes

├── .gitignore

├── package-lock.json

├── package.json

├── README.md

└── server.js

---

# Instalação do Projeto

## 1. Clonar repositório

git clone URL_DO_REPOSITORIO

---

## 2. Entrar na pasta

cd projeto-mvc-mongodb

---

## 3. Instalar dependências

npm install

---

# Configuração do MongoDB

## Criar arquivo .env

PORT=3000

MONGO_URI=SUA_URL_DO_MONGODB

---

# Executar o Projeto

## Modo desenvolvimento

npm run dev

---

## Modo produção

npm start

---

# Rotas da API

## Criar usuário

POST /api/users

Body:

{
"nome":"João",
"email":"joao@gmail.com",
"senha":"123456"
}

---

## Listar usuários

GET /api/users

---

## Atualizar usuário

PUT /api/users/:id

---

## Deletar usuário

DELETE /api/users/:id

---

# Status HTTP Utilizados

- 200 → Sucesso
- 201 → Criado com sucesso
- 400 → Erro de validação
- 404 → Não encontrado
- 500 → Erro interno do servidor

---

# Segurança

O projeto utiliza:

- Variáveis de ambiente com dotenv
- .gitignore para proteger credenciais
- Tratamento de erros utilizando try/catch

---

# Middleware

O middleware logger registra todas as requisições realizadas no servidor.

Exemplo:

GET - /api/users

POST - /api/users

---

# Persistência de Dados

Todos os dados são armazenados diretamente no MongoDB Atlas utilizando Mongoose.

As operações CRUD utilizam:

- User.create()
- User.find()
- User.findByIdAndUpdate()
- User.findByIdAndDelete()

---

# Front-End

O front-end foi desenvolvido utilizando HTML e CSS puro.

O layout possui:

- Design moderno
- Responsividade
- Gradientes
- Glassmorphism
- Interface centralizada

---

# Objetivo Acadêmico

Este projeto foi desenvolvido para demonstrar conhecimentos em:

- Arquitetura MVC
- Banco de Dados NoSQL
- Integração MongoDB
- CRUD completo
- API REST
- Middlewares
- Tratamento de erros
- Organização profissional de projetos

---

# Autor

João Victor da Cunha Rosa

---



