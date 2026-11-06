import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'livros.db', logging: false });

export const Livro = sequelize.define('Livro', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  autor: { type: DataTypes.STRING, allowNull: false },
  ano: DataTypes.INTEGER,
}, { tableName: 'livros', timestamps: false });