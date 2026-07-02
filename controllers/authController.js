// controllers/authController.js
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const usuarioModel = require('../models/usuarioModel');

// OBS: a base de dados fornecida (loja.sql) guarda a senha do usuário em MD5.
// Por isso a validação abaixo compara o MD5 da senha recebida com a senha salva.
// Isso é apenas para manter compatibilidade com os dados que já vêm no dump;
// em um projeto novo o ideal é salvar as senhas com bcrypt.
function gerarMd5(texto) {
  return crypto.createHash('md5').update(texto).digest('hex');
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!nick || !senha) {
      return res.status(400).json({ erro: 'Informe nick e senha.' });
    }

    const usuario = await usuarioModel.buscarPorNick(nick);

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    const senhaConfere = gerarMd5(senha) === usuario.senha;

    if (!senhaConfere) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, nick: usuario.nick },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      token
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao tentar realizar login.' });
  }
}

module.exports = { login };
