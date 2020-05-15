const express = require('express');
const path = require('path');
const musicRouter = require('./routes/music-routes');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/music', musicRouter)

app.get('/', (req, res) => {
  res.render('index', { fileName: 'vibe', title: 'Vibe' });
});

app.get('/login', (req, res) => {
  res.render('login', { fileName: 'login', title: 'Login' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { fileName: 'signup', title: 'Signup' });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
