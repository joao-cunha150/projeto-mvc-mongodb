// controllers/pedidoController.js
const pedidoModel = require('../models/pedidoModel');

async function listar(req, res) {
  try {
    const pedidos = await pedidoModel.listarTodos();
    res.status(200).json(pedidos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar pedidos.' });
  }
}

async function buscar(req, res) {
  try {
    const pedido = await pedidoModel.buscarPorId(req.params.id);
    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado.' });
    }
    res.status(200).json(pedido);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar pedido.' });
  }
}

async function criar(req, res) {
  try {
    const { data, clientes_id_cliente, itens } = req.body;
    if (!data || !clientes_id_cliente) {
      return res.status(400).json({ erro: 'Informe data e clientes_id_cliente.' });
    }
    const id_pedido = await pedidoModel.criar({ data, clientes_id_cliente, itens });
    res.status(201).json({ mensagem: 'Pedido criado com sucesso.', id_pedido });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao criar pedido.' });
  }
}

async function atualizar(req, res) {
  try {
    const { data, clientes_id_cliente } = req.body;
    if (!data || !clientes_id_cliente) {
      return res.status(400).json({ erro: 'Informe data e clientes_id_cliente.' });
    }
    const linhasAfetadas = await pedidoModel.atualizar(req.params.id, { data, clientes_id_cliente });
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Pedido não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Pedido atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar pedido.' });
  }
}

async function remover(req, res) {
  try {
    const linhasAfetadas = await pedidoModel.remover(req.params.id);
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Pedido não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Pedido removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao remover pedido.' });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
