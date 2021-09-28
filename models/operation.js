const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationSchema = new Schema({
category:{type:mongoose.SchemaTypes.ObjectId,ref:"Category"},
type:String,
value:Number,
description:String
},{timestamps:true});

module.exports = mongoose.model("Operation",operationSchema);