const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
