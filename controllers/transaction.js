//MODELS 
const Transaction = require("../models/transaction");
const Category = require("../models/category");

//FILES
const {error} = require("../util/error");
const {validation} = require("../util/validationError");


exports.getTransactions = async (req,res)=>{ //add paginaton
const categoryId = req.query.category || {$exists:true};
const {userId} = req;
const page = Math.abs(req.query?.page) || 1;
const PERPAGE = 5;
try{
    const transactions = await Transaction.find({creator:userId,categoryId}).skip((page-1)*PERPAGE).limit(PERPAGE).populate({
        path:"categoryId",
        select:{name:1,_id:0}
    });
    res.status(200).json({success:true,transactions});
}catch(err){
    console.debug(err);
    return error(res,500,"Server error!");
    }
}

exports.deleteTransaction = async (req,res)=>{
if(validation(req,res)) return;
const {transactionId} = req.body;
const {userId} = req;
    try{
        await Transaction.deleteOne({_id:transactionId,creator:userId});
        res.status(200).json({success:true,message:`Transaction was deleted!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
}

exports.addTransaction = async (req,res)=>{
if(validation(req,res)) return;
const {value,categoryId,type,description,date} = req.body;
const {userId} = req;
try{
    const tr = new Transaction({
        value,
        description,
        categoryId,
        type,
        creator:userId,
        date:new Date(date).toISOString()
    });
    await tr.save();
    await Category.findByIdAndUpdate(categoryId,{$push:{transactions:tr._id}});
}catch(err){
    console.debug(err);
    return error(res,500,"Server error!");
}
res.status(201).json({success:true,message:"Transaction added!"});
}

exports.updateTransaction = async (req,res)=>{
if(validation(req,res)) return;
const {userId} = req; 
const {transactionId,value,description,date,type} = req.body;
    try{
        await Transaction.updateOne({_id:transactionId,creator:userId},{value,description,type,date:new Date(date).toISOString()}); //or get name/description(if not entered)from old ver of product
        res.status(200).json({success:true,message:`Transaction was updated!`});
    }catch(err){
        console.debug(err);
        return error(res,500,"Server error!");
    }
}