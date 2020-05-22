const express = require('express');
const { check } = require('express-validator');
const { requireAuth, getUserToken } = require('../auth');
const { User } = require('../db/models');
const { UserFriend } = require('../db/models');
const { Playlist } = require('../db/models');
const { PlaylistSong } = require('../db/models');

const {
  asyncHandler,
  handleValidationErrors,
  arrayFlattener
} = require('../utils');


const router = express.Router();

const playlistValidators = check('playlistName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide an entry for playlist name')
  .isLength({ max: 20 })
  .withMessage('Playlist name cannot be more than 20 characters long.');


// Get route for user by id
router.get(
  '/:id(\\d+)/',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json({ username: user.userName, userId: user.id });
  })
);

// Get route for user playlists 
router.get(
  '/:id/playlists',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id);
    const playlists = await Playlist.findAll({
      include: {
        model: User,
      },
      through: {
        attributes: ['playlistName'],
      },
      where: {
        userId: userId,
      },
    });
    const playlistNames = playlists.map((playlist) => {
      return {
        playList: playlist.playlistName,
        playlistId: playlist.id,
        userId: playlist.userId,
      };
    });
    res.json({ playlistNames });
  })
);

//Get route for library
router.get('/:id/library', asyncHandler( async(req, res) =>{
  const userId = parseInt(req.params.id, 10);
  const playlists = await Playlist.findAll({
    where: { userId},
    include: { model: PlaylistSong, 
    attributes: ['songId', 'song'] 
  }});  
  
  let playlistSongs = playlists.map( (songs, i) => {
    return songs.PlaylistSongs
  })

  let list = {}
  let library = []
  let newArr = arrayFlattener(playlistSongs)
  
  for(let i in newArr){
    let songName = newArr[i]['song']
    list[songName] = newArr[i]
  }
  for(let i in list){
    library.push(list[i])
  }
  res.json({library})

}))

//Add Playlists
router.post('/:id/add-playlist', playlistValidators, handleValidationErrors, requireAuth, asyncHandler( async( req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { playlistName } = req.body;
  const playlist = await Playlist.create({playlistName, userId });
  res.status(201).json({playlistId: playlist.id, playlist: playlist.playlistName });
}));


//Playlist Friends
router.get(
  '/:id/friends',
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const friends = await UserFriend.findAll({
      where: {
        userId,
      },
    });
    //Friend id is the friends userId from the Users model
    const friendsList = friends.map((user) => {
      return {
        userName: user.userName,
        friend: user.friendName,
        userId: user.id,
        friendId: user.friendId,
      };
    });
    res.json({ friendsList });
  })
);

module.exports = router;
