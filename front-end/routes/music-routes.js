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
    blockScript: 'home',
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
    scripts,
    blockScript: 'home',
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
    blockScript: 'search',
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
    blockScript: 'library',
  });
});

module.exports = router;
