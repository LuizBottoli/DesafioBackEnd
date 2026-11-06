import express from 'express';
import { sequelize } from './Banco.js';
import livrosRouter from './Desafio.js';

const app = express();
app.use(express.json());
app.use('/livros', livrosRouter);

await sequelize.sync(); 

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});