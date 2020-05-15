const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));

//moved button ajax experiment to app-test for reference of how res should be sent

app.get('/', (req, res) => {
  res.render('index', { title: 'Vibe' });
});

// app.get('/ajax', (req, res) => {
//   res.render('index', { title: 'Vibe' }, (err, html) => {
//     res.send(JSON.stringify(html));
//   });
// });

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

app.get('/music', (req, res) => {
  res.render('music', { title: 'Music' });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
