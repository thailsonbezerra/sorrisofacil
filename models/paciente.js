const Sequelize = require('sequelize')

const connection = require('../database/database')

const Paciente = connection.define('paciente', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

//Paciente.sync({ force: true })

module.exports = Paciente
