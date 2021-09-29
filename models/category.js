const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
name:{type:String,required:true}, 
description:{type:String,required:true},
transactions:[{type:mongoose.SchemaTypes.ObjectId,ref:"Transactions"}]
});

module.exports = mongoose.model("Category",categorySchema);