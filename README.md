# 🚀 Projeto MVC MongoDB

Sistema desenvolvido utilizando Node.js, Express e MongoDB seguindo a arquitetura MVC (Model-View-Controller).

A aplicação permite gerenciamento de usuários e eventos, autenticação de usuários e controle de acesso através de sessões.

O projeto possui documentação interna utilizando JSDoc para facilitar manutenção, entendimento e evolução do código.

![Node.js](https://img.shields.io/badge/Node.js-v22-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

---

#  Tecnologias Utilizadas

* Node.js
* Express.js
* MongoDB
* Mongoose
* Express Session
* HTML5
* CSS3
* JavaScript

---

#  Estrutura do Projeto

```text
PROJETO-MVC-MONGODB
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── userController.js
│   │
│   ├── middlewares
│   │   ├── auth.js
│   │   └── logger.js
│   │
│   ├── models
│   │   ├── Event.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── public
│   │   └── css
│   │       └── style.css
│   │
│   └── views
│
├── .env.example
├── package.json
├── README.md
└── server.js
```

---

#  Instalação

Clone o repositório:

```bash
git clone https://github.com/joao-cunha150/projeto-mvc-mongodb.git
```

Acesse a pasta:

```bash
cd projeto-mvc-mongodb
```

Instale as dependências:

```bash
npm install
```

---

#  Executando o Projeto

Modo normal:

```bash
npm start
```

Modo desenvolvimento:

```bash
npm run dev
```

---

#  Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

MONGO_URI=mongodb://localhost:27017/projeto_mvc

SESSION_SECRET=sua_chave_secreta
```

---

#  Funcionalidades

* Cadastro de usuários
* Listagem de usuários
* Atualização de usuários
* Exclusão de usuários
* Cadastro de eventos
* Listagem de eventos
* Atualização de eventos
* Exclusão de eventos
* Login de usuários
* Logout seguro
* Controle de sessão
* Middleware de autenticação

---

#  Documentação

O projeto utiliza JSDoc nos Controllers e Models para documentação interna do código e suporte ao IntelliSense do Visual Studio Code.

---

#  Autor

João Victor da Cunha Rosa

Projeto acadêmico desenvolvido utilizando Node.js, Express e MongoDB seguindo a arquitetura MVC.
