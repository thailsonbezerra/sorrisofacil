const Sequelize = require('sequelize')
const Consulta = require('./consulta')
const connection = require('../database/database')

const Recebimento = connection.define('recebimento', {
  /* id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },*/
  data: {
    type: Sequelize.DATE,
    allowNull: false
  },

  tipo: {
    type: Sequelize.STRING,
    allowNull: false
  },

  valor: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

Recebimento.belongsTo(Consulta, {
  foreignKey: 'consulta_id'
})
Consulta.hasMany(Recebimento, {
  foreignKey: 'consulta_id'
})

//Recebimento.sync({ force: true })

module.exports = Recebimento
