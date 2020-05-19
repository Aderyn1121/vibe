const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { asyncHandler } = require('./utils');

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

router.post('/', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const body = { email, password}
  const loginRes = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const {
    token,
    user: { id },
  } = await loginRes.json();
  console.log(token, user.id);
});

module.exports = router;
