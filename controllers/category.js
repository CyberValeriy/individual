//MODELS 
const Category = require('../models/category');
const User = require('../models/user');

//FILES
const {error} = require("../util/error");
const {validation} = require("../util/validationError");


exports.getCategory = async (req,res)=>{
const name = req.query?.name || "";
const page = Math.abs(req.query?.page) || 1;
const PERPAGE = 5;
const {userId} = req;
try{
    const categories = await Category.find({creator:userId,name:{$regex:name}}).skip((page-1)*PERPAGE).limit(PERPAGE);
    res.status(200).json({success:true,categories});
}catch(err){
    console.debug(err);
    return error(res,500,"Server error!");
}
}

exports.deleteCategory = async (req,res)=>{
if(validation(req,res)) return;
const {categoryId} = req.body;
const {userId} = req;
    try{
        const category = await Category.deleteOne({_id:categoryId,creator:userId});
        await User.findByIdAndUpdate(userId,{$pull:{categories:categoryId}});
        res.status(200).json({success:true,message:`${category.name} was deleted!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
}

exports.addCategory = async (req,res)=>{
if(validation(req,res)) return;
const {name,description} = req.body;
const {userId} = req;
    try{
        const {categories} = await User.findById(userId).populate({ //add pagination
            path:"categories",
            match:{name:name}
        });
    if(categories.length > 0) return error(res,500,"Category name already in use!");
        const category = new Category({
            name,
            description,
            creator:userId
        });
        await category.save();
        await User.findByIdAndUpdate(userId,{$push:{categories:category._id}});
        res.status(200).json({success:true,message:`Category was created!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
}

exports.updateCategory = async (req,res)=>{
if(validation(req,res)) return;
const {categoryId,name,description} = req.body;
const {userId} = req;
    try{
        await Category.findOneAndUpdate({_id:categoryId,creator:userId},{name,description}); //or get name/description(if not entered)from old ver of product
        res.status(200).json({success:true,message:`Category was updated!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
}