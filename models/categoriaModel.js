// models/categoriaModel.js
const pool = require('../config/database');

async function listarTodas() {
  const [linhas] = await pool.query('SELECT * FROM categorias');
  return linhas;
}

async function buscarPorId(id_categoria) {
  const [linhas] = await pool.query(
    'SELECT * FROM categorias WHERE id_categoria = ?',
    [id_categoria]
  );
  return linhas[0];
}

async function criar(nome) {
  const [resultado] = await pool.query(
    'INSERT INTO categorias (nome) VALUES (?)',
    [nome]
  );
  return resultado.insertId;
}

async function atualizar(id_categoria, nome) {
  const [resultado] = await pool.query(
    'UPDATE categorias SET nome = ? WHERE id_categoria = ?',
    [nome, id_categoria]
  );
  return resultado.affectedRows;
}

async function remover(id_categoria) {
  const [resultado] = await pool.query(
    'DELETE FROM categorias WHERE id_categoria = ?',
    [id_categoria]
  );
  return resultado.affectedRows;
}

module.exports = { listarTodas, buscarPorId, criar, atualizar, remover };
