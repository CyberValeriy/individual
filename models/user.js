const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
name:String,
password:String,
operations:[{type:mongoose.SchemaTypes.ObjectId,ref:"Operation"}],
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);