const express = require('express');
const router = express.Router();

//CONTROLLERS
const {signUp,logIn} = require('../controllers/auth');

//VALIDATORS
const {signUpValid,logInValid} = require('../validators/auth');

router.post('/signUp',signUpValid,signUp);

router.post('/logIn',logInValid,logIn);

module.exports = router;