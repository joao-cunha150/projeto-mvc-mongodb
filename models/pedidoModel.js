// models/pedidoModel.js
// Cuida da tabela `pedidos` e da tabela `produtos_pedidos` (itens do pedido).
const pool = require('../config/database');

async function listarTodos() {
  const [linhas] = await pool.query('SELECT * FROM pedidos');
  return linhas;
}

async function buscarPorId(id_pedido) {
  const [pedidos] = await pool.query(
    'SELECT * FROM pedidos WHERE id_pedido = ?',
    [id_pedido]
  );
  const pedido = pedidos[0];
  if (!pedido) return null;

  const [itens] = await pool.query(
    `SELECT pp.*, p.nome AS nome_produto
     FROM produtos_pedidos pp
     JOIN produtos p ON p.id_produto = pp.produtos_id_produto
     WHERE pp.pedidos_id_pedido = ?`,
    [id_pedido]
  );

  pedido.itens = itens;
  return pedido;
}

async function criar({ data, clientes_id_cliente, itens }) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();

    const [resultadoPedido] = await conexao.query(
      'INSERT INTO pedidos (data, clientes_id_cliente) VALUES (?, ?)',
      [data, clientes_id_cliente]
    );
    const id_pedido = resultadoPedido.insertId;

    if (Array.isArray(itens)) {
      for (const item of itens) {
        await conexao.query(
          `INSERT INTO produtos_pedidos (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
           VALUES (?, ?, ?, ?)`,
          [item.produtos_id_produto, id_pedido, item.quantidade, item.valor]
        );
      }
    }

    await conexao.commit();
    return id_pedido;
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

async function atualizar(id_pedido, { data, clientes_id_cliente }) {
  const [resultado] = await pool.query(
    'UPDATE pedidos SET data = ?, clientes_id_cliente = ? WHERE id_pedido = ?',
    [data, clientes_id_cliente, id_pedido]
  );
  return resultado.affectedRows;
}

async function remover(id_pedido) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();
    await conexao.query(
      'DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?',
      [id_pedido]
    );
    const [resultado] = await conexao.query(
      'DELETE FROM pedidos WHERE id_pedido = ?',
      [id_pedido]
    );
    await conexao.commit();
    return resultado.affectedRows;
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
