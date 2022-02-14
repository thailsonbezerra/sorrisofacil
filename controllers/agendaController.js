const express = require('express')
const router = express.Router()
const Agenda = require('../models/agenda')
const Dentista = require('../models/dentista')
const Paciente = require('../models/paciente')

router.get('/agenda/new', (req, res) => {
  Dentista.findAll().then(dentistas => {
    Paciente.findAll().then(pacientes => {
      res.render('agenda/new', { dentistas: dentistas, pacientes: pacientes })
    })
  })
})

router.post('/agenda/save', (req, res) => {
  var data = req.body.data
  var hora = req.body.hora
  var tipo = req.body.tipo
  var dentista = req.body.dentista
  var paciente = req.body.paciente

  Agenda.create({
    data: data,
    hora: hora,
    tipo: tipo,
    dentista_id: dentista,
    paciente_id: paciente
  }).then(() => {
    res.redirect('/agenda')
  })
})

module.exports = router
