const express = require('express');
const path = require('path');

router = express.Router();

router.get('/', (req, res) => {
  res.render('music', { fileName: 'music', title: 'Music' });
});

router.get('/home/ajax', (req, res) => {
  res.render('home', (err, html) => {
    res.send(JSON.stringify(html));
  });
});

router.get('/home', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'music',
    mainContent: 'home',
  });
});

router.get('/search/ajax', (req, res) => {
  res.render('search', (err, html) => {
    res.send(JSON.stringify(html));
  });
});

router.get('/search', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'search',
  });
});

router.get('/library/ajax', (req, res) => {
  res.render('library', (err, html) => {
    res.send(JSON.stringify(html));
  });
});

router.get('/library', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'library',
  });
});

module.exports = router;
