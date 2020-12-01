const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/backend-routes/index');
const viewRouter = require('./routes/frontend-routes/index');
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Frontend
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', viewRouter);

// Backend
app.use('/api', apiRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    err.errors = ['Could not find string of resource'];
    next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
