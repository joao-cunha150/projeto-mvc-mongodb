// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const validarUsuario = require('../middlewares/auth');

// Todas as rotas abaixo exigem token + x-user-id válidos
router.use(validarUsuario);

router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.buscar);
router.post('/', categoriaController.criar);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.remover);

module.exports = router;
