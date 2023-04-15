const express = require('express'),
  router = express.Router();

const conf = require('../config');

router.get('/', (req, res) => {
  res.render('pages/index', {
    title: 'Модальное окно'
  })
})

module.exports = router