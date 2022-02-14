const Sequelize = require('sequelize')
const Dentista = require('./dentista')
const Paciente = require('./paciente')
const Procedimento = require('./procedimento')
const ConsultaProcedimento = require('./consultaProcedimento')
const connection = require('../database/database')
const consultaProcedimento = require('./consultaProcedimento')

const Consulta = connection.define('consulta', {
  /* id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },*/
  valor: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

Consulta.belongsTo(Paciente, {
  foreignKey: 'paciente_id'
})
Paciente.hasMany(Consulta, {
  foreignKey: 'paciente_id'
})

Consulta.belongsTo(Dentista, {
  foreignKey: 'dentista_id'
})
Dentista.hasMany(Consulta, {
  foreignKey: 'dentista_id'
})

Consulta.belongsToMany(Procedimento, {
  through: {
    model: ConsultaProcedimento
  },
  foreignKey: 'consulta_id'
})
Procedimento.belongsToMany(Consulta, {
  through: {
    model: ConsultaProcedimento
  },
  foreignKey: 'procedimento_id'
})

Consulta.hasMany(consultaProcedimento, { foreignKey: 'consulta_id' })
ConsultaProcedimento.belongsTo(Consulta, { foreignKey: 'consulta_id' })
Procedimento.hasMany(consultaProcedimento, { foreignKey: 'procedimento_id' })
consultaProcedimento.belongsTo(Procedimento, { foreignKey: 'procedimento_id' })

//Consulta.sync({ force: true })

module.exports = Consulta
