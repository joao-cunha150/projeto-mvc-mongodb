// controllers/categoriaController.js
const categoriaModel = require('../models/categoriaModel');

async function listar(req, res) {
  try {
    const categorias = await categoriaModel.listarTodas();
    res.status(200).json(categorias);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar categorias.' });
  }
}

async function buscar(req, res) {
  try {
    const categoria = await categoriaModel.buscarPorId(req.params.id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }
    res.status(200).json(categoria);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar categoria.' });
  }
}

async function criar(req, res) {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ erro: 'O campo nome é obrigatório.' });
    }
    const id_categoria = await categoriaModel.criar(nome);
    res.status(201).json({ mensagem: 'Categoria criada com sucesso.', id_categoria });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao criar categoria.' });
  }
}

async function atualizar(req, res) {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ erro: 'O campo nome é obrigatório.' });
    }
    const linhasAfetadas = await categoriaModel.atualizar(req.params.id, nome);
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar categoria.' });
  }
}

async function remover(req, res) {
  try {
    const linhasAfetadas = await categoriaModel.remover(req.params.id);
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Categoria não encontrada.' });
    }
    res.status(200).json({ mensagem: 'Categoria removida com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao remover categoria. Verifique se ela não está em uso por algum produto.' });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
