// models/clienteModel.js
const pool = require('../config/database');

async function listarTodos() {
  const [linhas] = await pool.query('SELECT * FROM clientes');
  return linhas;
}

async function buscarPorId(id_cliente) {
  const [linhas] = await pool.query(
    'SELECT * FROM clientes WHERE id_cliente = ?',
    [id_cliente]
  );
  return linhas[0];
}

async function criar({ nome, telefone, status }) {
  const [resultado] = await pool.query(
    'INSERT INTO clientes (nome, telefone, status) VALUES (?, ?, ?)',
    [nome, telefone, status || 'medio']
  );
  return resultado.insertId;
}

async function atualizar(id_cliente, { nome, telefone, status }) {
  const [resultado] = await pool.query(
    'UPDATE clientes SET nome = ?, telefone = ?, status = ? WHERE id_cliente = ?',
    [nome, telefone, status, id_cliente]
  );
  return resultado.affectedRows;
}

async function remover(id_cliente) {
  const [resultado] = await pool.query(
    'DELETE FROM clientes WHERE id_cliente = ?',
    [id_cliente]
  );
  return resultado.affectedRows;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
