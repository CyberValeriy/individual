exports.error = (res,code,msg)=>{
return res.status(code).json({success:false,message:msg});
}