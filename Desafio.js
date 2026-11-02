const express = require('express');
const db = require('./Banco');

const router = express.Router();

// get
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM livros').all());
});

// get pelo id
router.get('/:id', (req, res) => {
  const livro = db.prepare('SELECT * FROM livros WHERE id = ?').get(req.params.id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.json(livro);
});

// post
router.post('/', (req, res) => {
  const { titulo, autor, ano } = req.body;
  if (!titulo || !autor) return res.status(400).json({ erro: 'Título e autor são obrigatórios' });

  const { lastInsertRowid } = db
    .prepare('INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)')
    .run(titulo, autor, ano);

  res.status(201).json({ id: lastInsertRowid, titulo, autor, ano });
});

// delete pelo id
router.delete('/:id', (req, res) => {
  const { changes } = db.prepare('DELETE FROM livros WHERE id = ?').run(req.params.id);
  if (!changes) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.status(204).send();
});

// patch pelo id
router.patch('/:id', (req, res) => {
  const livro = db.prepare('SELECT * FROM livros WHERE id = ?').get(req.params.id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

  const { titulo, autor, ano } = { ...livro, ...req.body };
  db.prepare('UPDATE livros SET titulo = ?, autor = ?, ano = ? WHERE id = ?')
    .run(titulo, autor, ano, livro.id);

  res.json({ id: livro.id, titulo, autor, ano });
});

module.exports = router;