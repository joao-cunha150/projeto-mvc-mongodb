// routes/produtosRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const validarUsuario = require('../middlewares/auth');

router.use(validarUsuario);

router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscar);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.remover);

module.exports = router;
