const Category = require('../models/category');
const {error} = require("../util/error");

exports.getCategory = async (req,res)=>{
const {name} = req.query;
try{
const categories = await Category.find({name:{$regex:name,$options:"i"}});
res.status(200).json({success:true,categories});
}catch(err){
    console.debug(err);
    return error(res,500,"Server error!");
}
}

exports.deleteCategory = async (req,res)=>{
    const {categoryId} = req.query;
    try{
   const category =  await Category.findByIdAndDelete(categoryId);
    res.status(200).json({success:true,message:`${category.name} was deletet!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
    }