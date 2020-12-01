const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
// const cors = require('cors');
const apiRouter = require('./routes/backend-routes/index');
const viewRouter = require('./routes/frontend-routes/index');
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.set('view engine', 'pug');

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', apiRouter);
app.use('/', viewRouter);

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { fileName: 'index', title: 'Vibe', script: 'index' });
});

app.get('/signup', (req, res) => {
    res.render('signup', {
        fileName: 'signup',
        title: 'Signup',
        months,
        script: 'signup',
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        fileName: 'login',
        title: 'Login',
        script: 'login',
    });
});

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
