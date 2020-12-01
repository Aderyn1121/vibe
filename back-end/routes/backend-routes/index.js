const express = require('express');
const router = express.Router();
const userRouter = require('./user')
const playlistRouter = require('./playlist')
const searchRouter = require('./search')
const songRouter = require('./songs')
const userAuthRouter = require('./userAuth')

router.get('/', (req, res) => {
    res.json({ message: 'test of home route' });
});

router.use('/users', userRouter);
router.use('/playlists', playlistRouter);
router.use('/search', searchRouter);
router.use('/songs', songRouter);
router.use('/', userAuthRouter);

module.exports = router;
