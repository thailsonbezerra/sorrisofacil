const express = require('express')
const router = express.Router()
const Procedimento = require('../models/procedimento')

router.get('/procedimento/new', (req, res) => {
  res.render('procedimento/new')
})

router.post('/procedimento/save', (req, res) => {
  var nome = req.body.nome
  var materiais = req.body.materiais
  var valor = req.body.valor

  Procedimento.create({
    nome: nome,
    materiais: materiais,
    valor: valor
  }).then(() => {
    res.redirect('/admin')
  })
})

module.exports = router
