const express = require('express')
const router = express.Router()
const Recebimento = require('../models/recebimento')
const Consulta = require('../models/consulta')
const Dentista = require('./dentistaController')
const Paciente = require('./pacienteController')

router.get('/recebimento/new', (req, res) => {
  Consulta.findAll().then(consultas => {
    res.render('recebimento/new', { consultas: consultas })
  })
})

router.post('/recebimento/save', (req, res) => {
  var data = req.body.data
  var tipo = req.body.tipo
  var valor = req.body.valor
  var consulta = req.body.consulta

  Recebimento.create({
    data: data,
    tipo: tipo,
    valor: valor,
    consulta_id: consulta
  }).then(() => {
    res.redirect('/recebimento')
  })
})

module.exports = router
