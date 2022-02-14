const express = require('express')
const router = express.Router()
const Dentista = require('../models/dentista')

router.get('/dentista/new', (req, res) => {
  res.render('dentista/new')
})

router.post('/dentista/save', (req, res) => {
  const { nome, cpf, especialidade, senha } = req.body

  Dentista.create({
    nome: nome,
    cpf: cpf,
    especialidade: especialidade,
    senha: senha
  }).then(() => {
    res.redirect('/admin')
  })
})

module.exports = router
