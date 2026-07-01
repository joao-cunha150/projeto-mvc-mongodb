// routes/pedidosRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const validarUsuario = require('../middlewares/auth');

router.use(validarUsuario);

router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.buscar);
router.post('/', pedidoController.criar);
router.put('/:id', pedidoController.atualizar);
router.delete('/:id', pedidoController.remover);

module.exports = router;
