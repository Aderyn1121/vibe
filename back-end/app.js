const express = require('express');
const morgan = require('morgan')
// const userRoutes = require('./routes/user');

const app = express();

app.use(morgan('dev'))
// app.use(routes)

module.exports = app;