const router = require('express').Router()
const Client = require('../db/models/client')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const client = await Client.findOne({where: {name: req.body.client}})
    req.login(client, err => (err ? next(err) : res.json(client)))
    // }
  } catch (err) {
    next(err)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
