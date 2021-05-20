const {Sequelize, Model, DataTypes} = require('sequelize');
const connection = require('../database/database');

const Pergunta = connection.define('perguntas', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
   type: DataTypes.TEXT,
   allowNull: false
  }

});

Pergunta.sync()
  .then(() => console.log("Tabela Criada com Sucesso !"))
  .catch((erro) => console.log("MSG: ${erro}"));

module.exports = Pergunta;