const Category = require('../models/category');
const Transaction = require('../models/transaction');
const mongoose = require('mongoose');
const {validation} = require("../util/validationError");

exports.reportByPeriod = async (req,res)=>{
if(validation(req,res)) return;
const {date1,date2,type} = req.body;
const {userId} = req;
const options = [{$match:{creator:mongoose.Types.ObjectId(userId),type:type,date:{$gte:new Date(date1),$lt:new Date(date2)}}},
    {$lookup:{
        from:"categories",
        localField:"categoryId",
        foreignField:"_id",
        as:"categoryId"

    }},
    {$unwind:"$categoryId"},
    {$project:{categoryId:"$categoryId.name",value:"$value"}},
    {$group:{_id:"$categoryId",total:{$sum:"$value"}}}
];

if(req.body.categoryId){
    options[0].$match.categoryId = mongoose.Types.ObjectId(req.body.categoryId)
}
const result = await Transaction.aggregate(options); 
return res.status(200).json({success:true,summary:result});
}