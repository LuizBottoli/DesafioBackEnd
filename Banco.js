const Database = require('better-sqlite3');

const db = new Database('livros.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    ano INTEGER
  )
`);

module.exports = db;