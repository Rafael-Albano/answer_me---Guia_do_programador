const {Sequelize, Model, Datatypes, Op, DataTypes} = require('sequelize');
const connection = require('../database/database');

const Resposta = connection.define('respostas', {
  corpo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Resposta.sync()
.then(() => console.log("Tabela Criada com Sucesso !"))
  .catch((erro) => console.log("MSG: ${erro}"));


module.exports = { Resposta, Op };