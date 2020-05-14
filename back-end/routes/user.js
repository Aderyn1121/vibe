const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

//GET route to register page
router.get('user/register', csrfProtection, (req, res) =>{
    //TODO: await user from database and pass into render object
    res.render('register', {
        // key user here,
        csrfProtection: req.csrfToken()
    });
})

//Validate user information from sign-up
const registerValidators = [
    //TODO: check login information
]

//POST route from register page
router.post('user/register', csrfProtection, userValidators, asyncHandler(async( req, res)=>{
    //TODO: pull login info from req.body

    //TODO: build the user from body content

    //check validation errors
    const validatorErrors = validationResult(req)

    //check if there are any errors
    if(validatorErrors.isEmpty()){
        //TODO: await a hashed password using bcrypt
        //TODO: set the user.hashPassword to awaited hashed password. 
        //TODO: save the user 
        //---call the loginUser middleware after making one --
        res.redirect('/');
    } else {
        //creating errors array and map the error msg into the errors variable. 
        const errors = validatorErrors.array().map((error) => error.msg);
        //TODO: rerender the registration page passing user info from like 27
        res.render('register', {
            //user goes here
            errors, 
            csrfToken: req.csrfToken()
        });
    }
}))

//GET route to the login page
router.get('/user/login', csrfProtection, (req, res) => {
    res.render('login', {
        //title here,
        csrfToken: csrfToken()
    })
})

//create login validators
const loginValidator = [
    //TODO: validate user log in 
]


//post route from the login page
router.post('/user/login', csrfProtection, loginValidator, asyncHandler(async(req, res)=>{
    //TODO: get the login info from req.body

    let errors = []
    const validateErrors = validationResult(req)

    if(validateErrors.isEmpty()){
      //TODO: await user.findOne from email address  
      if(!user){
        const passwordMatch// = compare password with bcrypt
        if(passwordMatch){
            //call the loginUser middleware
            return res.redirect('/')
        }
      }
      errors.push('login failed for the provided email address and password')
    }
    
    
}))