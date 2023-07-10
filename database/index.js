const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT, 
            email TEXT UNIQUE, 
            senha TEXT, 
            admin INTEGER,
            CONSTRAINT email_unique UNIQUE (email)
            );
        `,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS influenciador (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT, 
        numero_inscritos INTEGER,
        canal TEXT,
        plataforma TEXT,
        categoria TEXT
        );`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
});

module.exports = db;
