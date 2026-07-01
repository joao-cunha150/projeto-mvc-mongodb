// middlewares/auth.js
//
// Regra de segurança exigida pela atividade:
// 1) Precisa vir um token (chave) de usuário válido no header Authorization.
// 2) Precisa vir o ID do usuário explicitamente informado no header "x-user-id"
//    e ele TEM que ser igual ao ID que está dentro do token.
// Se qualquer uma dessas condições falhar -> 401/403.

const jwt = require('jsonwebtoken');
require('dotenv').config();

function validarUsuario(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      erro: 'Token não informado. Envie o header Authorization: Bearer <token>.'
    });
  }

  const token = authHeader.split(' ')[1];

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }

  const idHeader = req.headers['x-user-id'];

  if (!idHeader) {
    return res.status(403).json({
      erro: 'ID do usuário não informado. Envie o header x-user-id.'
    });
  }

  if (Number(idHeader) !== Number(payload.id_usuario)) {
    return res.status(403).json({
      erro: 'ID do usuário informado não corresponde ao usuário autenticado no token.'
    });
  }

  // guarda os dados do usuário autenticado para uso nos controllers
  req.usuario = payload;
  next();
}

module.exports = validarUsuario;
