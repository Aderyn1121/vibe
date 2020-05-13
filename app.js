const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/body1', (req, res) => {
  res.render('index', { body: 'body1' });
});

app.get('/body2', (req, res) => {
  res.render('index', { body: 'body2' });
});

app.get('/body1/button', (req, res) => {
  res.render('body1', {}, (err, html) => {
    res.send(JSON.stringify(html));
  });
});

app.get('/body2/button', (req, res) => {
  res.render('body2', {}, (err, html) => {
    res.send(JSON.stringify(html));
  });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
