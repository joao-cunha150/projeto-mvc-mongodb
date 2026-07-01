// models/usuarioModel.js
const pool = require('../config/database');

async function buscarPorNick(nick) {
  const [linhas] = await pool.query(
    'SELECT * FROM usuarios WHERE nick = ?',
    [nick]
  );
  return linhas[0];
}

async function buscarPorId(id_usuario) {
  const [linhas] = await pool.query(
    'SELECT id_usuario, nome, nick FROM usuarios WHERE id_usuario = ?',
    [id_usuario]
  );
  return linhas[0];
}

module.exports = { buscarPorNick, buscarPorId };
