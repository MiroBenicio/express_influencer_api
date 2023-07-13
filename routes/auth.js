const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/index");

function autenticacao(email, senha, callback) {
  db.get("SELECT * FROM usuario WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error(err);
      return callback(err, false);
    }

    if (!row) {
      return callback(null, false);
    }

    const senhaComparada = bcrypt.compareSync(senha, row.senha);
    if (!senhaComparada) {
      return callback(null, false);
    }

    return callback(null, true);
  });
}

router.post("/", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha)
    return res.status(400).json({ error: "Email e Senha são necessários" });

  autenticacao(email, senha, (err, isAuthenticated) => {
    if (err) {
      console.error(err);
      return;
    }

    if (isAuthenticated) {
      console.log("Usuário autenticado com sucesso");
      const token = jwt.sign({ email: email }, "secret-key", (error, token) => {
        if (err) {
          res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

          return;
        }
        console.log("token 1", token);
        res.json({
          message: "Autenticado com sucesso",
          data: token,
          status: 200,
        });
        res.set("x-access-token", token);
        res.end();
      });
    } else {
      console.log("Email ou senha incorretos");
      res.status(400).json({ error: "Email ou senha inválidos" });
    }
  });
});

module.exports = router;
