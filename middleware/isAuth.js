//PACKAGES
const jwt = require("jsonwebtoken");

//FILES
const {error} = require("../util/error");


const tokenCheck = async (req,res,next) =>{
    const authHeader = req.get("Authorization");
    if(!authHeader) return error(res,404,"Authorization header missed!");

    const token = req.get("Authorization").split(" ")[1];
    let result;
    try{
        result = await jwt.verify(token,process.env.JWT_SECRET); 
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }

    if(!result || !result?.userId || Date.now() > result?.exp * 1000)  return error(res,500,"Token validation failed");
    req.userId = result.userId;
    next();
}

module.exports = tokenCheck;