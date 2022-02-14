const Sequelize = require('sequelize')
const Consulta = require('./consulta')
const ConsultaProcedimento = require('./consultaProcedimento')
const connection = require('../database/database')

const Procedimento = connection.define('procedimento', {
  /* id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
  */
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },

  materiais: {
    type: Sequelize.STRING,
    allowNull: false
  },

  valor: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

//Procedimento.sync({ force: true })

module.exports = Procedimento
