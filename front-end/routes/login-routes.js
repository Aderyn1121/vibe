const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const asyncHandler = require('./utils');

router = express.Router();

router.use(bodyParser());

// router.use(express.json());

router.get('/', (req, res) => {
  res.render('login', {
    fileName: 'login',
    title: 'Login',
    scripts: ['login'],
  });
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const loginRes = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const { token, user: id } = await loginRes.json();

    res.redirect('/music');
  })
);
module.exports = router;
