const {body} = require('express-validator');
const User = require('../models/user');
exports.signUpValid = [body("email").notEmpty().isString().trim().isEmail().custom(async value=>{
let result;
try{
    result = await User.findOne({email:value});
    console.log(result);
}catch(err){
    return Promise.reject("Server error!");
}
if(result) return Promise.reject("Email already in use!");

}),body("password").notEmpty().isString().isAlphanumeric().trim().isLength({min:5}).withMessage('Password minimum 5 symbols!'),
body("name").notEmpty().isString().trim().custom(async value=>{
    let result;
    try{
        result = await User.findOne({name:value});
    }catch(err){
        return Promise.reject("Server error!");
    }
    if(result) return Promise.reject("Name already in use!");
})];

exports.logInValid = [body("email").notEmpty().isString().trim().isEmail(),
body("password").notEmpty().isString().isAlphanumeric().isLength({min:5}).withMessage('Password minimum 5 symbols!')];