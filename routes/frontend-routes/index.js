const express = require('express');
const router = express.Router();

const musicRouter = require('./music-routes');

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

router.get('/', (req, res) => {
    res.render('index', { fileName: 'index', title: 'Vibe', script: 'index' });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        fileName: 'signup',
        title: 'Signup',
        months,
        script: 'signup',
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        fileName: 'login',
        title: 'Login',
        script: 'login',
    });
});

router.use('/music', musicRouter);

module.exports = router;
