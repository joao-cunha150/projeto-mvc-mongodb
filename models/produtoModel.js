// models/produtoModel.js
const pool = require('../config/database');

async function listarTodos() {
  const [linhas] = await pool.query(
    `SELECT p.*, c.nome AS nome_categoria
     FROM produtos p
     JOIN categorias c ON c.id_categoria = p.categorias_id_categoria`
  );
  return linhas;
}

async function buscarPorId(id_produto) {
  const [linhas] = await pool.query(
    'SELECT * FROM produtos WHERE id_produto = ?',
    [id_produto]
  );
  return linhas[0];
}

async function criar({ nome, valor, estoque, categorias_id_categoria }) {
  const [resultado] = await pool.query(
    `INSERT INTO produtos (nome, valor, estoque, categorias_id_categoria)
     VALUES (?, ?, ?, ?)`,
    [nome, valor, estoque, categorias_id_categoria]
  );
  return resultado.insertId;
}

async function atualizar(id_produto, { nome, valor, estoque, categorias_id_categoria }) {
  const [resultado] = await pool.query(
    `UPDATE produtos
     SET nome = ?, valor = ?, estoque = ?, categorias_id_categoria = ?
     WHERE id_produto = ?`,
    [nome, valor, estoque, categorias_id_categoria, id_produto]
  );
  return resultado.affectedRows;
}

async function remover(id_produto) {
  const [resultado] = await pool.query(
    'DELETE FROM produtos WHERE id_produto = ?',
    [id_produto]
  );
  return resultado.affectedRows;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
