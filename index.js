const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

const Consulta = require('./models/consulta')
const Dentista = require('./models/dentista')
const Paciente = require('./models/paciente')
const Agenda = require('./models/agenda')
const Recebimento = require('./models/recebimento')
const Procedimento = require('./models/procedimento')

const connection = require('./database/database')

//connection.sync({ force: true })

const dentistaController = require('./controllers/dentistaController')
const consultaController = require('./controllers/consultaController')
const pacienteController = require('./controllers/pacienteController')
const agendaController = require('./controllers/agendaController')
const recebimentoController = require('./controllers/recebimentoController')
const procedimentoController = require('./controllers/procedimentoController')
const consultaProcedimento = require('./models/consultaProcedimento')

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use('/assets', express.static(path.join(__dirname, '../assets')))
app.use(express.static(__dirname + '/public'))

connection
  .authenticate()
  .then(() => {
    console.log('database connect')
  })
  .catch(err => {
    console.log(err)
  })

app.use('/', dentistaController)
app.use('/', consultaController)
app.use('/', agendaController)
app.use('/', pacienteController)
app.use('/', recebimentoController)
app.use('/', procedimentoController)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  if (req.query.fail)
    res.render('home/login', { message: 'Usuario e/ou senha inválidos' })
  else res.render('home/login', { message: null })
})

app.get('/admin', (req, res) => {
  Consulta.findAll({
    include: [
      {
        model: Dentista
      },
      {
        model: Paciente
      },
      {
        model: Recebimento
      },
      {
        model: Procedimento
      }
    ]
  }).then(consultas => {
    Dentista.findAll().then(dentistas => {
      //res.render('admin/index', { consultas: consultas, dentistas: dentistas })
      Paciente.findAll().then(pacientes => {
        Procedimento.findAll().then(procedimentos => {
          consultaProcedimento.findAll().then(consultaProcedimentos => {
            res.render('admin/index', {
              consultas: consultas,
              dentistas: dentistas,
              pacientes: pacientes,
              procedimentos: procedimentos,
              consultasProcedimentos: consultaProcedimentos
            })
          })
        })
      })
    })
  })
})

app.get('/agenda', (req, res) => {
  Agenda.findAll({
    include: [
      {
        model: Dentista
      },

      {
        model: Paciente
      }
    ]
  }).then(agendas => {
    Dentista.findAll().then(dentistas => {
      Paciente.findAll().then(pacientes => {
        res.render('agenda/index', {
          agendas: agendas,
          dentistas: dentistas,
          pacientes: pacientes
        })
      })
    })
  })
})

app.get('/recebimento', (req, res) => {
  Recebimento.findAll({
    include: {
      model: Consulta
    }
  }).then(recebimentos => {
    Consulta.findAll({
      include: {
        model: Paciente
      }
    }).then(consultas => {
      Paciente.findAll().then(pacientes => {
        res.render('recebimento/index', {
          recebimentos: recebimentos,
          consultas: consultas,
          pacientes: pacientes
        })
      })
    })
  })
})

app.listen(port, () => {
  console.log('serve on')
})
