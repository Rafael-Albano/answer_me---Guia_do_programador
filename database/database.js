const { Sequelize } = require('sequelize');

const config_database = ['answer_me', 'root','*******'];
const host = 'localhost';
const dialect = 'mysql';

const sequelize = new Sequelize(...config_database,{ host, dialect});

module.exports = sequelize;