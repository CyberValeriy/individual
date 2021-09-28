const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
name:String,
password:String,
operations:[{type:mongoose.SchemaTypes.ObjectId,ref:"Operation"}],
categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}]
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);