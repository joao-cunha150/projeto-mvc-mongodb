// routes/clientesRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const validarUsuario = require('../middlewares/auth');

router.use(validarUsuario);

router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscar);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.remover);

module.exports = router;
