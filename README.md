# API Loja — Migração de MongoDB para MySQL

API REST em Node.js + Express, usando MySQL (via `mysql2`) no lugar do MongoDB,
seguindo a estrutura pedida na atividade: **Categorias, Produtos, Clientes e Pedidos**,
com autenticação por token (JWT) obrigatória no CRUD.

## 1. O que tem aqui

```
├── config/database.js         → Pool de conexão MySQL
├── controllers/                → Lógica das rotas
├── models/                     → Queries SQL (prepared statements)
├── routes/                     → Definição das rotas
├── middlewares/auth.js         → Valida token + id do usuário
├── database/loja.sql           → Script para criar o banco
├── .env.example                → Modelo de variáveis de ambiente
└── server.js                   → Arquivo principal
```

## 2. Como rodar na sua máquina

### Passo 1 — Criar o banco de dados
Abra o MySQL Workbench (ou terminal do MySQL) e rode o script `database/loja.sql`.
Ele cria o banco `loja` com as tabelas: `categorias`, `clientes`, `endereco`, `pedidos`,
`produtos`, `produtos_pedidos`.

> **Importante:** o script `loja.sql` não cria a tabela `usuarios` (usada no login).
> Rode este comando extra no seu banco `loja`:

```sql
USE loja;

CREATE TABLE usuarios (
  id_usuario int unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  nick varchar(15) NOT NULL,
  senha varchar(90) NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY id_usuario_UNIQUE (id_usuario)
) ENGINE=InnoDB;

-- usuário de teste: nick "candido", senha "123456"
INSERT INTO usuarios (nome, nick, senha)
VALUES ('Cândido Farias', 'candido', MD5('123456'));
```

(Se você já tem o `Dump20260622.sql`, que já inclui `usuarios` com dados, pode usar ele
no lugar do `loja.sql` + comando acima — só que a senha do usuário 1 nesse dump já está
em MD5 e você não sabe qual foi o texto original, então é mais fácil criar seu próprio
usuário com o comando acima.)

### Passo 2 — Instalar as dependências
```bash
npm install
```

### Passo 3 — Configurar o `.env`
Copie o `.env.example` para `.env` e preencha com os dados do seu MySQL local:
```bash
cp .env.example .env
```

### Passo 4 — Rodar o servidor
```bash
npm start
```
ou, se tiver o nodemon instalado (recarrega sozinho ao salvar):
```bash
npm run dev
```

A API vai subir em `http://localhost:3000`.

## 3. Testando no Postman

### Rota pública (sem autenticação)
```
GET http://localhost:3000/api/status
```
Retorna:
```json
{ "versao": "2.0.0", "status": "online" }
```

### Login
```
POST http://localhost:3000/api/auth/login
Body (JSON):
{
  "nick": "candido",
  "senha": "123456"
}
```
Retorna um `token` e o `id_usuario`. **Guarde os dois.**

### Acessando o CRUD (rota protegida)
Toda rota de `categorias`, `produtos`, `clientes` e `pedidos` exige **dois headers**:

| Header          | Valor                                   |
|-----------------|------------------------------------------|
| `Authorization` | `Bearer SEU_TOKEN_AQUI`                  |
| `x-user-id`     | o `id_usuario` retornado no login        |

Exemplo — criar categoria:
```
POST http://localhost:3000/api/categorias
Headers:
  Authorization: Bearer eyJhbGciOi...
  x-user-id: 1
Body (JSON):
{
  "nome": "Periféricos"
}
```

Se você tentar chamar essa mesma rota **sem** os headers, a API responde `401` ou `403`
— é exatamente o teste de "bloqueio de invasão" pedido na atividade.

### Demais rotas
- `GET/POST/PUT/DELETE /api/categorias` e `/api/categorias/:id`
- `GET/POST/PUT/DELETE /api/produtos` e `/api/produtos/:id`
- `GET/POST/PUT/DELETE /api/clientes` e `/api/clientes/:id`
- `GET/POST/PUT/DELETE /api/pedidos` e `/api/pedidos/:id`

Exemplo de corpo para criar pedido (com itens):
```json
{
  "data": "2026-07-01",
  "clientes_id_cliente": 1,
  "itens": [
    { "produtos_id_produto": 1, "quantidade": 2, "valor": 1259 }
  ]
}
```

## 4. Como subir isso pro seu GitHub

Seu projeto atual é em MongoDB. O ideal (e é literalmente o que a atividade pede) é
criar uma branch nova para não misturar tudo:

```bash
# 1. Entre na pasta do seu projeto já clonado
cd projeto-mvc-mongodb

# 2. Crie uma branch nova para a versão em MySQL
git checkout -b migracao-mysql

# 3. Copie todos os arquivos deste pacote (config, controllers, models,
#    routes, middlewares, server.js, database/, .env.example, .gitignore)
#    para dentro da pasta do seu projeto, substituindo o que for necessário.

# 4. Confira se o .env real (com sua senha) NÃO vai ser commitado
#    (o .gitignore já está configurado para isso)

# 5. Adicione, comite e envie
git add .
git commit -m "Migração da persistência de MongoDB para MySQL"
git push origin migracao-mysql
```

Se preferir simplesmente substituir tudo na branch `main`/`master` (mais simples,
sem criar branch nova):

```bash
cd projeto-mvc-mongodb
git add .
git commit -m "Migração da persistência de MongoDB para MySQL"
git push origin main
```

Pronto — o link do repositório (com o histórico de commits mostrando a migração)
já fica pronto pra você entregar.

## 5. Checklist da atividade (o que já está pronto)
- [x] Driver `mysql2` com Promises/async-await
- [x] Variáveis de ambiente via `.env`
- [x] Prepared Statements (`?`) em todas as queries
- [x] Rota pública `GET /api/status` (e `/api/versao`)
- [x] Login validando contra a tabela `usuarios` do MySQL
- [x] CRUD de categorias, produtos, clientes e pedidos
- [x] Bloqueio 401/403 sem token válido + id do usuário
