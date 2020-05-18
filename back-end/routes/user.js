const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection, handleValidationErrors } = require('../utils');
const { User } = require('../db/models');
const { UserFriend } = require('../db/models');
const { Playlist } = require('../db/models');
const { Artist } = require('../db/models');
const { Album } = require('../db/models');
const { Song } = require('../db/models');

const router = express.Router();

//Validate userName and birthday
const validateUsernameAndBirthday = [
    check('userName')
        .exists({checkFalsy: true })
        .withMessage('Please provide an entry for field userName')
        .isLength({ max: 20})
        .withMessage('Username must not be more than 20 characters long'),
    check('birthday')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field birthday')
        .isISO8601()
        .withMessage('Please provide a valid date for birthday')
]

//Validate email and password 
const validateEmailAndPassword = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide an entry for field email.')
        .isLength({ max: 100})
        .withMessage('Email address must not be more than 100 characters long.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an entry for field password.')
];

//Post route for creating user
router.post('/', validateUsernameAndBirthday, validateEmailAndPassword, handleValidationErrors, asyncHandler( async( req, res) =>{
    const { email, password, userName, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, hashedPassword, userName, birthday});
    res.status(201).json({
        user: { id: user.id}
    })
}));

//Get route for users returns userName and userId
router.get('/', asyncHandler(async(req, res)=>{
    const users = await User.findAll();
    const userList = users.map( user => {
        return {userName: user.userName, userId: user.id}
    })
    res.json({userList})
    
}))

//Get route for user by id returns specific userName and userId
router.get('/:id(\\d+)', asyncHandler( async(req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json({ username: user.userName,  userId: user.id })
}))

//Get route for user playlists
router.get('/:id/playlists', asyncHandler( async(req, res)=> {
    const userId = parseInt(req.params.id);
    const playlists = await Playlist.findAll({
        include: {
            model: User
        },
        through: {
            attributes: ['playlistName']
        },
        where: {
            userId: userId
        }
    });
    const playlistNames = playlists.map(playlist => {
        return { playList: playlist.playlistName, playlistId: playlist.id, userId: playlist.userId }
    });
    res.json({ playlistNames })
}))

router.get('/:id/friends', asyncHandler( async( req, res) => {
    const friendId = parseInt(req.params.id, 10)
    const friends = await UserFriend.findAll()
    const friendsList = friends.map(user => {
        return {userName: user.userName, friend: user.friendName, userId: user.id, friendId:user.friendId}
    })
    res.json({friendsList})
}))


module.exports = router;