const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
categoryId:{type:mongoose.SchemaTypes.ObjectId,ref:"Category",required:true},
type:{type:String,required:true}, //or bool,but costly for rerender speed
creator:{type:mongoose.SchemaTypes.ObjectId,ref:"User",required:true},
value:{type:Number,required:true},
description:{type:String,required:true},
date:{type:Date,required:true}
});

module.exports = mongoose.model("Transaction",transactionSchema);

// Why creator id instead of array of transactions in User model?
// Because if we gona use array its wery long to parse all docs inside and make skip for pagination,
// when user returns on logIn and signUp to much data