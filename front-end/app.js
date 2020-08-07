const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const musicRouter = require('./routes/music-routes');

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

const app = express();

app.set('view engine', 'pug');

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.locals.backend = process.env.BACKEND_URL;

app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/music', musicRouter);

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

// Error handling stuff

app.use((req, res, next) => {
  const err = new Error("The requested page couldn't be found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (req.url !== '/favicon.ico') {
    console.error(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      fileName: 'page-not-found',
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

const port = Number.parseInt(process.env.PORT, 10) || 8081;
app.listen(port, () => {
  console.log(`BACKEND_URL: ${process.env.BACKEND_URL}`);
  console.log(`PORT: ${process.env.PORT}`);
  console.log(`Listening for requests on port ${port}...`);
});
