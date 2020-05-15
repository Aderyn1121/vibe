const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { fileName: 'vibe', title: 'Vibe' });
});

app.get('/login', (req, res) => {
  res.render('login', { fileName: 'login', title: 'Login' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { fileName: 'signup', title: 'Signup' });
});

app.get('/music', (req, res) => {
  res.render('music', { fileName: 'music', title: 'Music' });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});


// app.get('/ajax', (req, res) => {
//   res.render('index', { title: 'Vibe' }, (err, html) => {
//     res.send(JSON.stringify(html));
//   });
// });
