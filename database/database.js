const Sequelize = require('sequelize')

const connection = new Sequelize('dbdp', 'root', 'thailson2001', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection
