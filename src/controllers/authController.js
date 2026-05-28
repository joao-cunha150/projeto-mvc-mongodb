const User = require("../models/User");

exports.loginPage = (req, res) => {
  res.render("login");
};

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

exports.logout = (req, res) => {

  req.session.destroy(() => {

    res.clearCookie("connect.sid");

    res.redirect("/login");

  });

};