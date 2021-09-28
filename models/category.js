const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
name:String, 
description:String,
counter:{type:Number,default:0}
},{timestamps:true});

module.exports = mongoose.model("Category",categorySchema);