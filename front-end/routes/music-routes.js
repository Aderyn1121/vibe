const express = require('express');

router = express.Router();

const scripts = ['music/play-buttons', 'music/sidebar', 'music/progress-bar'];

router.get('/', async (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'home',
    script: 'music',
    scripts,
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
    title: 'music',
    mainContent: 'home',
    script: 'music',
    scripts,
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
    scripts,
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
    scripts,
  });
});

module.exports = router;
