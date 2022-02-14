const express = require('express')
const router = express.Router()
const Paciente = require('../models/paciente')

router.get('/paciente/new', (req, res) => {
  res.render('paciente/new')
})

router.post('/paciente/save', async (req, res) => {
  const { nome, cpf, telefone, email, senha } = req.body

  await Paciente.create({
    nome: nome,
    cpf: cpf,
    telefone: telefone,
    email: email,
    senha: senha
  }).then(() => {
    res.redirect('/admin')
  })
})

module.exports = router
