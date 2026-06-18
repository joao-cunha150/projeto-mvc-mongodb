const User = require("../models/User");
/**
 * Exibe a página de login.
 *
 * @param {import('express').Request} req Requisição HTTP.
 * @param {import('express').Response} res Resposta HTTP.
 */
exports.loginPage = (req, res) => {
  res.render("login");
};
/**
 * Realiza a autenticação do usuário.
 *
 * @param {import('express').Request} req Requisição HTTP.
 * @param {import('express').Response} res Resposta HTTP.
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {

  const { email, senha } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Usuário não encontrado");
    }

    if (user.senha !== senha) {
      return res.send("Senha inválida");
    }

    req.session.user = {
      id: user._id,
      nome: user.nome,
      email: user.email
    };

    res.redirect("/users");

  } catch (error) {

    console.log(error);

    res.send("Erro no login");

  }

};
/**
 * Encerra a sessão do usuário.
 *
 * @param {import('express').Request} req Requisição HTTP.
 * @param {import('express').Response} res Resposta HTTP.
 */
exports.logout = (req, res) => {

  req.session.destroy(() => {

    res.clearCookie("connect.sid");

    res.redirect("/login");

  });

};