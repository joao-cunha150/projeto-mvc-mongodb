# DevSystem - Sistema MVC com Autenticação

## Sobre o Projeto

O DevSystem é uma aplicação web desenvolvida utilizando arquitetura MVC (Model-View-Controller) com foco em organização, segurança e persistência de dados utilizando MongoDB.

O projeto foi criado como atividade prática para implementação de:

* Sistema de autenticação
* Controle de acesso
* Gerenciamento de sessões
* Middleware de proteção
* Logout seguro

---

# Tecnologias Utilizadas

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* HTML5
* CSS3
* JavaScript
* Express-Session

---

# Estrutura do Projeto

```bash
├── config/
│   └── database.js
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── views/
│   │   ├── login.html
│   │   ├── index.html
│   │   ├── eventos.html
│   │   ├── contato.html
│   │   └── participantes.html
│   └── public/
│       └── css/
│           └── style.css
├── server.js
├── package.json
└── README.md
```

---

# Funcionalidades Implementadas

## Sistema de Login

O usuário pode realizar login utilizando e-mail e senha cadastrados no banco de dados.

---

## Sessão de Usuário

Foi utilizado o pacote:

```bash
express-session
```

para gerenciamento de sessões autenticadas.

---

## Middleware de Proteção

As páginas internas do sistema são protegidas através de middleware.

Usuários não autenticados são automaticamente redirecionados para a tela de login.

---

## Logout Seguro

O sistema possui logout seguro utilizando:

```js
req.session.destroy()
```

Além disso, o cookie da sessão é removido para impedir acesso após sair do sistema.

---

# Segurança

* Controle de sessão
* Bloqueio de rotas privadas
* Redirecionamento automático
* Proteção contra acesso sem login

---

# Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Executar o projeto

```bash
npm start
```

---

# Requisitos da Atividade Atendidos

* Bloqueio de páginas sem login
* Login funcional
* Persistência de sessão
* Logout seguro
* Middleware de autenticação
* Estrutura MVC organizada
* Integração com MongoDB

---

# Autor

Projeto desenvolvido para atividade prática de autenticação utilizando Node.js, Express e MongoDB.
