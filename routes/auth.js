const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/index");

// Middleware para autenticação
function autenticacao(email, senha, callback) {
  db.get("SELECT * FROM usuario WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error(err);
      return callback(err, false);
    }

    if (!row) {
      // Usuário não encontrado
      return callback(null, false);
    }

    const senhaComparada = bcrypt.compareSync(senha, row.senha);
    if (!senhaComparada) {
      // Senha incorreta
      return callback(null, false);
    }

    // Autenticação bem-sucedida
    return callback(null, true);
  });
}

// Rota de login
router.post("/", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha)
    return res.status(400).json({ error: "Email e Senha são necessários" });

  autenticacao(email, senha, (err, isAuthenticated) => {
    if (err) {
      console.error(err);
      // Trate o erro conforme necessário
      return;
    }

    if (isAuthenticated) {
      console.log("Usuário autenticado com sucesso");
      // Continua com a lógica de negócios após a autenticação bem-sucedida
      const token = jwt.sign(
        { username: email },
        "secret-key",
        (error, token) => {
          if (err) {
            res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

            return;
          }
          console.log("token 1", token);
          res.set("x-access-token", token);
          res.end();
        }
      );
    } else {
      console.log("Email ou senha incorretos");
      res.status(401).json({ error: "Email ou senha inválidos" });
      // Trate a autenticação falhada conforme necessário
    }
  });
});

module.exports = router;
