const nodemon = require('nodemon')
const Sequelize = require('sequelize')
const connection = require('../database/database')

const Dentista = connection.define('dentista', {
  /*id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },*/
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  especialidade: {
    type: Sequelize.STRING,
    allowNull: false
  },

  senha: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

//Dentista.sync({ force: true })

module.exports = Dentista
