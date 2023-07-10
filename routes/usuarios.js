const express = require("express");
const router = express.Router();
const db = require("../database/index");
const bcrypt = require("bcrypt");
const validarJWT = require("./middlewareJWT");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", function (req, res, next) {
  let sql = "SELECT * FROM usuario";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.post("/", (req, res, next) => {
  let errors = [];
  if (!req.body.senha) errors.push("Senha não informada");

  if (!req.body.email) errors.push("Email não informado");

  if (errors.length) return res.status(400).json({ error: errors.join(",") });

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.senha, salt);

  let data = {
    nome: req.body.nome,
    email: req.body.email,
    senha: hash,
    admin: req.body.admin ? 1 : 0,
  };
  let sql = "INSERT INTO usuario (nome, email, senha, admin) VALUES (?,?,?,?)";
  let params = [data.nome, data.email, data.senha, data.admin];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

module.exports = router;
