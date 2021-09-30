const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
name:{type:String,required:true}, 
description:{type:String,required:true},
creator:{type:mongoose.SchemaTypes.ObjectId,ref:"User",required:true}
});

module.exports = mongoose.model("Category",categorySchema);