// controllers/clienteController.js
const clienteModel = require('../models/clienteModel');

async function listar(req, res) {
  try {
    const clientes = await clienteModel.listarTodos();
    res.status(200).json(clientes);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar clientes.' });
  }
}

async function buscar(req, res) {
  try {
    const cliente = await clienteModel.buscarPorId(req.params.id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar cliente.' });
  }
}

async function criar(req, res) {
  try {
    const { nome, telefone, status } = req.body;
    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'Informe nome e telefone.' });
    }
    const id_cliente = await clienteModel.criar({ nome, telefone, status });
    res.status(201).json({ mensagem: 'Cliente criado com sucesso.', id_cliente });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao criar cliente.' });
  }
}

async function atualizar(req, res) {
  try {
    const { nome, telefone, status } = req.body;
    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'Informe nome e telefone.' });
    }
    const linhasAfetadas = await clienteModel.atualizar(req.params.id, { nome, telefone, status });
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Cliente atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
  }
}

async function remover(req, res) {
  try {
    const linhasAfetadas = await clienteModel.remover(req.params.id);
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Cliente removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao remover cliente.' });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
