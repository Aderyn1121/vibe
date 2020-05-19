const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const { asyncHandler } = require('./utils');

router = express.Router();

const scripts = [
  'music/play-buttons',
  'music',
  'music/sidebar',
  'music/progress-bar',
];

router.get('/', async (req, res) => {
  const user = {
    id: 1,
    name: 'Zachary',
  };

  const playlistsJson = await fetch('http://localhost:8080/playlists');
  const playlistsObject = await playlistsJson.json();
  const playlists = playlistsObject.userPlaylist;

  res.render('music', {
    fileName: 'music',
    title: 'Music',
    mainContent: 'home',
    playlists,
    scripts,
    user,
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
    scripts,
  });
});

module.exports =  router ;
