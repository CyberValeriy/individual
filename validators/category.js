const {body,query} = require('express-validator');

exports.addValid = [body("name").notEmpty().isString().trim(),
body("description").notEmpty().isString().trim()]

exports.deleteValid = [body("categoryId").notEmpty().isString().trim().isMongoId()]

exports.updateValid = [body("categoryId").notEmpty().isString().trim().isMongoId(),
body("name").notEmpty().isString().trim(),body("description").notEmpty().isString().trim()]