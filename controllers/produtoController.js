// controllers/produtoController.js
const produtoModel = require('../models/produtoModel');

async function listar(req, res) {
  try {
    const produtos = await produtoModel.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar produtos.' });
  }
}

async function buscar(req, res) {
  try {
    const produto = await produtoModel.buscarPorId(req.params.id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }
    res.status(200).json(produto);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar produto.' });
  }
}

async function criar(req, res) {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;
    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({ erro: 'Informe nome, valor e categorias_id_categoria.' });
    }
    const id_produto = await produtoModel.criar({
      nome, valor, estoque: estoque ?? 1, categorias_id_categoria
    });
    res.status(201).json({ mensagem: 'Produto criado com sucesso.', id_produto });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao criar produto.' });
  }
}

async function atualizar(req, res) {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;
    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({ erro: 'Informe nome, valor e categorias_id_categoria.' });
    }
    const linhasAfetadas = await produtoModel.atualizar(req.params.id, {
      nome, valor, estoque: estoque ?? 1, categorias_id_categoria
    });
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar produto.' });
  }
}

async function remover(req, res) {
  try {
    const linhasAfetadas = await produtoModel.remover(req.params.id);
    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Produto removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao remover produto.' });
  }
}

module.exports = { listar, buscar, criar, atualizar, remover };
