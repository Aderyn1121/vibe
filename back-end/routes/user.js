const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection, handleValidationErrors } = require('../utils');
const { User } = require('../db/models');
const { Playlist } = require('../db/models');
const { Artist } = require('../db/models');
const { Album } = require('../db/models');
const { Song } = require('../db/models');

const router = express.Router();

//Validate nickname and birthday
const validateUserNickNameAndBirthday = [
    check('nickname')
        .exists({checkFalsy: true })
        .withMessage('Please provide an entry for field nickname')
        .isLength({ max: 20})
        .withMessage('Nickname must not be more than 20 characters long'),
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
router.post('/', validateEmailAndPassword, handleValidationErrors, asyncHandler( async( req, res) =>{
    const { email, password, nickName, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, hashedPassword, nickName, birthday});
    res.status(201).json({
        user: { id: user.id}
    })
}));

//Get route for users
router.get('/', asyncHandler(async(req, res)=>{
    const users = await User.findAll();
    res.json({users})
    
}))

//Get route for user by id
router.get('/:id(\\d+)', asyncHandler( async(req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json({ user: user.id, username: user.nickName })
}))

//Get route for playlists
router.get('/:id/playlists', asyncHandler( async(req, res)=> {
    const userId = parseInt(req.params.id);
    const playlists = await Playlist.findAll({
        include: {
            model: User
        },
        through: {
            attributes: ['playlistName']
        }
    });
    playlists.forEach(playlist => {
        res.json({ playList: playlist.playlistName, playlistId: playlist.id, userId: playlist.userId })
    })
}))


module.exports = router;