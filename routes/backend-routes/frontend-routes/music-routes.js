const express = require('express');

router = express.Router();

router.get('/', async (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'home',
    script: 'music',
  });
});

router.get('/home/ajax', (req, res) => {
  res.render('components/music/main-content/home', (err, html) => {
    res.send(JSON.stringify(html));
  });
});

router.get('/home', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'home',
    script: 'music',
  });
});

router.get('/search/ajax', (req, res) => {
  res.render('components/music/main-content/search', (err, html) => {
    res.send(JSON.stringify(html));
  });
});

router.get('/search', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'search',
    script: 'music',
  });
});

router.get('/library/ajax', (req, res) => {
  res.render('components/music/main-content/library', (err, html) => {
    res.send(JSON.stringify(html));
  });
});

router.get('/library', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'library',
    script: 'music',
  });
});

router.get('/playlist/:id', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'playlist',
    script: 'music',
  });
});

router.get('/playlist/:id/ajax', (req, res) => {
  res.render('components/music/main-content/playlist', (err, html) => {
    res.send(JSON.stringify(html));
  });
});

module.exports = router;
