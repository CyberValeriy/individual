//FILES
const {error} = require('./error');
const {validationResult} = require('express-validator');

exports.validation = (req,res)=>{
const result = validationResult(req);
if (!result.isEmpty()) {
    error(res, 422, result.errors[0].msg);
    return true
}
}