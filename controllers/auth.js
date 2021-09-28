//MODELS
const User = require("../models/user");
//FILES
const {error} = require('../util/error');
//PACKAGES
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.signUp = async (req,res)=>{
const result = validationResult(req);
if (!result.isEmpty()) {
    return error(res, 422, result.errors[0].msg);
}
const {email,password,name} = req.body;
let user;
try{
    const hash = await bcrypt.hash(password,12);
    user = new User({
    name,
    password:hash,
    email
});
await user.save();
}catch(err){
    console.debug(err);
    return error(res,500,"Server eror!")
}
const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
res.status(201).json({success:true,message:"User created!",token,user});
}

exports.logIn = async (req,res)=>{
const result = validationResult(req);
if (!result.isEmpty()) {
return error(res, 422, result.errors[0].msg); // or one function with check in it
}
let user;
let token;
try{
const {password,email} = req.body;
user = await User.findOne({email:email});
if(!user){
    return error(res,404,"User not exist!");
}
const check =  await bcrypt.compare(password,user.password);
if(!check){
    return error(res,404,"Invalid password!");
}
token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
}catch(err){
    console.debug(err);
    return error(res,500,"Server error!");
}

return res.status(200).json({success:true,token,message:"User fetched!",user});
}
//test