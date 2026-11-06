import express from 'express';
import { Livro } from './Banco.js';

const router = express.Router();

//faz um get para listar todos os livros
router.get('/', async (req, res) => {
  res.json(await Livro.findAll());
});

//busca somente um livro pelo id, se nao encontrar retorna 404
router.get('/:id', async (req, res) => {
  const livro = await Livro.findByPk(req.params.id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.json(livro);
});

//cria um novo livro, se nao passar titulo ou autor retorna 400
router.post('/', async (req, res) => {
  const { titulo, autor, ano } = req.body;
  if (!titulo || !autor) return res.status(400).json({ erro: 'Título e autor são obrigatórios' });
  res.status(201).json(await Livro.create({ titulo, autor, ano }));
});

//apaga livro pelo id o await guarda o resultado , se nao encontrar retorna 404
router.delete('/:id', async (req, res) => {
  const removidos = await Livro.destroy({ where: { id: req.params.id } });
  if (!removidos) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.status(204).send();
});

//atualiza um livro, se nao encontrar retorna 404
router.patch('/:id', async (req, res) => {
  const livro = await Livro.findByPk(req.params.id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  await livro.update(req.body);
  res.json(livro);
});

export default router;