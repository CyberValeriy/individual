const {body} = require('express-validator');

exports.addValid = [body("name").notEmpty().isString().trim(),
body("description").notEmpty().isString().trim()]

exports.deleteValid = [body("categoryId").notEmpty().isString().trim().isMongoId().withMessage("Invalid categoryId")]

exports.updateValid = [body("categoryId").notEmpty().isString().trim().isMongoId().withMessage("Invalid categoryId"),
body("name").notEmpty().isString().trim(),body("description").notEmpty().isString().trim()]