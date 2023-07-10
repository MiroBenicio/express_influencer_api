const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./routes/usuarios");
const influencerRouter = require("./routes/influenciadores");
const authRouter = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/usuarios", usersRouter);
app.use("/influenciadores", influencerRouter);
app.use("/login", authRouter);

// Rota de erro 404 personalizada
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

module.exports = app;
