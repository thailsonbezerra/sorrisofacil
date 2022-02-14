const express = require('express')
const router = express.Router()
const Consulta = require('../models/consulta')
const Dentista = require('../models/dentista')
const Paciente = require('../models/paciente')
const Procedimento = require('../models/procedimento')
const ConsultaProcedimento = require('../models/consultaProcedimento')
const consultaProcedimento = require('../models/consultaProcedimento')

router.get('/consulta/new', (req, res) => {
  Consulta.findAll({
    include: [
      {
        model: Dentista
      },
      {
        model: Paciente
      }
    ]
  }).then(
    Dentista.findAll().then(dentistas => {
      Paciente.findAll().then(pacientes => {
        Procedimento.findAll().then(procedimentos => {
          res.render('consulta/new', {
            dentistas: dentistas,
            pacientes: pacientes,
            procedimentos: procedimentos
          })
        })
      })
    })
  )
})

router.post('/consulta/save', async (req, res) => {
  var valor = req.body.valor
  var data = req.body.data
  var dentista = req.body.dentista
  var paciente = req.body.paciente
  var procedimento = req.body.procedimento

  const consultaCreate = await Consulta.create(
    {
      valor: valor,
      data: data,
      dentista_id: dentista,
      paciente_id: paciente
    },
    {
      include: Procedimento
    }
  )

  consultaProcedimento
    .create({
      consulta_id: consultaCreate.id,
      procedimento_id: procedimento
    })

    .then(() => {
      res.redirect('/admin')
    })
})

router.get('/consulta/edit/:id', (req, res) => {
  var id = req.params.id

  Consulta.findOne({
    where: { id: id }
  }).then(consultas => {
    Dentista.findAll().then(dentistas => {
      res.render('consulta/edit', {
        consultas: consultas,
        dentistas: dentistas
      })
    })
  })
})

router.post('/consulta/update', (req, res) => {
  const { id, valor, data, dentista, paciente } = req.body

  Consulta.update(
    {
      valor: valor,
      data: data,
      dentista_id: dentista,
      paciente_id: paciente
    },
    { where: { id: id } }
  ).then(() => {
    res.redirect('/admin')
  })
})

router.get('/consulta/delete/:id', (req, res) => {
  var id = req.params.id

  Consulta.destroy({
    where: { id: id }
  }).then(() => {
    res.redirect('/admin')
  })
})

module.exports = router
