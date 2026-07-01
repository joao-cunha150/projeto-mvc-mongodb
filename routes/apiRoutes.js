// routes/apiRoutes.js
// Rota pública, não exige autenticação. Usada para monitoramento.
const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.status(200).json({ versao: '2.0.0', status: 'online' });
});

router.get('/versao', (req, res) => {
  res.status(200).json({ versao: '2.0.0', status: 'online' });
});

module.exports = router;
