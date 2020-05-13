const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(path.join(__dirname, 'public')));

//moved button ajax experiment to app-test for reference of how res should be sent

app.get('/', (req, res) => {
  res.render('index');
});



app.listen(8081, () => {
  console.log('listening on port 8081');
});
