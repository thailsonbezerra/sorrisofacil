const nodemon = require('nodemon')
const Sequelize = require('sequelize')
const Consulta = require('./consulta')
const Procedimento = require('./procedimento')
const connection = require('../database/database')

const consultaProcedimento = connection.define('consultaProcedimento', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = consultaProcedimento
