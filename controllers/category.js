const Category = require('../models/category');
const User = require('../models/user');
const {error} = require("../util/error");
const {validationResult} = require('express-validator');

exports.getCategory = async (req,res)=>{
const name = req.query.name || "";
const {userId} = req;
try{
    const {categories} = await User.findById(userId,{categories:1,_id:0}).populate({ //add pagination
        path:"categories",
        match:{name:{$regex:name,$options:'i'}}
    });
    res.status(200).json({success:true,categories});
}catch(err){
    console.debug(err);
    return error(res,500,"Server error!");
}
}

exports.deleteCategory = async (req,res)=>{
const result = validationResult(req);
if (!result.isEmpty()) {
    return error(res, 422, result.errors[0].msg);
}

const {categoryId} = req.body;
const {userId} = req;
    try{
        const category = await Category.findByIdAndDelete(categoryId);
        await User.findByIdAndUpdate(userId,{$pull:{categories:categoryId}});
        res.status(200).json({success:true,message:`${category.name} was deleted!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
}

exports.addCategory = async (req,res)=>{
const result = validationResult(req);
if (!result.isEmpty()) {
    return error(res, 422, result.errors[0].msg);
}
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
        description
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
const result = validationResult(req); //concat in single function
if (!result.isEmpty()) {
return error(res, 422, result.errors[0].msg);
}
    const {categoryId,name,description} = req.body;
    try{
    await Category.findByIdAndUpdate(categoryId,{name,description}); //or get name/description(if not entered)from old ver of product
    res.status(200).json({success:true,message:`Category was updated!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
}