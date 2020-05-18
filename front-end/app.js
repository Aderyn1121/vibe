const express = require('express');
const path = require('path');
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

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/music', musicRouter);

//Error handling stuff

app.use((req, res, next) => {
  const err = new Error("The requested page couldn't be found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (req.url !== "/favicon.ico") {

    console.error(err);

  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render("page-not-found", { filename: 'page-not-found', title: "Page Not Found" });
  } else {
    next(err);
  }
});

//


app.get('/', (req, res) => {
  res.render('index', { fileName: 'index', title: 'Vibe', scripts: ['index'] });
});

app.get('/login', (req, res) => {
  res.render('login', {
    fileName: 'login',
    title: 'Login',
    scripts: ['login'],
  });
});

app.get('/signup', (req, res) => {
  res.render('signup', {
    fileName: 'signup',
    title: 'Signup',
    months,
    scripts: ['signup'],
  });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
