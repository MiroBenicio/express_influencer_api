const express = require("express");
const router = express.Router();
const db = require("../database/index");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const validarJWT = require("./middlewareJWT");

router.get("/", validarJWT, function (req, res) {
  let sql = "SELECT * FROM influenciador";

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

router.post("/", validarJWT, (req, res) => {
  let errors = [];
  if (!req.body.nome) errors.push("Nome não informada");

  if (!req.body.numero_inscritos)
    errors.push("Número de inscritos não informado");

  if (!req.body.canal) errors.push("Canal não informado");

  if (!req.body.plataforma) errors.push("Plataforma não informado");

  if (!req.body.categoria) errors.push("Categoria não informado");

  if (errors.length) return res.status(400).json({ error: errors.join(",") });

  let data = {
    nome: req.body.nome,
    numero_inscritos: req.body.numero_inscritos,
    canal: req.body.canal,
    plataforma: req.body.plataforma,
    categoria: req.body.categoria,
  };
  let sql =
    "INSERT INTO influenciador (nome, numero_inscritos, canal, plataforma, categoria) VALUES (?,?,?,?,?)";
  let params = [
    data.nome,
    data.numero_inscritos,
    data.canal,
    data.plataforma,
    data.categoria,
  ];
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

router.patch("/:id", validarJWT, (req, res) => {
  let data = {
    nome: req.body.nome,
    numero_inscritos: req.body.numero_inscritos,
    canal: req.body.canal,
    plataforma: req.body.plataforma,
    categoria: req.body.categoria,
  };
  db.run(
    `UPDATE influenciador set 
           nome = COALESCE(?,nome), 
           numero_inscritos = COALESCE(?,numero_inscritos), 
           canal = COALESCE(?,canal),
           plataforma = COALESCE(?,plataforma),
           categoria = COALESCE(?,categoria)
           WHERE id = ?`,
    [
      data.nome,
      data.numero_inscritos,
      data.canal,
      data.plataforma,
      data.categoria,
    ],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

router.delete("/:id", validarJWT, (req, res) => {
  db.run(
    "DELETE FROM influenciador WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

module.exports = router;