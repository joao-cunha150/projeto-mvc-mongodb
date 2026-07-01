// server.js
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Rotas
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');

// Pública (sem autenticação)
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Privadas (exigem token + x-user-id)
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
