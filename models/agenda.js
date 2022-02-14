const Sequelize = require('sequelize')
const Dentista = require('./dentista')
const Paciente = require('./paciente')
const connection = require('../database/database')

const Agenda = connection.define('agenda', {
  /* id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },*/
  data: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },

  hora: {
    type: Sequelize.TIME,
    allowNull: false
  },

  tipo: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Agenda.belongsTo(Paciente, {
  foreignKey: 'paciente_id'
})
Paciente.hasMany(Agenda, {
  foreignKey: 'paciente_id'
})

Agenda.belongsTo(Dentista, {
  foreignKey: 'dentista_id'
})
Dentista.hasMany(Agenda, {
  foreignKey: 'dentista_id'
})

//Agenda.sync({ force: true })

module.exports = Agenda
