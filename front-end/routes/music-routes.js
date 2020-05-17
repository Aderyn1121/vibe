const express = require('express');
const path = require('path');

router = express.Router();

router.get('/', (req, res) => {
  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'home',
    track: {
      art: '/public/images/album-art.jpg',
      title: 'Hide and Seek',
      artist: 'Imogen Heap',
      songFile: '/public/test_music/hide-and-seek.m4a',
    },
    scripts: ['play-buttons', 'music'],
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
    track: {
      art: '/public/images/album-art.jpg',
      title: 'Hide and Seek',
      artist: 'Imogen Heap',
      songFile: '/public/test_music/hide-and-seek.m4a',
    },
    scripts: ['play-buttons', 'music'],
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
    track: {
      art: '/public/images/album-art.jpg',
      title: 'Hide and Seek',
      artist: 'Imogen Heap',
      songFile: '/public/test_music/hide-and-seek.m4a',
    },
    scripts: ['play-buttons', 'music'],
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
    track: {
      art: '/public/images/album-art.jpg',
      title: 'Hide and Seek',
      artist: 'Imogen Heap',
      songFile: '/public/test_music/hide-and-seek.m4a',
    },
    scripts: ['play-buttons', 'music'],
  });
});

module.exports = router;
