const { validationResult } = require('express-validator');
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
    const validateErrors = validationResult(req);
    if(!validateErrors.isEmpty()){
        const errors = validateErrors.array().map((error) => error.msg);
        const err = Error('Bad Request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request';
        return next(err);
    }
    next();
}; 

const regExMaker = (value, word) => {
    const pattern = word.split(' ').map(letter => {
      return `(?=.*${word})`
    }).join(' ')
  
    const reg =  new RegExp(`${pattern}`, 'g')
    return value.match(reg)
}

module.exports = { csrfProtection, asyncHandler, handleValidationErrors, regExMaker }