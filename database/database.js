const Sequelize = require('sequelize')

const connection = new Sequelize(
  'heroku_ce172796d058898',
  'bbc48c19d69d1a',
  'e4ffb741',
  {
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql'
  }
)

module.exports = connection
