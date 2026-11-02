const express = require('express');
const livrosRouter = require('./Desafio');

const app = express();
app.use(express.json());
app.use('/livros', livrosRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});