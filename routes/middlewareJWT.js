const validarJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const chavePrivada = "secret-key";

  // Efetuando a validação do JWT:
  const jwtService = require("jsonwebtoken");
  jwtService.verify(token, chavePrivada, (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }
    // O objeto "req" é alterado abaixo
    // recebendo uma nova propriedade userInfo.
    // Este mesmo objeto chegará na rota
    // podendo acessar o req.userInfo
    req.userInfo = userInfo;
    console.log(userInfo);
    next();
  });
};

module.exports = validarJWT;
